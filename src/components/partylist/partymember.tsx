import { Text, Icon, Button, ControlGroup, Tooltip } from '@blueprintjs/core';
import React, { Component } from 'react';
import Communications from '../../core/communications';
import Username from '../common/username';

interface PartyMemberProps {
  sender: string;
}

interface PartyMemberState {}

class PartyMember extends Component<PartyMemberProps, PartyMemberState> {
  constructor(props: PartyMemberProps) {
    super(props);
  }

  render() {
    const { sender } = this.props;
    return (
      <div className={'dd-party-member'}>
        <ControlGroup fill>
          <Username userId={sender}></Username>
          <Tooltip content='Character Sheet'>
            <Button fill icon='book'></Button>
          </Tooltip>
          <Tooltip content='Event History'>
            <Button fill icon='history'></Button>
          </Tooltip>
        </ControlGroup>
        <ControlGroup>
          <Text>
            Placeholder for name and icon of token this player controls
          </Text>
        </ControlGroup>
      </div>
    );
  }
}

export default PartyMember;
