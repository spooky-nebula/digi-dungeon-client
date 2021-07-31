import React, { Component } from 'react';
import * as CSS from 'csstype';

import { Text } from '@blueprintjs/core';

import Username from '../common/username';
import Communications from '../../core/communications';

interface MessageProps {
  sender: string;
  text: string;
}

interface MessageState {
  loading: boolean;
  sender: string;
  text: string;
}

class Message extends Component<MessageProps, MessageState> {
  constructor(props: MessageProps) {
    super(props);

    Communications.cacher.getUser(props.sender).then((userData) => {
      this.setState({
        loading: false,
        sender: userData.userId,
        text: this.props.text
      });
    });
  }

  state = {
    loading: true,
    sender: 'username',
    text: 'message'
  };

  render() {
    const { text, loading } = this.state;
    const { sender } = this.props;

    return (
      <Text className={'dd-chat-message ' + (loading && 'bp4-skeleton')}>
        <Username userId={sender}></Username>:{text}
      </Text>
    );
  }
}

export default Message;
