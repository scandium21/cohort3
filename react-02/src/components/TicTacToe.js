import React from 'react';
import GameStartingUI from './GameStartingUI';
import PlayerVSPlayer from './PlayerVSPlayer';
import './Game.css';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playOption: '',
      moveFirst: ''
    };

    this.handlePlayerPick = this.handlePlayerPick.bind(this);
    this.whoMovesFirst = this.whoMovesFirst.bind(this);
  }

  handlePlayerPick(e) {
    const item = e.target.value;
    if (item === 'playHuman') {
      this.setState({ playOption: 'playHuman' });
    } else {
      this.setState({ playOption: 'playComp' });
    }
  }

  whoMovesFirst(e) {
    const item = e.target.value;
    if (item === 'humanFirst') {
      this.setState({ moveFirst: 'humanFirst' });
    } else {
      this.setState({ moveFirst: 'compFirst' });
    }
  }

  render() {
    return (
      <div className="game-main">
        <GameStartingUI
          handleRadioClick={this.handlePlayerPick}
          playOption={this.state.playOption}
          title="Play with Computer?"
          text1="Yes"
          text2="No"
          value1="playComp"
          value2="playHuman"
        />

        {this.state.playOption &&
          (this.state.playOption === 'playComp' ? (
            <GameStartingUI
              handleRadioClick={this.whoMovesFirst}
              playOption={this.state.moveFirst}
              title="Who moves first?"
              text1="Human"
              text2="Computer"
              value1="humanFirst"
              value2="compFirst"
            />
          ) : (
            <PlayerVSPlayer />
          ))}
        {/* {this.state.moveFirst && ()} */}
      </div>
    );
  }
}

export default TicTacToe;
