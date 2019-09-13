import React from "react"
import Link from "../../components/link"
import Layout from "../../layouts/main"
import SEO from "../../components/seo"

const LabsIndex = ({location})  =>
  <Layout location={location} >
    <SEO title="labs" />
    <p className="spacey">
      Bienvenido! Acá puedes encontrar algunos experimentos web experiments para probar.
    </p>
    <ul>
      <li>
        <h4><Link to={`/labs/io`} >IO HEKA</Link></h4>
        <p>
        Juego de las Sombras Parejas (por Instrumento Óptico). Una interacción lúdica basada en categorías de arquetipos y correspondencias zodiacales extraídos de la mitología clásica.
        </p>

      </li>
      <li>
        <h4><Link to={`/labs/live-emojing`} >Live Emojing Playground</Link></h4>
        <p>
          Descubre <strong>live coding</strong> jugando con emojis.
          Prueba patrones de TidalCycles en el browser.
          Incluso puedes unirte a alguien que esté haciendo <Link to={`/works/live-emojing`} >live emojing</Link> si hay un canal abierto.
        </p>
      </li>
      <li>
        <h4><Link to={`/labs/cv2612`} >CV2612 Editor</Link></h4>
        <p>
          Un editor web del <Link to={`/works/cv2612`} >CV2612.</Link>, para modificar sus patches y mapping midi.
          <br/>
          Puedes probrar como suena ya que tiene un emulador.
        </p>
      </li>
      <li>
        <h4><Link to={`/labs/fmtribe`} >FM TRIBE</Link></h4>
        <p>FMTribe es un sinte/drum machine para DOS, con sonidos del OPL3 y con foco en live jamming.
        <br/>
        Desarrollado por <a href="https://github.com/munshkr" target="_blank" rel="noopener noreferrer">munshkr</a> y disponible en el browser gracias a <a href="https://js-dos.com/" target="_blank" rel="noopener noreferrer">js-dos</a>.
        Chequea el <a href="https://github.com/munshkr/fmtribe" target="_blank" rel="noopener noreferrer">código fuente de fmtribe</a>.</p>
      </li>

    </ul>
    <p className="spacey">
      También hay algunas misceláneas que de otro modo estarían ocultos <em>(incluso para mí)</em>
    </p>
    <ul>
      <li><a href="/live-emojing-presentation/" target="new" >Presentación de Live Emojing</a></li>
      <li>... no mucho más</li>
    </ul>
  </Layout>

export default LabsIndex
