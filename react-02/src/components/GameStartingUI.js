import React from 'react';
import RadioInput from './RadioInput';

const GameStartingUI = props => {
  return (
    <div className="game">
      <form>
        <div>
          {props.title}
          <label>
            <RadioInput
              value={props.value1}
              playOption={props.playOption}
              handleRadioClick={e => {
                props.handleRadioClick(e);
              }}
            />
            {props.text1}
          </label>
          <label>
            <RadioInput
              value={props.value2}
              playOption={props.playOption}
              handleRadioClick={e => {
                props.handleRadioClick(e);
              }}
            />
            {props.text2}
          </label>
        </div>
      </form>
    </div>
  );
};

export default GameStartingUI;
