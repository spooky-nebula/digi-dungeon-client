import React, { Component } from 'react';
import * as CSS from 'csstype';

import * as ddapi from 'digi-dungeon-api';
import Communications from '../../../core/communications';

import Message from './message';
import RollMessage from './rollmessage';
import Event, {
  ChatMessageEvent,
  DiceRollEvent
} from 'digi-dungeon-api/dist/event';
import Colours from '../../common/colours';

import { Text } from '@blueprintjs/core';
import Username from '../../common/username';

interface MessageListProps {}

interface MessageListState {
  messages: (ddapi.Event.ChatMessageEvent | ddapi.Event.DiceRollEvent)[];
  scrollEnabled: boolean;
}

class MessageList extends Component<MessageListProps, MessageListState> {
  messagesEnd: any;
  constructor(props: MessageListProps) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.addRoll = this.addRoll.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

    Communications.eventKeeper.on('force-reset', () => {
      this.setState({
        messages: []
      });
    });

    Communications.eventKeeper.on('chat-text', (event: ChatMessageEvent) => {
      let textEvent: ChatMessageEvent = event;
      this.addMessage(textEvent);
    });

    Communications.eventKeeper.on('roll-dice', (event: DiceRollEvent) => {
      let rollEvent: DiceRollEvent = event;
      this.addRoll(rollEvent);
    });

    //Communications.socket.on('board-event');
  }

  state = {
    messages: [] as (
      | ddapi.Event.ChatMessageEvent
      | ddapi.Event.DiceRollEvent
    )[],
    scrollEnabled: true
  };

  addMessage(messageEvent: ddapi.Event.ChatMessageEvent) {
    this.setState((previousState) => {
      let modifiedMessagesState = previousState.messages;
      modifiedMessagesState.push(messageEvent);
      return { messages: modifiedMessagesState };
    });
  }

  addRoll(rollEvent: ddapi.Event.DiceRollEvent) {
    this.setState((previousState) => {
      let modifiedMessagesState = previousState.messages;
      modifiedMessagesState.push(rollEvent);
      return { messages: modifiedMessagesState };
    });
  }

  scrollToBottom() {
    if (!this.state.scrollEnabled) {
      return;
    }
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderMessages() {
    let events = this.state.messages;
    let mappem = events.map((event, index) => {
      if (event.name == 'chat-text') {
        let chatMessageEvent = event as ddapi.Event.ChatMessageEvent;
        return (
          <li key={index}>
            <Message
              sender={chatMessageEvent.sender}
              text={chatMessageEvent.text}
            ></Message>
          </li>
        );
      }
      if (event.name == 'roll-dice') {
        let rollEvent = event as ddapi.Event.DiceRollEvent;
        return (
          <li key={index}>
            <RollMessage
              sender={rollEvent.sender}
              result={rollEvent.roll.result}
              rolls={rollEvent.roll.rolls}
              modifier={rollEvent.roll.modifier}
              diceType={rollEvent.roll.dieType}
            ></RollMessage>
          </li>
        );
      }
    });
    return mappem;
  }

  render() {
    return (
      <ul className='dd-message-list' style={MessagesStyles}>
        {this.renderMessages()}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </ul>
    );
  }
}

const MessagesStyles: CSS.Properties = {
  flex: '1 1 0',
  left: 0,
  right: 0,
  margin: '2.5%',
  overflowY: 'scroll',
  overflowX: 'hidden'
};

export default MessageList;
