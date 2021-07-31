import EventEmitter from 'events';
import * as ddapi from 'digi-dungeon-api';

import { Socket } from 'socket.io-client';
import Communications from '../communications';

interface EventKeeperEvents {
  'force-reset': () => void;
  'chat-text': (eventData: ddapi.Event.ChatMessageEvent) => void;
  'roll-dice': (eventData: ddapi.Event.DiceRollEvent) => void;
  'drawing-add': (eventData: ddapi.Event.DrawingAddEvent) => void;
  'drawing-clear': (eventData: ddapi.Event.DrawingClearEvent) => void;
  'drawing-undo': (eventData: ddapi.Event.DrawingUndoEvent) => void;
  'entity-move': (eventData: ddapi.Event.EntityMoveEvent) => void;
  'entity-create': (eventData: ddapi.Event.EntityCreateEvent) => void;
  'entity-remove': (eventData: ddapi.Event.EntityRemoveEvent) => void;
  'entity-grant-premission': (
    eventData: ddapi.Event.EntityGrantPermissionEvent
  ) => void;
  'grant-premission': (eventData: ddapi.Event.GrantPermissionEvent) => void;
}

declare interface EventKeeper {
  on<T extends keyof EventKeeperEvents>(
    event: T,
    listener: EventKeeperEvents[T]
  ): this;

  once<T extends keyof EventKeeperEvents>(
    event: T,
    listener: EventKeeperEvents[T]
  ): this;

  emit<T extends keyof EventKeeperEvents>(
    event: T,
    ...args: Parameters<EventKeeperEvents[T]>
  ): boolean;
}

class EventKeeper extends EventEmitter {
  recordedEvents: ddapi.Event.default[];

  constructor() {
    super();
    this.recordedEvents = [];
  }
  // Should be called after Communications connect is successful
  init(socket: Socket, pastEvents?: ddapi.Event.default[]): boolean {
    console.log('[Event Keeper] Initializing');

    if (!socket.connected) {
      console.log('[Event Keeper] Socket connection failed');

      return false;
    }

    if (pastEvents != this.recordedEvents) {
      // Reset listeners
      this.emit('force-reset');
      // Preload newest events
      this.preloadEvents(pastEvents);
    }

    socket.on('board-event', (eventData: ddapi.Event.default) => {
      this.decideAndEmit(eventData);
      this.recordedEvents.push(eventData);
    });

    console.log('[Event Keeper] Initialization Done');

    return true;
  }

  reset(socket: Socket) {
    socket.off('board-event');
  }

  private preloadEvents(pastEvents: ddapi.Event.default[]) {
    for (let i = 0; i < pastEvents.length; i++) {
      const eventData = pastEvents[i];
      this.decideAndEmit(eventData);
    }
  }

  private decideAndEmit(eventData: ddapi.Event.default) {
    console.log(
      '[Event Keeper] Event (',
      eventData.name,
      ') Recieved Transcieving'
    );
    //console.log(eventData);
    // This doesn't work in TypeScript, have to use Switch
    //this.emit(eventData.name, eventData);
    switch (eventData.name) {
      case 'chat-text':
        let chatEvent = new ddapi.Event.ChatMessageEvent(eventData.sender);
        this.emit('chat-text', Object.assign(chatEvent, eventData));
        break;
      case 'roll-dice':
        let diceEvent = new ddapi.Event.DiceRollEvent(eventData.sender);
        this.emit('roll-dice', Object.assign(diceEvent, eventData));
        break;

      default:
        break;
    }
  }
}

export default EventKeeper;

/*
export declare interface EventKeeper {
  on(
    event: 'chat-text',
    listener: (eventData: ddapi.Event.ChatMessageEvent) => void
  ): this;
  on(
    event: 'roll-dice',
    listener: (eventData: ddapi.Event.DiceRollEvent) => void
  ): this;
  on(
    event: 'drawing-add',
    listener: (eventData: ddapi.Event.DrawingAddEvent) => void
  ): this;
  on(
    event: 'drawing-clear',
    listener: (eventData: ddapi.Event.DrawingClearEvent) => void
  ): this;
  on(
    event: 'drawing-undo',
    listener: (eventData: ddapi.Event.DrawingUndoEvent) => void
  ): this;
  on(
    event: 'entity-move',
    listener: (eventData: ddapi.Event.EntityMoveEvent) => void
  ): this;
  on(
    event: 'entity-create',
    listener: (eventData: ddapi.Event.EntityCreateEvent) => void
  ): this;
  on(
    event: 'entity-remove',
    listener: (eventData: ddapi.Event.EntityRemoveEvent) => void
  ): this;
  on(
    event: 'entity-grant-premission',
    listener: (eventData: ddapi.Event.EntityGrantPremissionEvent) => void
  ): this;
  on(
    event: 'grant-premission',
    listener: (eventData: ddapi.Event.GrantPremissionEvent) => void
  ): this;
  on(event: string, listener: Function): this;
}

export class EventKeeper extends EventEmitter {
  // Should be called after Communications connect is successful
  init(): boolean {
    if (!Communications.socket.connected) {
      return false;
    }

    let on = Communications.socket.on;

    on('board-event', (eventData: ddapi.Event.default) => {
      this.emit(eventData.name, eventData);
    });
    return true;
  }
}
*/
