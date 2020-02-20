import React from "react"
import Link from "../../components/link"
import Layout from "../../layouts/main"
import SEO from "../../components/seo"

const LabsIndex = ({location})  =>
  <Layout location={location} >
    <SEO title="labs" />
    <p className="spacey">
      Hi there! Here you can find some web experiments to try out.
    </p>
    <ul>
      <li>
        <h4><a href="/map-h/" target="new" >map-H</a></h4>
        <p>
        map-H (música asistida por Humano) es una webapp que genera ritmos de percusión intentando inferir el ritmo propuesto por el humano.
        </p>
      </li>
      <li>
        <h4><a href="/algo-rimo/" target="new" >Algo Rimo</a></h4>
        <p>
        Webapp that generates random sonnets from permutations of verses of a corpus composed of sonnets in Spanish that are in the public domain.
        </p>
      </li>
      <li>
        <h4><Link to={`/labs/io`} >IO HEKA</Link></h4>
         <p>
          Matching Shadow Game (by Instrumento Óptico). A playful interaction based on categories of archetypes and zodiacal correspondences drawn from classical mythology.
         </p>
      </li>
      <li>
        <h4><Link to={`/labs/live-emojing`} >Live Emojing Playground</Link></h4>
        <p>
          Embrace live coding by playing with emojis.
          Try out some TidalCycles patterns right in the browser.
          You may even join someone doing <Link to={`/works/live-emojing`} >live emojing</Link> if there is an open channel.
        </p>
      </li>
      <li>
        <h4><Link to={`/labs/cv2612`} >CV2612 Editor</Link></h4>
        <p>
          A browser-based editor for the <Link to={`/works/cv2612`} >CV2612.</Link>, made to edit its patches and midi mappings.
          <br/>
          You can have a taste of its sound as it has an emulator.
        </p>
      </li>
      <li>
        <h4><Link to={`/labs/fmtribe`} >FM TRIBE</Link></h4>
        <p>FMTribe is an OPL3 synth/drum machine/thingie focused on live jamming for DOS.
        <br/>
        Developed by <a href="https://github.com/munshkr" target="_blank" rel="noopener noreferrer">munshkr</a> and brought to the browser thanks to <a href="https://js-dos.com/" target="_blank" rel="noopener noreferrer">js-dos</a>.
        Checkout <a href="https://github.com/munshkr/fmtribe" target="_blank" rel="noopener noreferrer">fmtribe sources</a>.</p>
      </li>

    </ul>
    <p className="spacey">
      There are also miscellaneous contents that would otherwise be hidden <em>(even for me)</em>
    </p>
    <ul>
      <li><a href="/live-emojing-presentation/" target="new" >Live Emojing Presentation</a></li>
      <li>... not much more</li>
    </ul>
  </Layout>

export default LabsIndex
