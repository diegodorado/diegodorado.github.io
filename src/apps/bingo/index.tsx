import { Router } from '@reach/router'
import React from 'react'

import './print.sass'
import './styles.sass'

import Edit from './edit'
import Faq from './faq'
import Header from './header'
import Home from './home'
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
