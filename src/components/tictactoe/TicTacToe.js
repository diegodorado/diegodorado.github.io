import React, { Component } from 'react';
import Game from './game/Game';
import OMark from './OMark';
import XMark from './XMark';
import './TicTacToe.sass';

class TicTacToe extends Component {
  constructor() {
    super();
    this.game = new Game();
    this.state = {
      board: this.game.board,
      gameOver: false,
      yourTurn: true
    };
    this.handleChoosePosition = this.handleChoosePosition.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  handleChoosePosition(event) {
    if(!this.state.yourTurn)
      return

    const pos = event.currentTarget.getAttribute('data-position').split(',');
    if (!this.game.board[pos[0]][pos[1]] && !this.game.gameOver) {
      this.game.makeHumanMove(pos)
      this.setState({ board: this.game.board, yourTurn:false }, () => {
        setTimeout(() => {
          this.game.makeComputerMove()
          this.setState({ board: this.game.board, yourTurn:true }, () => {
            setTimeout(() => {
              this.setState({ gameOver: this.game.gameOver });
            }, 1000);
          });
        }, 1000);
      });
    }
  }

  resetGame() {
    this.game = new Game();
    this.setState({
      board: this.game.board,
      gameOver: false,
    });
  }

  renderMark(mark) {
    if (mark === 'x') {
      return <XMark className="mark--x" />;
    } else if (mark === 'o') {
      return <OMark className="mark--o" />;
    }
  }

  renderBoardBlocks() {
    const blocks = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        blocks.push(
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            data-position={[i, j]}
            onClick={this.handleChoosePosition}
            className={`block ${(!this.game.board[i][j] && !this.game.gameOver) ? 'block--selectable': ''}`}
            key={`${i}|${j}`}
          >
            {this.renderMark(this.game.board[i][j])}
          </div>
        );
      }
    }
    return blocks;
  }

  renderGame() {
    if (this.state.gameOver)
      return (
        <section className="board--message">
          {this.game.computerWon ? 'Perdiste':'Empate'}!
          <button className="board--btn" onClick={this.resetGame}>
            Jugar de nuevo
          </button>
        </section>
      )
    else
      return this.renderBoardBlocks()
  }

  render() {
    return (
      <div className="ttt">
        <h2>Ta Te Ti</h2>
        <h3>No intentes ganar; no lo harás.</h3>
        <div className="board">
          <div className="board--wrapper">
            {this.renderGame()}
          </div>
        </div>
        <p>El programa usa el algoritmo minimax para elegir la mejor jugada.</p>
        <p>Esta es una adaptación al español con mínimos cambios al <a href="https://github.com/AaronCCWong/portfolio/blob/master/src/util/tictactoe/ComputerPlayer.js#L15">código original</a> escrito por <a href="https://github.com/AaronCCWong">@AaronCCWong</a>.</p>
      </div>
    );
  }
}

export default TicTacToe;
