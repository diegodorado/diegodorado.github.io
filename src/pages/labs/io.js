import React, { useState } from 'react'
//import QrReader from 'react-qr-reader'
import Link from "../../components/link"
import Layout from "../../layouts/io"
import SEO from "../../components/seo"

let QrReader = null
try {
  QrReader = require('react-qr-reader')
} catch (e) {
  console.log(e)
}


const IoIndex = ({location})  =>{
  const parts = location.hash.split('#')
  const pattern = (parts.length >1) ? decodeURIComponent(parts[1]) : ''
  console.log(pattern)


  const [phase, setPhase] = useState(1)
  const [count, setCount] = useState(0)
  const [shadow, setShadow] = useState('Nothing')


  const handleScanSelf = data => {
    if (data){
      setShadow(data)
      setPhase(3)
    }
  }


  const handleScanOther = data => {
    if (data){
      setShadow(data)
      setPhase(5)
      setCount(count+1)
    }
  }

  const handleError = err => console.error(err)

  const phase1Msg  = <>
    <p>Bienvenido al Juego de las Sombras Parejas</p>
    <button onClick={()=> setPhase(2)} >comenzar</button>
  </>

  const phase2Msg  = <>
    <p>Para saber quién sos escaneá el QR de tu invitación al juego</p>
    <QrReader className="qr-reader" delay={300} onError={handleError} onScan={handleScanSelf} />
  </>

  const phase3Msg  = <>
    <p>Bienvenido {shadow} Ahora podés comenzar a buscar tus Sombras Parejas.</p>
    <button onClick={()=> setPhase(4)} >continuar</button>
  </>

  const phase4Msg  = <>
    <p>
      Escaneá los códigos QR de los demás participantes del juego.
      <br/><br/>
      Llevas {count} de 12 reuniones realizadas
    </p>
    <QrReader className="qr-reader" delay={300} onError={handleError} onScan={handleScanOther} />
  </>

  const phase5Msg  = <>
    <p>
      El resultado de tu reunión con (quizás poner arquetipo tal 1 de 12, que incluso puede ser el mismo que a uno le tocó) es ... (aquí poner palabra que está asignada en el cuadro de doble entrada de miravilla.net)
      <br/><br/>
      Llevas {count} de 12 reuniones realizadas
    </p>
    <button onClick={()=> setPhase(4)} >continuar la búsqueda</button>
  </>

  const phase6Msg  = <>
    <p>
      video heka
    </p>
    <button onClick={()=> setPhase(0)} >reiniciar</button>
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
