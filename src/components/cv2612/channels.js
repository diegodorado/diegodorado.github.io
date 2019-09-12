import React, {useContext} from "react"
import {CV2612Context} from "./context"
import Channel from "./channel"

const Channels = (props) =>{
  const context = useContext(CV2612Context)

  const onFilterChannel = (ev) => {
    ev.preventDefault()
    const ch = parseInt(ev.target.attributes.ch.value)
    context.filterChannel(ch)
  }

  return (
      <>
        <nav>
          {//<a href="/" className={context.filters.ch === 6 ? 'active':'' } ch={6} onClick={onFilterChannel} title={'Show only Omni channel'}>Omni channel</a>
          }
          {[0,1,2,3,4,5].map(i => <a href="/" className={context.filters.ch === i ? 'active':'' } key={i} ch={i} onClick={onFilterChannel} title={`Show only channel ${i+1}` }>{`${i+1}` }</a>)}
        </nav>
        <Channel />
      </>
  )


}

export default Channels
