import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import * as ddapi from 'digi-dungeon-api';
import { AppToaster } from './overlay';
import Authentication from './commsmodules/authentication';
import EventKeeper from './commsmodules/eventkeeper';
import PartyKeeper from './commsmodules/partykeeper';
import Cacher from './commsmodules/cacher';
import Biscuits from './commsmodules/biscuits';

class Communications {
  public static socket: Socket;
  public static eventKeeper: EventKeeper;
  public static partyKeeper: PartyKeeper;
  public static authentication: Authentication;
  public static biscuits: Biscuits;
  public static cacher: Cacher;
  public static communicationData: CommunicationData;

  static init() {
    this.biscuits = new Biscuits();

    this.communicationData = {
      uri: {
        hostname: this.biscuits.comms.uri.hostname || '',
        port: this.biscuits.comms.uri.port || ''
      },
      socket: {
        protocol: this.biscuits.comms.socket.protocol || ''
      },
      shard: {
        id: this.biscuits.comms.shard.id || ''
      }
    };

    this.eventKeeper = new EventKeeper();
    this.partyKeeper = new PartyKeeper();
    this.cacher = new Cacher();

    this.authentication = new Authentication();
    //this.authentication.on('login', (data) => {
    //  this.connect();
    //});
  }

  static start() {
    this.authentication.checkBiscuits();
  }

  static connect() {
    AppToaster.show({ message: 'Connecting to Shard', intent: 'primary' });
    let connectionString =
      this.communicationData.socket.protocol +
      this.communicationData.uri.hostname +
      ':' +
      this.communicationData.uri.port;

    this.socket = io(connectionString, {
      withCredentials: true,
      extraHeaders: {
        'digi-dungeon-server': 'cockalicious'
      }
    });

    this.socket.on('connect', () => {
      if (this.authentication.loggedIn) {
        this.socket.emit('handshake', {
          token: this.authentication.token,
          shardID: this.communicationData.shard.id
        } as ddapi.Auth.Handshake.HandshakeData);
      }
    });

    this.socket.on('handshake-ack', (syncData: ddapi.Shard.SimpleShardData) => {
      AppToaster.show({ message: 'Connected to Shard', intent: 'success' });

      this.resetKeepers(syncData);

      this.biscuits.setSocketBiscuit('connected', 'true');
    });

    this.socket.on('handshake-error', (errorMessage: string) => {
      AppToaster.show({ message: 'Error: ' + errorMessage, intent: 'danger' });
    });

    this.socket.on(
      'forced-resync',
      (resyncData: ddapi.Shard.SimpleShardData) => {
        AppToaster.show({ message: 'Server forced Resync', intent: 'primary' });

        this.resetKeepers(resyncData);
      }
    );

    this.socket.on('disconnect', () => {
      this.eventKeeper.reset(this.socket);
      AppToaster.show({
        message: 'Disconnected from Shard',
        intent: 'warning'
      });
      AppToaster.show({
        message: 'Reconnecting',
        intent: 'primary'
      });
    });
  }

  private static resetKeepers(
    shardData: ddapi.Shard.SimpleShardData | ddapi.Shard.default
  ) {
    this.eventKeeper.reset(this.socket);
    this.eventKeeper.init(this.socket, shardData.gamelog);
    this.partyKeeper.reset(this.socket);
    this.partyKeeper.init(this.socket, shardData.partyList);
  }
}

interface CommunicationData {
  uri: {
    hostname: string;
    port: string;
  };
  socket: {
    protocol: string;
  };
  shard: {
    id: string;
  };
}

export default Communications;

export { CommunicationData };
