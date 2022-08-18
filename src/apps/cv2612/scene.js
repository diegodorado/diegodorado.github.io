/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from "react"
import { CV2612Context } from "./context"
import Channel from "./channel"

const Scene = () => {
  const { state, dispatch } = useContext(CV2612Context)

  /*
  const storeScene = (ev) =>{
    ev.preventDefault()
    const s = parseInt(ev.target.attributes.scene.value, 10)
    //dispatch({ type: "update-param", code: code, value: s*256+127 })
    dispatch({ type: "set-patch", index: s })
  }

  const recallScene = (ev) =>{
    ev.preventDefault()
    const s = parseInt(ev.target.attributes.scene.value, 10)
    dispatch({ type: "select-patch", index: s })
  }
  */

  const onChangeChannel = index => ev => {
    ev.preventDefault()
    dispatch({ type: "change-channel", index })
  }

  const onChangePatch = index => ev => {
    ev.preventDefault()
    dispatch({ type: "change-patch", index })
  }

  return (
    <>
      <div className="two-cols">
        <div className="col">
          <nav>
            {[0, 1, 2, 3].map(i => (
              <a
                href="/"
                className={state.patchIdx === i ? "active" : ""}
                key={i}
                onClick={onChangePatch(i)}
                title={`Patch ${"ABCD"[i]}`}
              >
                {"ABCD"[i]}
              </a>
            ))}
          </nav>
        </div>
        <div className="col">
          <nav>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <a
                href="/"
                className={state.channelIdx === i ? "active" : ""}
                key={i}
                onClick={onChangeChannel(i)}
                title={`Channel ${i + 1}`}
              >{`${i + 1}`}</a>
            ))}
          </nav>
        </div>
      </div>

      <br />

      <Channel />
    </>
  )
}

export default Scene
