import React, { Component } from 'react';
import * as CSS from 'csstype';

import { Text, Tooltip } from '@blueprintjs/core';

import UI from '../../../assets/ui/index';
import Communications from '../../../core/communications';
import Username from '../../common/username';

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
    loading: true,
    borderColor: ''
  };

  render() {
    const { sender } = this.props;
    const { loading } = this.state;
    return (
      <div className={'dd-roll-message ' + (loading && 'bp4-skeleton')}>
        <Username userId={sender}></Username>
        {this.renderRoll()}
      </div>
    );
  }

  renderRoll() {
    const { rolls } = this.props;
    if (rolls.length == 1) {
      return this.renderSingle();
    }
    if (rolls.length <= 4) {
      return this.renderMany();
    }
    if (rolls.length > 4) {
      return this.renderLots();
    }
  }

  renderSingle() {
    const { result, rolls, modifier, diceType } = this.props;
    const { borderColor, loading } = this.state;
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

  renderMany() {
    const { result, rolls, modifier, diceType } = this.props;
    const { borderColor, loading } = this.state;
    return (
      <div
        className='roll-multiple roll-message'
        style={{ borderColor: borderColor }}
      >
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

  renderLots() {
    const { result, rolls, modifier, diceType } = this.props;
    const { borderColor, loading } = this.state;
    return (
      <div
        className='roll-lot roll-message'
        style={{ borderColor: borderColor }}
      >
        <p className='roll-type'>
          {rolls.length}d{diceType}
        </p>
        <div className='roll-map'>
          <Tooltip content={this.renderRollList(rolls)}>
            <p className='roll-total' style={this.getRollImage(diceType)}>
              {rolls.reduce((a: number, b: number) => a + b)}
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

export default RollMessage;
