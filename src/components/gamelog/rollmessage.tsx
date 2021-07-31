import React, { Component } from 'react';
import * as CSS from 'csstype';

import { Text, Tooltip } from '@blueprintjs/core';

import UI from '../../assets/ui/index';
import Communications from '../../core/communications';

interface RollMessageProps {
  sender: string;
  result: number;
  rolls: number[];
  modifier: number;
  diceType: number;
}

interface MessageState {
  loading: boolean;
  borderColor: string;
}

class RollMessage extends Component<RollMessageProps, MessageState> {
  constructor(props: RollMessageProps) {
    super(props);

    Communications.cacher.getUser(props.sender).then((userData) => {
      this.setState({
        loading: false,
        borderColor: userData.colour
      });
    });
  }

  state = {
    loading: false,
    borderColor: ''
  };

  render() {
    const { result, rolls, modifier, diceType } = this.props;
    const { borderColor, loading } = this.state;
    if (rolls.length == 1) {
      return (
        <div
          className='roll-singular roll-message'
          style={{ borderColor: borderColor }}
        >
          <p className='roll-type'>
            {rolls.length}d{diceType}
          </p>
          <div className='roll-map'>
            <p className='roll' style={this.getRollImage(diceType, true)}>
              {rolls[0]}
            </p>
            <p className='modifier'>
              {modifier >= 0 ? '+' : '-'}
              {Math.abs(modifier)}
            </p>
            <p className='result'>{result}</p>
          </div>
        </div>
      );
    }
    if (rolls.length <= 4) {
      return (
        <div className='roll-multiple roll-message'>
          <p className='roll-type'>
            {rolls.length}d{diceType}
          </p>
          <div className='roll-map'>
            <div className='rolls'>
              {rolls.map((roll) => (
                <p
                  className={'roll d' + diceType}
                  style={this.getRollImage(diceType, true)}
                >
                  {roll}
                </p>
              ))}
            </div>
            <p className='modifier'>
              {modifier >= 0 ? '+' : '-'}
              {Math.abs(modifier)}
            </p>
            <p className='result'>{result}</p>
          </div>
        </div>
      );
    }
    if (rolls.length > 4) {
      return (
        <div className='roll-lot roll-message'>
          <p className='roll-type'>
            {rolls.length}d{diceType}
          </p>
          <div className='roll-map'>
            <Tooltip content={this.renderRollList(rolls)}>
              <p className='roll-total' style={this.getRollImage(diceType)}>
                {result}
              </p>
            </Tooltip>
            <p className='modifier'>
              {modifier >= 0 ? '+' : '-'}
              {Math.abs(modifier)}
            </p>
            <p className='result'>{result}</p>
          </div>
        </div>
      );
    }
  }

  renderRollList(rolls: number[]) {
    return (
      <div>
        {/* rolls.map((roll) => (
          <p
            className={
              (roll == 20 ? 'nat-20' : '') + ' ' + (roll == 1 ? 'nat-1' : '')
            }
          >
            {roll}
          </p>
        )) */}
        <p>{rolls.join('+')}</p>
      </div>
    );
  }

  getRollImage(diceType: number, single?: boolean): CSS.Properties {
    let result: CSS.Properties = {
      backgroundImage:
        'url(' +
        UI.get('dice/d' + diceType + (single ? '_single' : '_lot')) +
        ')'
    };
    return result;
  }
}

/*
<div id="game-log-roll-singular-template">
  	<div class="roll-singular">
  	  	<p class="roll-type">1d20</p>
  	  	<div>
  	  	  	<p class="roll">1</p>
  	  	  	<p class="modifier">+0</p>
  	  	  	<p class="result">1</p>
  	  	</div>
  	</div>
</div>
<div id="game-log-roll-multiple-template">
  <div class="roll-multiple">
    <p class="roll-type">4d20</p>
    <div>
      <div class="rolls">
      	<p class="roll">1</p>
      	<p class="roll">1</p>
      	<p class="roll">1</p>
      	<p class="roll">1</p>
      </div>
      <p class="modifier">+0</p>
      <p class="result">4</p>
    </div>
  </div>
</div>
<div id="game-log-roll-lot-template">
  <div class="roll-lot">
	  <p class="roll-type">8d20</p>
	  <div>
	  	<p class="roll-total">8</p>
	  	<p class="modifier">+0</p>
	  	<p class="result">8</p>
	  </div>
	</div>
</div>
*/

/*
  .roll-multiple,
  .roll-singular,
  .roll-lot {
    padding: 6px;
    margin: 6px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    border: solid $borderColour 1px;

    p {
      font-family: 'JetBrains Mono';
      font-weight: bold;
    }

    .roll,
    .roll-total {
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    .result {
      border: solid $textColour 1px;
    }

    .nat-20 {
      color: greenyellow;
    }
    .nat-1 {
      color: red;
    }
*/

export default RollMessage;
