import React from 'react';
import minimax from './minimax';
import Board from './Board';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board1: ['X', 'O', null, null, null, null, null, 'O', 'X'],
      board2: ['X', 'O', null, null, null, null, null, null, null]
    };
  }

  componentDidMount() {
    let newBoard1 = this.state.board1.slice();
    let newBoard2 = this.state.board2.slice();
    let i = minimax.findBestMove(newBoard1, true);
    let j = minimax.findBestMove(newBoard2, true);
    newBoard1[i] = '1';
    newBoard2[j] = '2';
    this.setState({
      board1: newBoard1,
      board2: newBoard2
    });
  }
  render() {
    return (
      <div>
        <Board squares={this.state.board1} />
        <Board squares={this.state.board2} />
      </div>
    );
  }
}

export default Test;
