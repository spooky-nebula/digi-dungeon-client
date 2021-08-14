import EventEmitter from 'events';
import * as ddapi from 'digi-dungeon-api';

import { Socket } from 'socket.io-client';
import Communications from '../communications';

interface PartyKeeperEvents {
  'party-add': (newPartyMember: ddapi.Party.default) => void;
  'party-remove': (oldPartyMember: ddapi.Party.default) => void;
  'party-resync': (newPartyList: ddapi.Party.default[]) => void;
}

declare interface PartyKeeper {
  on<T extends keyof PartyKeeperEvents>(
    event: T,
    listener: PartyKeeperEvents[T]
  ): this;

  once<T extends keyof PartyKeeperEvents>(
    event: T,
    listener: PartyKeeperEvents[T]
  ): this;

  emit<T extends keyof PartyKeeperEvents>(
    event: T,
    ...args: Parameters<PartyKeeperEvents[T]>
  ): boolean;
}

class PartyKeeper extends EventEmitter {
  partyList: ddapi.Party.default[];

  constructor() {
    super();
    this.partyList = [];
  }

  init(socket: Socket, partyMembers?: ddapi.Party.default[]): boolean {
    console.log('[Party Keeper] Initializing');

    if (!socket.connected) {
      console.log('[Party Keeper] Socket connection failed');

      return false;
    }

    this.partyList = partyMembers;
    this.emit('party-resync', partyMembers);

    console.log('[Party Keeper]', 'Initialization Done');
    console.log(
      '[Party Keeper]',
      'Synced',
      partyMembers.length,
      'Party Members'
    );

    return true;
  }

  reset(socket: Socket) {}
}

export default PartyKeeper;
