import React, { useState, useEffect } from 'react'
import Link from "../../components/link"
import Layout from "../../layouts/io"
import SEO from "../../components/seo"

// workaround to solve SSR
//import QrReader from 'react-qr-reader'
let QrReader = null
try {
  QrReader = require('react-qr-reader')
} catch (e) {
  console.log('Can not require qr reader')
}


const IoIndex = ({location})  =>{

  const [phase, setPhase] = useState(1)
  const [others, setOthers] = useState([])
  const [myself, setMyself] = useState(0)

  // try to load shadow from hash
  useEffect( ()=> {
    const parts = location.hash.split('#')
    const i = (parts.length >1) ? parseInt(parts[1]) : 0
    if(i>0){
      setPhase(3)
      setMyself(i)
    }

  },[])

  const handleScanSelf = data => {
    if (data){
      setPhase(3)
      setMyself(parseInt(data))
    }
  }


  const handleScanOther = data => {
    if (data){
      const i = parseInt(data)
      if(i>0){
        setOthers(o => o.concat(i))
        setPhase(5)
      }
    }
  }

  const count = () => (new Set(others)).size
  const last = () => others[others.length - 1]


  const handleError = err => console.error(err)

  const phase1Msg  = <>
    <p>Bienvenido al Juego de las Sombras Parejas</p>
    <button onClick={()=> setPhase(2)} >comenzar</button>
  </>

  const phase2Msg  = <>
    <p>Para saber quién sos escaneá el QR de tu invitación al juego</p>
    <QrReader className="qr-reader" delay={300} onScan={handleScanSelf} onError={handleError} />
  </>

  const phase3Msg  = <>
    <p>
      Bienvenido {myself}
      <br/><br/>
      ♈ ♉ ♊ ♋ ♌ ♍
      Ahora podés comenzar a buscar tus Sombras Parejas.</p>
    <button onClick={()=> setPhase(4)} >continuar</button>
  </>

  const phase4Msg  = <>
    <p>
      Escaneá los códigos QR de los demás participantes del juego.
      <br/><br/>
      Llevas {count()} de 12 reuniones realizadas
    </p>
    <QrReader className="qr-reader" delay={300} onError={handleError} onScan={handleScanOther} />
  </>

  const phase5Msg  = <>
    <p>
      El resultado de tu reunión con {last()} es {last()}
      <br/><br/>
      Llevas {count()} de 12 reuniones realizadas
    </p>
    <button onClick={()=> setPhase(4)} >continuar la búsqueda</button>
  </>

  const phase6Msg  = <>
    <p>
      video heka
    </p>
    <button onClick={()=> setPhase(0)} >volver a comenzar</button>
  </>

  return (
  <Layout location={location} >
    <SEO title="labs" />
    {(phase===1) && phase1Msg}
    {(phase===2) && phase2Msg}
    {(phase===3) && phase3Msg}
    {(phase===4) && phase4Msg}
    {(phase===5) && phase5Msg}
    {(phase===6) && phase6Msg}
  </Layout>)

}


export default IoIndex
