import React from 'react'
import { Router } from '@reach/router'
import { Seo } from '../../components/seo'

import './styles.sass'
import './print.sass'

import Header from './header'
import Faq from './faq'
import Home from './home'
import Music from './music'
import Edit from './edit'
import Join from './join'
import Lead from './lead'
import Play from './play'
import Provider from './provider'

const NotFound = () => <div>Sorry, nothing here.</div>

const Bingo = () => (
  <div className={`bingo`}>
    <Provider>
      <Header />
      <Router>
        <Home path="/" />
        <Edit path=":matchId/edit" />
        <Join path=":matchId/join" />
        <Lead path=":matchId/play" />
        <Play path=":matchId/:playerId/play" />
        <Music path="music" />
        <Faq path="faq" />
        <NotFound default />
      </Router>
    </Provider>
  </div>
)

export default Bingo
