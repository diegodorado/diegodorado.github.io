import React from 'react'
import Layout from '../../layouts/main'
import { SEO } from '../../components/seo'
import BioImage from '../../components/bio/bioImage'
import Pics from '../../components/bio/pics'
import Link from '../../components/link'

const BioIndex = (props) => (
  <Layout location={props.location}>
    <div className="bio">
      <BioImage />
      <p className="spacey">
        Diego Dorado is a live coder, programmer and electronic artist based in
        Agentina. He is passionate about research projects that combine
        technological innovation with artistic expressions.
        <br />
        He has worked as an educator, sound designer, composer, video games and
        web developer.
        <br /> <br />
        He has participated in various works of electronic art coding on
        microcontrollers, videogames, signal processing, audiovisuals, sound
        data and interactive webs; as well as for different formats: virtual
        reality, augmented reality, fulldome, mapping, audiovisual performance,
        sound installations and e-textiles.
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

export const Head = () => <SEO title="bio" />
