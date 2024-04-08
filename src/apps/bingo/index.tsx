import React from 'react'
import { Router } from '@reach/router'

import './styles.sass'
import './print.sass'

import Header from './header'
import Faq from './faq'
import Home from './home'
import Edit from './edit'
import Join from './join'
import Lead from './lead'
import Play from './play'

const NotFound = () => <div>Sorry, nothing here.</div>

const Bingo = () => (
  <div className={`bingo`}>
    <Header />
    <Router>
      <Home path="/" />
      <Edit path=":matchId/edit" />
      <Join path=":matchId/join" />
      <Lead path=":matchId/play" />
      <Play path=":matchId/:playerId/play" />
      <Faq path="faq" />
      <NotFound default />
    </Router>
  </div>
)

export default Bingo
