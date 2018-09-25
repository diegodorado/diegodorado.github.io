var theUniverse = null;
var selectMIDIIn = null;
var selectMIDIOut = null;
var midiAccess = null;
var midiIn = null;
var midiOut = null;

window.addEventListener('keydown', function() {
  tick();
} );

window.addEventListener('load', function() {
	theUniverse = document.getElementById("universe");
	navigator.requestMIDIAccess({sysex:true}).then( onMIDIInit, onMIDIFail );
} );

function onMIDIFail( err ) {
	alert("MIDI initialization failed.");
}

function onMIDIInit( midi ) {
  midiAccess = midi;
  selectMIDIIn=document.getElementById("midiIn");
  selectMIDIOut=document.getElementById("midiOut");

  // clear the MIDI input select
  selectMIDIIn.options.length = 0;

  for (var input of midiAccess.inputs.values()) {
    midiIn=input;
	  midiIn.onmidimessage = midiProc;
  	selectMIDIIn.add(new Option(input.name,input.id,false,false));
  }
  selectMIDIIn.onchange = changeMIDIIn;

  // clear the MIDI output select
  selectMIDIOut.options.length = 0;
  for (var output of midiAccess.outputs.values()) {
    midiOut=output;
  	selectMIDIOut.add(new Option(output.name,output.id,false,false));
  }
  selectMIDIOut.onchange = changeMIDIOut;

  midiAccess.onstatechange = onStateChange;

}


function onStateChange( e ) {
  // Print information about the (dis)connected MIDI controller
  console.log(e.port.name, e.port.manufacturer, e.port.state);
}

function changeMIDIIn( ev ) {
  if (midiIn)
    midiIn.onmidimessage = null;
  var selectedID = selectMIDIIn[selectMIDIIn.selectedIndex].value;

  for (var input of midiAccess.inputs.values()) {
    if (selectedID == input.id)
      midiIn = input;
  }
  midiIn.onmidimessage = midiProc;
}

function changeMIDIOut( ev ) {
  var selectedID = selectMIDIOut[selectMIDIOut.selectedIndex].value;

  for (var output of midiAccess.outputs.values()) {
    if (selectedID == output.id) {
      midiOut = output;
	  }
  }

}


function tick() {
}

function midiProc(event) {
  data = event.data;
  var cmd = data[0] >> 4;
  var channel = data[0] & 0xf;
  var noteNumber = data[1];
  var velocity = data[2];
  console.log(event.data.toString());
  //theUniverse.text = data.toString();
}
