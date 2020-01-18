import React from "react"
import Layout from "../../layouts/main"
import SEO from "../../components/seo"
import BioImage from "../../components/bio/bioImage"
import Link from "../../components/link"

const BioIndex = props => (
  <Layout location={props.location} >
    <SEO title="bio" />
    <div className="bio">
      <BioImage />
      <p className="spacey">
        Diego Dorado es live coder, programador y artista electrónico argentino. Le apasionan los proyectos de investigación que combinan innovación tecnológica con expresiones artísticas.
        <br/>
        Ha trabajado como educador, diseñador sonoro, compositor y como desarrollador web y de videojuegos.
        <br/> <br/>
        Ha participado en obras de arte electrónico programando para microcontroladores, videojuegos, procesamiento de señales, audiovisuales, sonorización de datos y webs interactivas; así como para diferentes formatos: realidad virtual, realidad aumentada, fulldome, mapping, performance audiovisual, instalaciones sonoras y tecno-textiles.
        <br/> <br/>
        Curriculum Vitae: <Link to={`/bio/cv`}>online</Link> | <a target="_blank" rel="noopener noreferrer" href={`/es/cv-diego-dorado.pdf`}>pdf</a>
      </p>
    </div>
  </Layout>
)

export default BioIndex
