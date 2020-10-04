import React, {useState} from "react"
import {navigate } from "gatsby"
import Header from "./header"

const FaqItem = ({startOpen=false,question,children}) => {
  const [open, setOpen] = useState(startOpen)

  const onToggle = (ev) => {
    ev.preventDefault()
    setOpen(!open)
  }

  return (
            <li>
              <a href="/" onClick={onToggle}>
                {question}
              </a>
              {open && children}
            </li>)

}

const BingoFaq = () => 
  (
    <>
      <Header/>
        <div className="faq">
          <h4>¿Cómo funciona?</h4>
          <iframe title={"Tutorial"} style={{width:'100%',height:'54vw',maxWidth:'560px',maxHeight:'315px'}}  src="https://www.youtube.com/embed/5xx1J1WPK-0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <br/>
          <br/>
          <br/>
          <h4>Preguntas Frecuentes</h4>
          <br/>
          <ul>
            <FaqItem startOpen={true} question="¿Puedo usar el BINGO con la gente de mi escuela / club / organización / familia ?">
              <p>¡Por supuesto!, cualquiera puede usar este BINGO.</p>
            </FaqItem>
            <FaqItem question="¿Cómo funciona?">
              <p>Una persona es el ANFITRIÓN, y suma a la partida a tantos jugadores como desee.
              <br/>
              El ANFITRIÓN es quien crea la partida, asigna cartones a los participantes, y lleva adelante la partida.</p>
            </FaqItem>
            <FaqItem question="¿Tiene costo?">
              <p>No, no tiene costo.</p>
            </FaqItem>
            <FaqItem question="¿Cómo creo una partida?">
              <p>
                1) Hacer click en el botón "CREAR UNA PARTIDA".
                <br/>
                2) Indicar los nombres de los participantes y cantidad de  cartones.
                <br/>
                3) Enviar a cada participante su enlace.
                <br/>
                4) Dar comienzo a la partida.
                <br/>
                <br/>
                Los participantes reciben los números que salen a medida que saques bolillas.
              </p>
            </FaqItem>
            <FaqItem question="¿Cómo reparto los cartones?">
              <p>
                Deberás enviar el enlace de cada participante por el medio que te parezca:  email / whatsapp / red-social.
                <br/>
                Tip: luego de agregar un participante el enlace queda en tu portapapeles.
              </p>
            </FaqItem>
            <FaqItem question="¿Puedo vender los cartones para recaudar fondos?">
              <p>Puedes hacerlo, pero deberás gestionar los cobros por tu cuenta. Este BINGO no administra cobros.</p>
            </FaqItem>
            <FaqItem question="¿Cómo sé cuando alguien gana?">
              <p>Es tarea del ANFITRIÓN ir mirando el ranking de aciertos de la partida.</p>
            </FaqItem>
            <FaqItem question="¿Cuantos participantes admite?">
              <p>No hay un límite definido y sé que se ha jugado de hasta 100 participantes. Se recomienda desactivar la opción de videoconferencia si van a ser mas de 20.</p>
            </FaqItem>
            <FaqItem question="¿Se puede jugar desde el teléfono?">
              <p>Si. Pero en el caso del ANFITRIÓN es preferible que utilice una computadora.</p>
            </FaqItem>
            <FaqItem question="¿Qué pasa si se cierra el navegador en medio de la partida?">
              <p>Si hubo una sesión anterior el BINGO propondrá recuperarla.</p>
            </FaqItem>
            <FaqItem question="¿Por qué hiciste el BINGO?">
              <p>Como un regalo a mi madre en tiempos del COVID-19.</p>
            </FaqItem>
          </ul>
          <br/>
          <br/>
          <button onClick={() => navigate('/bingo')}>VOLVER</button>
        </div>
      </>
    )

export default BingoFaq
