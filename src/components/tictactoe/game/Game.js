import Board from './Board';
import ComputerPlayer from './ComputerPlayer';
import HumanPlayer from './HumanPlayer.js';

class Game {
  constructor() {
    this.tttboard = new Board();
    this.humanPlayer = new HumanPlayer('x');
    this.computerPlayer = new ComputerPlayer('o');
    this.currentPlayer = this.humanPlayer;
  }

  get board() {
    return this.tttboard.board;
  }

  get humanWon() {
    return this.tttboard.won(this.humanPlayer.mark);
  }

  get computerWon() {
    return this.tttboard.won(this.computerPlayer.mark);
  }

  get gameOver() {
    return this.tttboard.gameOver();
  }

  winner() {
    return this.tttboard.winner(this);
  }

  makeHumanMove(pos) {
    this.tttboard.placeMark(pos, this.currentPlayer);
  }

  makeComputerMove() {
    if (this.gameOver) {
      return;
    }
    this.currentPlayer = this.computerPlayer;
    const pos = this.computerPlayer.choosePosition(this);
    this.tttboard.placeMark(pos, this.currentPlayer);
    this.currentPlayer = this.humanPlayer;
  }


}

export default Game;
