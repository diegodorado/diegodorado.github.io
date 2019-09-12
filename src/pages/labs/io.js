import React, { useState } from 'react'
import QrReader from 'react-qr-reader'
import Link from "../../components/link"
import Layout from "../../layouts/io"
import SEO from "../../components/seo"



const IoIndex = ({location})  =>{

  const [index, setIndex] = useState(0)
  const [shadow, setShadow] = useState('Nothing')

  const startMsg = <p>
    Este Instrumento Óptico te invita a participar al Juego de las Sombras Parejas.
    <br/>
    Te ha tocado 1 de 12 Arquetipos Mitológicos.
    <br/>
    Primero aprendé cuál es el tuyo escaneando tu QR.
  </p>

  const iKnowMyselfMsg = <p>
    Coleccioná los destinos trágicos y cómicos que surjan de la conexión con otres.
    <br/>
    Les que obtengan todes, verán a Heka manifestarse.
  </p>



  const handleScan = data => {
    if (data){
      if(index===0){
        setShadow(data)
        setIndex(1)
      }else{

      }
    }
  }
  const handleError = err => {
    console.error(err)
  }

  return (
  <Layout location={location} >
    <SEO title="labs" />
    {(index===0) && startMsg}
    {(index===1) && iKnowMyselfMsg}
    <p>{shadow}</p>
    <QrReader className="qr-reader" delay={300} onError={handleError} onScan={handleScan} />
  </Layout>)

}


export default IoIndex
