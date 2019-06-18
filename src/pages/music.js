import React from "react"
import Layout from "../layouts/main"
import SEO from "../components/seo"
import SoundPlayer from '../components/sound-player'
import { Trans, useTranslation } from 'react-i18next'




const clientId = '802921cdc630a9a0d66f25c665703b8c';
const resolveUrl = 'https://soundcloud.com/diego-dorado/sets/music';


const MusicIndex = ({ data, location }) => {
  const [t, i18n] = useTranslation();

  //const { data } = this.props
  //const tracks = data.allSoundcloudtrack.edges
  return (
    <Layout location={location} >
      <SEO title="music" />
      <p className="spacey">
        <Trans i18nKey="MusicIntro"
          components={[<a href="https://soundcloud.com/diego-dorado/tracks" target="_blank" rel="noopener noreferrer">soundcloud</a>]} />
      </p>
      <SoundPlayer clientId={clientId} resolveUrl={resolveUrl} />
      {/*tracks.map(({ node }) => {
          return ({node.id})
        })*/}
    </Layout>
  )
}

export default MusicIndex

/*
export const pageQuery = graphql`
  query {
    allSoundcloudtrack {
      edges {
        node {
          title
          description
        }
      }
    }
  }
`

*/
