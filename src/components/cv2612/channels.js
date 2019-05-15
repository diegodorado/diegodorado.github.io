import React from 'react'
import {CV2612Context} from "./context"
import Channel from "./channel"

class Channels extends React.Component {
  static contextType = CV2612Context

  onFilterChannel= (ev) => {
    ev.preventDefault()
    const ch = parseInt(ev.target.attributes.ch.value)
    this.context.filterChannel(ch)
  }

  render() {
    const f = this.context.filters
    return (
        <>
          <nav>
            <a href="/" className={f.ch === 6 ? 'active':'' } ch={6} onClick={this.onFilterChannel} title="Show only Omni channel">Omni Channel</a>
            {[0,1,2,3,4,5].map(i => <a href="/" className={f.ch === i ? 'active':'' } key={i} ch={i} onClick={this.onFilterChannel} title={"Show only channel "+(i+1)}>{i+1}</a>)}
          </nav>
          {[0,1,2,3,4,5,6].map(i => (f.ch === i) && <Channel key={i} ch={i} />)}
        </>
    )
  }

}

export default Channels
