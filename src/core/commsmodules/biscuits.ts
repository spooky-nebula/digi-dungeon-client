import Cookies from 'js-cookie';

class Biscuits {
  public auth: AuthBiscuits;
  public comms: CommunicationBiscuits;

  constructor() {
    this.updateBiscuits();
  }

  private setBiscuit(key: string, value: string) {
    Cookies.set(key, value);
    this.updateBiscuits();
  }

  private updateBiscuits() {
    this.auth = {
      loggedIn: Cookies.get('auth/loggedIn'),
      token: Cookies.get('auth/token')
    };

    this.comms = {
      uri: {
        hostname: Cookies.get('comms/uri/hostname'),
        port: Cookies.get('comms/uri/port')
      },
      socket: {
        protocol: Cookies.get('comms/socket/protocol')
      },
      shard: {
        id: Cookies.get('comms/shard/id')
      }
    };
  }

  setAuthBiscuit(key: 'loggedIn' | 'token', value: string) {
    this.setBiscuit('auth/' + key, value);
  }

  setURIBiscuit(key: 'hostname' | 'port', value: string) {
    this.setBiscuit('comms/uri/' + key, value);
  }

  setSocketBiscuit(key: 'protocol', value: string) {
    this.setBiscuit('comms/socket/' + key, value);
  }

  setShardBiscuit(key: 'id', value: string) {
    this.setBiscuit('comms/shard/' + key, value);
  }
}

interface AuthBiscuits {
  loggedIn?: string;
  token?: string;
}

interface CommunicationBiscuits {
  uri?: {
    hostname?: string;
    port?: string;
  };
  socket?: {
    protocol?: string;
  };
  shard?: {
    id?: string;
  };
}

export default Biscuits;
