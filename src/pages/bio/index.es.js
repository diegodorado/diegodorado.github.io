import React from 'react'
import Layout from '../../layouts/main'
import { Seo } from '../../components/seo'
import BioImage from '../../components/bio/bioImage'
import Pics from '../../components/bio/pics'
import Link from '../../components/link'

const BioIndex = (props) => (
  <Layout location={props.location}>
    <div className="bio">
      <BioImage />
      <p className="spacey">
        Diego Dorado es live coder, programador y artista electrónico argentino.
        Le apasionan los proyectos de investigación que combinan innovación
        tecnológica con expresiones artísticas.
        <br />
        Ha trabajado como educador, diseñador sonoro, compositor y como
        desarrollador web y de videojuegos.
        <br /> <br />
        Ha participado en obras de arte electrónico programando para
        microcontroladores, videojuegos, procesamiento de señales,
        audiovisuales, sonorización de datos y webs interactivas; así como para
        diferentes formatos: realidad virtual, realidad aumentada, fulldome,
        mapping, performance audiovisual, instalaciones sonoras y
        tecno-textiles.
        <br /> <br />
        Curriculum Vitae: <Link to={`/bio/cv`}>online</Link> |{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`/es/cv-diego-dorado.pdf`}
        >
          pdf
        </a>
        <br /> <br /> <br />
      </p>
      <Pics />
    </div>
  </Layout>
)

export default BioIndex

export const Head = () => <Seo title="bio" />
