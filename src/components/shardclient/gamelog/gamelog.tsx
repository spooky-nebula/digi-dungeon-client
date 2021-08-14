import React, { Component } from 'react';
import * as CSS from 'csstype';
import * as ddapi from 'digi-dungeon-api';

import MessageList from './messagelist';
import MessageBox from './messagebox';
import HideButton from '../../common/hidebutton';

import Colours from '../../common/colours';

interface GameLogProps {}

interface GameLogState {
  hidden: boolean;
}

class GameLog extends Component<GameLogProps, GameLogState> {
  constructor(props: any) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    hidden: false as boolean
  };

  toggle() {
    this.setState({ hidden: !this.state.hidden });
  }

  render() {
    let style = GameLogStyles;
    if (this.state.hidden) {
      style = GameLogHiddenStyles;
    }
    return (
      <div className='dd-gamelog' style={style}>
        <HideButton
          iconPath={'icon/single_dice_small'}
          onClickHandler={this.toggle}
          offsetX='-32px'
          offsetY='20px'
        ></HideButton>
        <MessageList></MessageList>
        <MessageBox></MessageBox>
      </div>
    );
  }
}

const GameLogStyles: CSS.Properties = {
  transform: 'translateX(0%)'
};

const GameLogHiddenStyles: CSS.Properties = {
  ...GameLogStyles,
  ...{
    transform: 'translateX(100%)'
  }
};

export default GameLog;
