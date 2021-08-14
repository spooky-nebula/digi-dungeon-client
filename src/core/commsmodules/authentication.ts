import EventEmitter from 'events';
import * as ddapi from 'digi-dungeon-api';

import { makeAuthRequest, makeRequest } from '../util';
import Communications from '../communications';
import { AppToaster } from '../overlay';

interface AuthenticationEvents {
  login: (data: ddapi.Auth.User.AuthResponse) => void;
  register: (data: ddapi.Auth.User.AuthResponse) => void;
  logout: (data: ddapi.Auth.User.AuthResponse) => void;
}

declare interface Authentication {
  on<T extends keyof AuthenticationEvents>(
    event: T,
    listener: AuthenticationEvents[T]
  ): this;

  once<T extends keyof AuthenticationEvents>(
    event: T,
    listener: AuthenticationEvents[T]
  ): this;

  emit<T extends keyof AuthenticationEvents>(
    event: T,
    ...args: Parameters<AuthenticationEvents[T]>
  ): boolean;
}

class Authentication extends EventEmitter {
  loggedIn: boolean;
  token: string;

  constructor() {
    super();
  }

  checkBiscuits() {
    this.loggedIn = Communications.biscuits.auth.loggedIn == 'true' || false;
    this.token = Communications.biscuits.auth.token || '';

    if (this.loggedIn) {
      this.emit('login', { success: this.loggedIn, token: this.token });
    }
  }

  login(username: string, password: string) {
    let data = new ddapi.Auth.User.UserLoginData(username, password);
    makeAuthRequest(data, '/login').then((response) => {
      AppToaster.show({
        message: 'Logged in',
        intent: 'success'
      });

      this.emit('login', response);
      this.loggedIn = response.success;
      this.token = response.token;

      Communications.biscuits.setAuthBiscuit(
        'loggedIn',
        this.loggedIn ? 'true' : 'false'
      );
      Communications.biscuits.setAuthBiscuit('token', this.token);
      Communications.biscuits.setShardBiscuit(
        'id',
        Communications.communicationData.shard.id
      );
      Communications.biscuits.setSocketBiscuit(
        'protocol',
        Communications.communicationData.socket.protocol
      );
      Communications.biscuits.setURIBiscuit(
        'hostname',
        Communications.communicationData.uri.hostname
      );
      Communications.biscuits.setURIBiscuit(
        'port',
        Communications.communicationData.uri.port
      );
    });
  }

  register(username: string, password: string) {
    let data = new ddapi.Auth.User.UserRegisterData(username, password);
    makeAuthRequest(data, '/register').then((response) => {
      AppToaster.show({
        message: 'Registered',
        intent: 'warning'
      });

      this.emit('register', response);
      this.loggedIn = false;
    });
  }

  logout(username: string, password: string) {
    let data = new ddapi.Auth.User.UserRegisterData(username, password);
    makeAuthRequest(data, '/logout').then((response) => {
      AppToaster.show({
        message: 'Logged out',
        intent: 'danger'
      });

      this.emit('logout', response);
      this.loggedIn = false;
    });
  }
}

export default Authentication;
