import React, { Component } from 'react';
import * as ddapi from 'digi-dungeon-api';
import Communications from '../../core/communications';
import PartyMember from './partymember';

interface PartyListProps {}

interface PartyListState {
  partyMembers: ddapi.Party.default[];
}

class PartyList extends Component<PartyListProps, PartyListState> {
  constructor(props: PartyListProps) {
    super(props);

    Communications.partyKeeper.on('party-resync', (newPartyList) => {
      this.setState({
        partyMembers: newPartyList
      });
    });
  }

  state = {
    partyMembers: [] as ddapi.Party.default[]
  };

  render() {
    return (
      <div className='dd-party-list'>
        {this.state.partyMembers.map((partyMember) => {
          return <PartyMember sender={partyMember.userID}></PartyMember>;
        })}
      </div>
    );
  }
}

export default PartyList;
