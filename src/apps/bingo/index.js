import React, {useContext,useEffect, useState} from "react"
import { Router , useParams} from "@reach/router"
import Context from "../../components/context"
import SEO from "../../components/seo"
import Header from "./header"
import Faq from "./faq"
import Home from "./home"
import Music from "./music"
import Edit from "./edit"
import Join from "./join"
import Play from "./play"
import {BingoProvider} from "./context"

const NotFound = () => (
  <div>Sorry, nothing here.</div>
)

const Bingo = () => (
  <>
    <SEO title="bingo" />
    <div className={`bingo`}>
      <BingoProvider>
        <Header/>
        <Router>
          <Home path="/" />
          <Edit path=":matchId/edit" />
          <Join path=":matchId/join" />
          <Play path=":matchId/:playerId/play" />
          <Music path="music" />
          <Faq path="faq" />
          <NotFound default />
        </Router>
      </BingoProvider>
    </div>
  </>
)

export default Bingo
