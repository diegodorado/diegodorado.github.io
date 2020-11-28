/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useState, useEffect,useRef} from "react"
import Layout from "../../layouts/main"
import "./multiplayer.sass"


// =============================================================================
//  An Entity in the world.
// =============================================================================
var Entity = function() {
  this.x = 0;
  this.speed = 2; // units/s
  this.position_buffer = [];
}

// Apply user's input to this entity.
Entity.prototype.applyInput = function(input) {
  this.x += input.press_time*this.speed;
}


// =============================================================================
//  A message queue with simulated network lag.
// =============================================================================
var LagNetwork = function() {
  this.messages = [];
}

// "Send" a message. Store each message with the timestamp when it should be
// received, to simulate lag.
LagNetwork.prototype.send = function(lag_ms, message) {
  this.messages.push({recv_ts: +new Date() + lag_ms,
                      payload: message});
}

// Returns a "received" message, or undefined if there are no messages available
// yet.
LagNetwork.prototype.receive = function() {
  var now = +new Date();
  for (var i = 0; i < this.messages.length; i++) {
    var message = this.messages[i];
    if (message.recv_ts <= now) {
      this.messages.splice(i, 1);
      return message.payload;
    }
  }
}


// =============================================================================
//  The Client.
// =============================================================================
var Client = function() {
  // Local representation of the entities.
  this.entities = {};

  // Input state.
  this.key_left = false;
  this.key_right = false;

  // Simulated network connection.
  this.network = new LagNetwork();
  this.server = null;
  this.lag = 0;

  // Unique ID of our entity. Assigned by Server on connection.
  this.entity_id = null;

  // Data needed for reconciliation.
  this.client_side_prediction = false;
  this.server_reconciliation = false;
  this.input_sequence_number = 0;
  this.pending_inputs = [];

  // Entity interpolation toggle.
  this.entity_interpolation = false

  this.status = "Waiting for connection..."

}



// Update Client state.
Client.prototype.update = function(server_update_rate) {
  // Listen to the server.
  this.processServerMessages();

  if (this.entity_id == null) {
    return;  // Not connected yet.
  }

  // Process inputs.
  this.processInputs();

  // Interpolate other entities.
  if (this.entity_interpolation) {
    this.interpolateEntities(server_update_rate);
  }

  // Show some info.
  this.status = "Non-acknowledged inputs: " + this.pending_inputs.length;
}


// Get inputs and send them to the server.
// If enabled, do client-side prediction.
Client.prototype.processInputs = function() {
  // Compute delta time since last update.
  var now_ts = +new Date();
  var last_ts = this.last_ts || now_ts;
  var dt_sec = (now_ts - last_ts) / 1000.0;
  this.last_ts = now_ts;

  // Package player's input.
  var input;
  if (this.key_right) {
    input = { press_time: dt_sec };
  } else if (this.key_left) {
    input = { press_time: -dt_sec };
  } else {
    // Nothing interesting happened.
    return;
  }

  // Send the input to the server.
  input.input_sequence_number = this.input_sequence_number++;
  input.entity_id = this.entity_id;
  this.server.network.send(this.lag, input);

  // Do client-side prediction.
  if (this.client_side_prediction) {
    this.entities[this.entity_id].applyInput(input);
  }

  // Save this input for later reconciliation.
  this.pending_inputs.push(input);
}


// Process all messages from the server, i.e. world updates.
// If enabled, do server reconciliation.
Client.prototype.processServerMessages = function() {
  while (true) {
    var message = this.network.receive();
    if (!message) {
      break;
    }

    // World state is a list of entity states.
    for (var i = 0; i < message.length; i++) {
      var state = message[i];

      // If this is the first time we see this entity, create a local representation.
      if (!this.entities[state.entity_id]) {
        const e = new Entity();
        e.entity_id = state.entity_id;
        this.entities[state.entity_id] = e
      }

      const entity = this.entities[state.entity_id];

      if (state.entity_id === this.entity_id) {
        // Received the authoritative position of this client's entity.
        entity.x = state.position;

        if (this.server_reconciliation) {
          // Server Reconciliation. Re-apply all the inputs not yet processed by
          // the server.
          var j = 0;
          while (j < this.pending_inputs.length) {
            var input = this.pending_inputs[j];
            if (input.input_sequence_number <= state.last_processed_input) {
              // Already processed. Its effect is already taken into account into the world update
              // we just got, so we can drop it.
              this.pending_inputs.splice(j, 1);
            } else {
              // Not processed by the server yet. Re-apply it.
              entity.applyInput(input);
              j++;
            }
          }
        } else {
          // Reconciliation is disabled, so drop all the saved inputs.
          this.pending_inputs = [];
        }
      } else {
        // Received the position of an entity other than this client's.

        if (!this.entity_interpolation) {
          // Entity interpolation is disabled - just accept the server's position.
          entity.x = state.position;
        } else {
          // Add it to the position buffer.
          var timestamp = +new Date();
          entity.position_buffer.push([timestamp, state.position]);
        }
      }
    }
  }
}


Client.prototype.interpolateEntities = function(server_update_rate) {
  // Compute render timestamp.
  var now = +new Date();
  // fixme
  var render_timestamp = now - (1000.0 / server_update_rate);

  for (var i in this.entities) {
    var entity = this.entities[i];

    // No point in interpolating this client's entity.
    if (entity.entity_id === this.entity_id) {
      continue;
    }

    // Find the two authoritative positions surrounding the rendering timestamp.
    var buffer = entity.position_buffer;

    // Drop older positions.
    while (buffer.length >= 2 && buffer[1][0] <= render_timestamp) {
      buffer.shift();
    }

    // Interpolate between the two surrounding authoritative positions.
    if (buffer.length >= 2 && buffer[0][0] <= render_timestamp && render_timestamp <= buffer[1][0]) {
      var x0 = buffer[0][1];
      var x1 = buffer[1][1];
      var t0 = buffer[0][0];
      var t1 = buffer[1][0];

      entity.x = x0 + (x1 - x0) * (render_timestamp - t0) / (t1 - t0);
    }
  }
}


// =============================================================================
//  The Server.
// =============================================================================
var Server = function() {
  // Connected clients and their entities.
  this.clients = [];
  this.entities = [];

  // Last processed input for each client.
  this.last_processed_input = [];

  // Simulated network connection.
  this.network = new LagNetwork();
}

Server.prototype.connect = function(client) {
  // Give the Client enough data to identify itself.
  client.server = this;
  client.entity_id = this.clients.length;
  this.clients.push(client);

  // Create a new Entity for this Client.
  var entity = new Entity();
  this.entities.push(entity);
  entity.entity_id = client.entity_id;

  // Set the initial state of the Entity (e.g. spawn point)
  var spawn_points = [4, 6];
  entity.x = spawn_points[client.entity_id];
}

Server.prototype.update = function() {
  this.processInputs();
  this.sendWorldState();
}


// Check whether this input seems to be valid (e.g. "make sense" according
// to the physical rules of the World)
Server.prototype.validateInput = function(input) {
  if (Math.abs(input.press_time) > 1/40) {
    return false;
  }
  return true;
}


Server.prototype.processInputs = function() {
  // Process all pending messages from clients.
  while (true) {
    var message = this.network.receive();
    if (!message) {
      break;
    }

    // Update the state of the entity, based on its input.
    // We just ignore inputs that don't look valid; this is what prevents clients from cheating.
    if (this.validateInput(message)) {
      var id = message.entity_id;
      this.entities[id].applyInput(message);
      this.last_processed_input[id] = message.input_sequence_number;
    }

  }

  // Show some info.
  var info = "Last acknowledged input: ";
  for (var i = 0; i < this.clients.length; ++i) {
    info += "Player " + i + ": #" + (this.last_processed_input[i] || 0) + "   ";
  }
  this.status = info;
}


// Send the world state to all the connected clients.
Server.prototype.sendWorldState = function() {
  // Gather the state of the world. In a real app, state could be filtered to avoid leaking data
  // (e.g. position of invisible enemies).
  var world_state = [];
  var num_clients = this.clients.length;
  for (var i = 0; i < num_clients; i++) {
    var entity = this.entities[i];
    world_state.push({entity_id: entity.entity_id,
                      position: entity.x,
                      last_processed_input: this.last_processed_input[i]});
  }

  // Broadcast the state to all the clients.
  for (var j = 0; j < num_clients; j++) {
    var client = this.clients[j];
    client.network.send(client.lag, world_state);
  }
}


// Render all the entities in the given canvas.
const renderWorld = function(canvas, entities) {
  // Clear the canvas.
  for (var i in entities) {
    var entity = entities[i];
    // Compute size and position.
    var radius = canvas.height*0.9/2;
    var x = (entity.x / 10.0)*canvas.width;
    // Draw the entity.
    var ctx = canvas.getContext("2d");
    ctx.beginPath()
    if(entity.entity_id===0){
      ctx.rect(x-canvas.height/2,0, canvas.height, canvas.height)
    }else{
      ctx.arc(x, canvas.height / 2, radius, 0, 2*Math.PI, false)
    }
    ctx.fillStyle = "white"
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = "black"
    ctx.stroke()

    ctx.font = "20px Inconsolata"
    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(entity.entity_id===0 ? "P1" : "P2" ,x, canvas.height/2)
  }
}


const Page = ({location}) => {

  const [p1Lag, setP1Lag] = useState(250)
  const [p1Prediction, setP1Prediction] = useState(false)
  const [p1Reconciliation, setP1Reconciliation] = useState(false)
  const [p1Interpolation, setP1Interpolation] = useState(false)
  const [p2Lag, setP2Lag] = useState(250)
  const [p2Prediction, setP2Prediction] = useState(false)
  const [p2Reconciliation, setP2Reconciliation] = useState(false)
  const [p2Interpolation, setP2Interpolation] = useState(false)
  const [serverFps, setServerFps] = useState(3)

  const [p1Status, setP1Status] = useState("Waiting for connection...")
  const [p2Status, setP2Status] = useState("Waiting for connection...")
  const [serverStatus, setServerStatus] = useState("")

  const rafRef = useRef(null)
  const player1 = useRef(new Client())
  const player2 = useRef(new Client())
  const server = useRef(new Server())

  const p1Canvas = useRef(null)
  const p2Canvas = useRef(null)
  const sCanvas = useRef(null)

  const p1 = player1.current
  const p2 = player2.current
  const s = server.current

  useEffect(() => {

    const p1 = player1.current
    const p2 = player2.current
    const s = server.current


    if (!(player1.current && player2.current && server.current))
      return

    // Connect the clients to the server.
    s.connect(p1)
    s.connect(p2)

    // Read initial parameters from the UI.
    clearInterval(s.update_interval)
    s.update_interval = setInterval( () => {
      s.update()
      setServerStatus(s.status)
      if(sCanvas.current)
        renderWorld(sCanvas.current,s.entities)
    }, 1000 / serverFps)

    // When the player presses the arrow keys, set the corresponding flag in the client.
    const keyHandler = function(e) {
      e = e || window.event;
      if (e.keyCode === 39) {
        p1.key_right = (e.type === "keydown")
      } else if (e.keyCode === 37) {
        p1.key_left = (e.type === "keydown")
      } else if (e.key === 'd') {
        p2.key_right = (e.type === "keydown")
      } else if (e.key === 'a') {
        p2.key_left = (e.type === "keydown")
      } else {
        console.log(e)
      }
    }

    document.body.onkeydown = keyHandler
    document.body.onkeyup = keyHandler

    const draw = time => {
      p1.update(serverFps)
      p2.update(serverFps)
      setP1Status(p1.status)
      setP2Status(p2.status)

      if(p1Canvas.current)
        renderWorld(p1Canvas.current,p1.entities)
      if(p2Canvas.current)
        renderWorld(p2Canvas.current,p2.entities)

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(rafRef.current)
  }, [serverFps]) // Make sure the effect runs only once


  return (
    <Layout location={location} >
      <div className="multiplayer">
        <h3>Multiplayer client-server demo</h3>
        <p>
          Sample implementation of a client-server architecture demonstrating the main concepts explained by Gabriel Gambetta <a href="https://www.gabrielgambetta.com/client-server-game-architecture.html">over here</a>.
        </p>
        <br/>
        <br/>

        <section>
          <b>P1 view </b> Lag:
          <input type="number" min={1} value={p1Lag} onChange={(ev) => {
            const v = parseInt(ev.target.value)
            if(!isNaN(v)){
              p1.lag = v
              setP1Lag(v)
            }
          }}/>
          <input type="checkbox" checked={p1Prediction} onChange={(ev) => {
            const v = ev.target.checked
            setP1Prediction(v)
            p1.client_side_prediction = v
          }}/>
          Prediction 
          <input type="checkbox" checked={p1Reconciliation} onChange={(ev) => {
            const v = ev.target.checked
            setP1Reconciliation(v)
            p1.server_reconciliation = v
          }}/>
          Reconciliation 

          <input type="checkbox" checked={p1Interpolation} onChange={(ev) => {
            const v = ev.target.checked
            p1.entity_interpolation = v
            setP1Interpolation(v)
          }}/>
          Interpolation
          <canvas ref={p1Canvas} width="920" height="75"></canvas>
          <div>{p1Status}</div>
        </section>

        <section>
          <b>Server view</b> FPS:
          <input type="number" min={1} max={60} value={serverFps} onChange={(ev) => {
            const v = parseInt(ev.target.value)
            if(!isNaN(v)){
              setServerFps(parseInt(ev.target.value))
              // Read initial parameters from the UI.
              clearInterval(s.update_interval)
              s.update_interval = setInterval( () => {
                s.update()
                renderWorld(sCanvas.current,s.entities)
              }, 1000 / serverFps)
            }

          }}/>
          <canvas ref={sCanvas} width="920" height="75"></canvas>
          <div>{serverStatus}</div>
        </section>

        <section>
          <b>P2 view</b> Lag:
          <input type="number" min={1} value={p2Lag} onChange={(ev) => {
            const v = parseInt(ev.target.value)
            if(!isNaN(v)){
              p2.lag = v
              setP2Lag(v)
            }
          }}/>
          <input type="checkbox" checked={p2Prediction} onChange={(ev) => {
            const v = ev.target.checked
            setP2Prediction(v)
            p2.client_side_prediction = v
          }}/>
          Prediction 
          <input type="checkbox" checked={p2Reconciliation} onChange={(ev) => {
            const v = ev.target.checked
            setP2Reconciliation(v)
            p2.server_reconciliation = v
          }}/>
          Reconciliation 
          <input type="checkbox" checked={p2Interpolation} onChange={(ev) => {
            const v = ev.target.checked
            p2.entity_interpolation = v
            setP2Interpolation(v)
          }}/>

          Interpolation
          <br/>
          <canvas ref={p2Canvas} width="920" height="75"></canvas>
          <div>{p2Status}</div>
        </section>

      </div>
    </Layout>
  )
}

export default Page
