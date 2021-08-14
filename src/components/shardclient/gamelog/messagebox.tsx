import React, { Component } from 'react';
import * as CSS from 'csstype';

import {
  Classes,
  InputGroup,
  ButtonGroup,
  Button,
  TextArea
} from '@blueprintjs/core';

import Communications from '../../../core/communications';

import * as ddapi from 'digi-dungeon-api';
import RollMenu from './rollmenu';

interface MessageBoxProps {}

interface MessageBoxState {
  text: string;
}

class MessageBox extends Component<MessageBoxProps, MessageBoxState> {
  constructor(props: MessageBoxProps) {
    super(props);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

    this.sendButtonClickHandler = this.sendButtonClickHandler.bind(this);

    this.clear = this.clear.bind(this);

    this.sendMessage = this.sendMessage.bind(this);
  }

  state = {
    text: '',
    rollMenuHidden: true
  };

  //#region Message Handler
  keyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key.toString() == 'Enter') {
      e.preventDefault();
      //this.state.text;

      this.sendMessage(this.state.text);
    }
  }

  clear() {
    this.setState({
      text: ''
    });
  }

  sendButtonClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    this.sendMessage(this.state.text);
  }

  changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      text: e.target.value
    });
  }

  sendMessage(text: string) {
    if (text.trim() == '') {
      return;
    }
    let event = new ddapi.Event.ChatMessageEvent(Communications.socket.id);
    event.text = text;

    Communications.socket.emit('board-event', event);

    Communications.socket.once('board-event-sent', () => {
      this.clear();
    });
  }
  //#endregion

  render() {
    return (
      <div className='dd-message-box'>
        <ButtonGroup>
          <input
            className={Classes.INPUT + ' ' + Classes.FILL}
            value={this.state.text}
            onChange={this.changeHandler}
            onKeyPress={this.keyPressHandler}
          ></input>
          <Button
            icon='send-message'
            onClick={this.sendButtonClickHandler}
            intent='primary'
            //text='Send'
          ></Button>
          <RollMenu></RollMenu>
        </ButtonGroup>
      </div>
    );
  }
}

const MessageBoxStyles: CSS.Properties = {
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default MessageBox;
