import './live-emojing.sass'

import React, { useContext } from 'react'
import Layout from '../../layouts/main'
import { Seo } from '../../components/seo'
import Playground from '../../components/live-emojing/playground'
import Connection from '../../components/live-emojing/connection'
import LiveEmojingStore from '../../components/live-emojing/store'
import LiveEmojingContext from '../../components/live-emojing/context.js'

const LiveEmojingWithContext = ({ pattern }) => {
  const { configuring } = useContext(LiveEmojingContext)
  return configuring ? <Connection /> : <Playground pattern={pattern} />
}

const LiveEmojingIndex = ({ location }) => {
  const parts = location.hash.split('#')
  const pattern = parts.length > 1 ? decodeURIComponent(parts[1]) : ''

  return (
    <Layout location={location} bodyClass="live-emojing">
      <LiveEmojingStore>
        <LiveEmojingWithContext pattern={pattern} />
      </LiveEmojingStore>
    </Layout>
  )
}

export default LiveEmojingIndex

export const Head = () => <Seo title="live emojing" />
