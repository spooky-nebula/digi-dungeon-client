import React, { Component } from 'react';
import * as ddapi from 'digi-dungeon-api';
import Communications from '../../../core/communications';
import PartyMember from './partymember';

interface PartyListProps {}

interface PartyListState {
  partyMembers: ddapi.Party.default[];
}

class PartyList extends Component<PartyListProps, PartyListState> {
  constructor(props: PartyListProps) {
    super(props);

    this.updatePartyMembers = this.updatePartyMembers.bind(this);
  }

  state = {
    partyMembers: [] as ddapi.Party.default[]
  };

  componentDidMount() {
    Communications.partyKeeper.on('party-resync', this.updatePartyMembers);
  }

  componentWillUnmount() {
    Communications.partyKeeper.removeListener(
      'party-resync',
      this.updatePartyMembers
    );
  }

  updatePartyMembers(newPartyList: ddapi.Party.default[]): void {
    this.setState({
      partyMembers: newPartyList
    });
  }

  render() {
    return (
      <div className='dd-party-list'>
        {this.state.partyMembers.map((partyMember) => {
          return <PartyMember sender={partyMember.userID}></PartyMember>;
        })}
        {this.state.partyMembers.length}
      </div>
    );
  }
}

export default PartyList;
