import EventEmitter from 'events';
import * as ddapi from 'digi-dungeon-api';

import { Socket } from 'socket.io-client';
import Communications from '../communications';

interface MapKeeperEvents {
  'map-resync': (newMap: ddapi.Map.Board) => void;
}

declare interface MapKeeper {
  on<T extends keyof MapKeeperEvents>(
    event: T,
    listener: MapKeeperEvents[T]
  ): this;

  once<T extends keyof MapKeeperEvents>(
    event: T,
    listener: MapKeeperEvents[T]
  ): this;

  emit<T extends keyof MapKeeperEvents>(
    event: T,
    ...args: Parameters<MapKeeperEvents[T]>
  ): boolean;
}

class MapKeeper extends EventEmitter {
  mapData: ddapi.Map.Board;

  constructor() {
    super();
    this.mapData = new ddapi.Map.Board()
  }

  init(socket: Socket, mapData?: ddapi.Map.Board): boolean {
    console.log('[Map Keeper] Initializing');

    if (!socket.connected) {
      console.log('[Map Keeper] Socket connection failed');

      return false;
    }

    this.mapData = mapData;
    this.emit('map-resync', mapData);

    console.log('[Map Keeper]', 'Initialization Done');
    console.log(
      '[Map Keeper]',
      'Synced',
      mapData
    );

    return true;
  }

  reset(socket: Socket) {}
}

export default MapKeeper;
