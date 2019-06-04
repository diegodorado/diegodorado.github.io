import React from "react"
import Layout from "../layouts/main"
import SEO from "../components/seo"
import SoundPlayer from '../components/sound-player'

const clientId = '802921cdc630a9a0d66f25c665703b8c';
const resolveUrl = 'https://soundcloud.com/diego-dorado/sets/music';


class MusicIndex extends React.Component {

  render() {
    //const { data } = this.props
    //const tracks = data.allSoundcloudtrack.edges
    return (
      <Layout location={this.props.location} >
        <SEO title="music" />
        <p className="spacey">
          Hi there. These are some tracks I have done in the past.
          They are all uploaded to <a href="https://soundcloud.com/diego-dorado/tracks">soundclound</a>, but I like to see them here, ;)
        </p>
        <SoundPlayer clientId={clientId} resolveUrl={resolveUrl} />
        {/*tracks.map(({ node }) => {
            return ({node.id})
          })*/}
      </Layout>
    )
  }
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
