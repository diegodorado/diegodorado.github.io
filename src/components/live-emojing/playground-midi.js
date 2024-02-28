import React, { useState, useEffect, useContext } from 'react'
import LiveEmojingContext from './context.js'
import { emojiArray } from './utils'

const emojis_all =
  '😀😁😂🤣😃😄😅😆😉😊😋😎😍😘😗😙😚🙂🤗🤩🤔🤨😐😑😶🙄😏😣😥😮🤐😯😪😫😴😌😛😜😝🤤😒😓😔😕🙃🤑😲🙁😖😞😟😤😢😭😦😧😨😩🤯😬😰😱😳🤪😵😡😠🤬😷🤒🤕🤢🤮🤧😇🤠🤡🤥🤫🤭🧐🤓😈👿👹👺👽👾🤖💩😺😸😹😻😼😽🙀😿😾🙈🙉🙊🤦💪👈👉👆🖕👇🤞🖖🤘🤙🖐️✋👌👍👎✊👊👋🤟👏👐🙌🤲🙏🤝💅💓💔💕💖💗💙💚💛🧡💜🖤💣💥💦💨💫👑💄💍💎🐵🐒🦍🐶🐺🦊🐱🐈🦁🐯🐴🦄🦓🦌🐮🐷🐗🦒🐘🦏🐭🐁🐀🐹🐰🐇🐿️🦔🦇🐻🐨🐼🐾🦃🐔🐓🐣🐤🐥🐦🐧🕊️🦅🦆🦉🐸🐊🐢🦎🐍🐲🐉🦕🦖🐳🐋🐬🐟🐠🐡🦈🐙🐚🦀🦐🦑🐌🦋🐛🐜🐝🐞🦗🕷️🕸️🦂💐🌸💮🏵️🌹🥀🌺🌻🌼🌷🌱🌲🌳🌴🌵🌾🌿☘️🍀🍁🍂🍃🍇🍈🍉🍍🍎🍏🍐🍑🍒🍓🥝🍅🥥🥑🍆🥔🥕🌽🌶️🥒🥦🍄🥜🌰🍞🥐🥖🥨🥞🧀🍖🍗🥩🥓🍔🍟🍕🌭🥪🌮🌯🥙🥚🍳🥘🍲🥣🥗🍿🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🍡🥟🥠🥡🍦🍧🍨🍩🍪🎂🍰🥧🍫🍬🍭🍮🍯🍼🥛☕🍵🍶🍾🍷🍸🍹🍺🍻🥂🥃🥤🔪🏺🎃🎄🎆🎇✨🎈🎉🎊🎋🎍🎎🎏🎐🚀🛸⏰🕘🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌈🔥💧'

const Playground = ({ pattern }) => {
  const context = useContext(LiveEmojingContext)
  const [highlighted, setHighlighted] = useState(false)
  const [emojis, setEmojis] = useState(['', '', '', '', '', '', '', ''])

  const randomize = () => {
    const e = emojiArray(emojis_all)
    setEmojis((es) => es.map((el) => e[Math.floor(Math.random() * e.length)]))
  }

  useEffect(() => {
    randomize()
    navigator.requestMIDIAccess().then(
      (ma) => {
        for (let input of ma.inputs.values()) {
          input.onmidimessage = onMIDIMessage
        }
      },
      () => console.log('Could not access your MIDI devices.')
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onMIDIMessage = (msg) => {
    const data = Array.from(msg.data)
    if (data[0] === 0x90 && data[2] > 0) {
      if (data[1] === 104 || data[1] === 32) randomize()
      else if (data[1] === 120 || data[1] === 31) commit()
      else {
        const firsts = [0, 16, 32, 48, 64, 80, 96, 112]
        const i = firsts.findIndex((e) => e + 8 >= data[1])
        const ii = data[1] - firsts[i]
        const e = emojiArray(emojis_all)
        setEmojis((es) => {
          es[ii] = i === 0 ? '🤫' : e[i * Math.floor(e.length / 8) + ii]
          //return a new array to let react update
          return Array.from(es)
        })
      }
    }

    if (data[0] === 0xb0 && data[1] < 8) {
      const emojis_less =
        '🤫😂🤣😎😍😘🤩😴😖😢😭🤯😱😡🤡👿👹👺👽👾🤖💩😺😻🙊💪🖕👌👏🙏💓💔💚💛🧡💜💣💥💦💍💎🐵🐒🦍🐶🐺🦊🐱🐈🦁🐯🐴🦄🦓🦌🐮🐷🐗🦒🐘🦏🐭🐁🐀🐹🐰🐇🐿️🦔🦇🐻🐨🐼🐾🦃🐔🐓🐣🐤🐥🐦🐧🕊️🦅🦆🦉🐸🐊🐢🦎🐍🐲🐉🦕🦖🐳🐋🐬🐟🐠🐡🦈🐙🐚🦀🦐🦑🐌🦋🐛🐜🐝🐞🦗🕷️🕸️🦂💐🌸💮🏵️🌹🥀🌺🌻🌼🌷🌱🌲🌳🌴🌵🌾🌿☘️🍀🍁🍂🍃🍇🍈🍉🍍🍎🍏🍐🍑🍒🍓🥝🍅🥥🥑🍆🥔🥕🌽🌶️🥒🥦🍄🥜🌰🍞🥐🥖🥨🥞🧀🍖🍗🥩🥓🍔🍟🍕🌭🥪🌮🌯🥙🥚🍳🥘🍲🥣🥗🍿🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🍡🥟🥠🥡🍦🍧🍨🍩🍪🎂🍰🥧🍫🍬🍭🍮🍯🍼🥛☕🍵🍶🍾🍷🍸🍹🍺🍻🥂🥃🥤🔪🏺🎃🎄🎆🎇✨🎈🎉🎊🎋🎍🎎🎏🎐🚀🛸⏰🕘🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌈🔥💧'

      const e = emojiArray(emojis_less)

      setEmojis((es) => {
        es[data[1]] = e[data[2]]
        //return a new array to let react update
        return Array.from(es)
      })
    }
  }

  const commit = () => {
    setHighlighted(true)
    setTimeout(() => setHighlighted(false), 300)
    setEmojis((es) => {
      const p = es.join('')
      context.sendPattern(p)
      return es
    })
  }

  // <Helmet htmlAttributes={{class: 'full-screen' }} />
  return (
    <div className="play play-midi">
      <div className={`input`}>
        <pre className={`${highlighted ? 'highlight' : ''} preview`}>
          {emojis.map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </pre>
      </div>
    </div>
  )
}

export default Playground
