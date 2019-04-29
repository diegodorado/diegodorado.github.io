import React from 'react'
import './index.sass'


class Knob extends React.Component {
  constructor(props) {
    super(props);
    this.numTicks = Math.abs(props.max - props.min + 1)
    this.fullAngle = props.degrees;
    this.startAngle = (360 - props.degrees) / 2;
    this.endAngle = this.startAngle + props.degrees;
    this.margin = props.size * 0.15;
    this.currentDeg = Math.floor(
      this.convertRange(
        props.min,
        props.max,
        this.startAngle,
        this.endAngle,
        props.value
      )
    );
    this.state = { deg: this.currentDeg, value: props.value, cc: null, ch: null };

    Knob.instances.push(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.value !== this.props.value){
      this.currentDeg = Math.floor(
        this.convertRange(
          this.props.min,
          this.props.max,
          this.startAngle,
          this.endAngle,
          nextProps.value
        )
      );
      this.setState({ deg: this.currentDeg, value: nextProps.value })
    }
  }


  startDrag = e => {
    e.preventDefault();
    const knob = e.target.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };
    const moveHandler = e => {
      this.currentDeg = this.getDeg(e.clientX, e.clientY, pts);
      this.quantizeAngle();

      let newValue = Math.floor(
        this.convertRange(
          this.startAngle,
          this.endAngle,
          this.props.min,
          this.props.max,
          this.currentDeg
        )
      )
      this.setState({ deg: this.currentDeg, value: newValue })
      this.props.onChange(this)
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", e => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  getDeg = (cX, cY, pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = Math.atan(y / x) * 180 / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(this.startAngle, deg), this.endAngle);
    return finalDeg;
  };

  quantizeAngle = () => {
    const incr = this.fullAngle / (this.numTicks-1)
    const pos = Math.round((this.currentDeg-this.startAngle)/incr)
    this.currentDeg = (this.startAngle + incr*pos)
  };

  convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
    return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
  };

  renderTicks = () => {
    let ticks = [];
    const incr = this.fullAngle / (this.numTicks-1);
    const size = this.margin + this.props.size / 2;
    for (let deg = this.startAngle; deg <= this.endAngle; deg += incr) {
      const tick = {
        deg: deg,
        tickStyle: {
          height: size + 10,
          left: size - 1,
          top: size + 2,
          transform: "rotate(" + deg + "deg)",
          transformOrigin: "top"
        }
      };
      ticks.push(tick);
    }
    return ticks;
  };

  dcpy = o => {
    return JSON.parse(JSON.stringify(o));
  };

  render() {
    let kStyle = {
      width: this.props.size,
      height: this.props.size
    };
    let iStyle = this.dcpy(kStyle);
    let oStyle = this.dcpy(kStyle);
    kStyle = {}
    oStyle.margin = this.margin;
    if (this.props.color) {
      oStyle.backgroundImage =
        "radial-gradient(100% 70%,hsl(210, " +
        this.currentDeg +
        "%, " +
        this.currentDeg / 5 +
        "%),hsl(" +
        Math.random() * 100 +
        ",20%," +
        this.currentDeg / 36 +
        "%))";
    }
    iStyle.transform = "rotate(" + this.state.deg + "deg)";

    return (
      <div className="knob" style={kStyle}>
        <div className="ticks">
          {this.renderTicks().map((tick, i) => (
                <div
                  key={i}
                  className={
                    "tick" + (tick.deg <= this.currentDeg ? " active" : "")
                  }
                  style={tick.tickStyle}
                />
              ))}
        </div>
        <div className="knob outer" style={oStyle} onMouseDown={this.startDrag}>
          <div className="knob inner" style={iStyle}>
            <div className="grip" />
          </div>
        </div>
        <div className="text">
          <span>{(this.state.ch && this.state.cc) ? `${this.state.ch}:${this.state.cc}` : 'n/a'}</span>
          <span>{this.state.value}</span>
          <br/><br/>
          <span>{this.props.name}</span>
        </div>
      </div>
    );
  }
}
Knob.defaultProps = {
  size: 60,
  min: 10,
  max: 30,
  degrees: 210,
  value: 0
};

Knob.instances = [];

export default Knob;
