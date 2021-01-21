import React, {useState, useEffect} from "react"

const Jitsi = ({name,room}) => {
  const jitsiContainerId = "jitsi-container-id"
  const [initilized, setInitialized] = useState(false)
  const [jitsi, setJitsi] = useState()

  useEffect(() => {

    if(initilized)
      return

    const loadJitsiScript = () => {
      let resolveLoadJitsiScriptPromise = null
      const loadJitsiScriptPromise = new Promise(resolve => {
        resolveLoadJitsiScriptPromise = resolve
      })
      const script = document.createElement("script")
      script.src = "https://meet.jit.si/external_api.js"
      script.async = true
      script.onload = () => resolveLoadJitsiScriptPromise(true)
      document.body.appendChild(script)
      return loadJitsiScriptPromise
    };

    const initialiseJitsi = async () => {
      if (!window.JitsiMeetExternalAPI) {
        await loadJitsiScript()
      }
      const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
        roomName:`bingo-${room}`,
        parentNode: document.getElementById(jitsiContainerId),
        configOverwrite: { 
          startWithAudioMuted: true,
          disableInviteFunctions: true,
          disableDeepLinking: true,
          disableRemoteMute: true,
          defaultLanguage: 'es',
          //displayJids: true,
          // Every participant after the Nth will start video muted.
          startVideoMuted: 10,
          // Start calls with video muted. Unlike the option above, this one is only
          // applied locally. FIXME: having these 2 options is confusing.
          //startWithVideoMuted: videoMuted,
          // Every participant after the Nth will start audio muted.
          startAudioMuted: 10,
          enableTalkWhileMuted: false,
        },
        interfaceConfigOverwrite: { 
          HIDE_INVITE_MORE_HEADER: true,
          DEFAULT_BACKGROUND: '#222222',
          SHOW_CHROME_EXTENSION_BANNER: false,
          //SHOW_JITSI_WATERMARK: false,
          MOBILE_APP_PROMO: false,
          SETTINGS_SECTIONS: [ 'devices'],
          //SHOW_BRAND_WATERMARK: false,
          TOOLBAR_BUTTONS: [
              'microphone', 'camera', 
              'settings',
              'videoquality', 'filmstrip', 
              'tileview', 
          ],
        },
      })
      _jitsi.executeCommand('displayName', name)
      _jitsi.executeCommand('subject', 'Bingo Musical')
      _jitsi.executeCommand('avatarUrl', `https://api.adorable.io/avatars/200/${name}`)
      setJitsi(_jitsi)
    }

    initialiseJitsi()
    setInitialized(true)

    return () => jitsi && jitsi.dispose()
  }, [initilized,name, room, jitsi])

  return <div className={`video ${jitsi? 'jitsi':'hidden'}`} id={jitsiContainerId} />
}

export default Jitsi
