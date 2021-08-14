import {
  Button,
  ButtonGroup,
  Dialog,
  Text,
  Overlay,
  ControlGroup,
  HTMLSelect
} from '@blueprintjs/core';
import React, { Component } from 'react';

import Communications from '../../core/communications';
import { AppToaster } from '../../core/overlay';

interface LoginMenuProps {}

interface LoginMenuState {
  showLogin: boolean;
  showMenu: boolean;
  hostname: string;
  protocol: string;
  port: string;
  //shardId: string;
  //shardPass: string;
  username: string;
  password: string;
}

class LoginMenu extends Component<LoginMenuProps, LoginMenuState> {
  constructor(props: LoginMenuProps) {
    super(props);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleHostnameChange = this.handleHostnameChange.bind(this);
    this.handlePortChange = this.handlePortChange.bind(this);
    //this.handleShardIdChange = this.handleShardIdChange.bind(this);
    //this.handleShardPassChange = this.handleShardPassChange.bind(this);

    this.handleLoginButton = this.handleLoginButton.bind(this);

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);

    this.updateHostname = this.updateHostname.bind(this);

    this.setUpListeners = this.setUpListeners.bind(this);
    this.setUpListeners();
  }

  state = {
    showLogin: true,
    showMenu: true,
    hostname: 'localhost',
    port: '8080',
    protocol: 'http://',
    //shardId: '',
    //shardPass: '',
    username: '',
    password: ''
  };

  checkBiscuits() {
    this.state.showMenu =
      Communications.biscuits.auth.loggedIn == 'false' || true;
  }

  setUpListeners() {
    Communications.authentication.on('login', (data) => {
      if (data.success) {
        this.setState({
          showMenu: false
        });
      } else {
        AppToaster.show({
          message: data.token,
          intent: 'warning'
        });
      }
    });

    Communications.authentication.on('register', (data) => {
      if (data.success) {
        this.setState({
          showLogin: true
        });
      } else {
        AppToaster.show({
          message: data.token,
          intent: 'warning'
        });
      }
    });

    Communications.authentication.on('logout', (data) => {
      if (data.success) {
        this.setState({
          showMenu: true,
          showLogin: true
        });
      } else {
        AppToaster.show({
          message: data.token,
          intent: 'warning'
        });
      }
    });
  }

  private handleUsernameChange(value: string) {
    this.setState({ username: value });
  }

  private handlePasswordChange(value: string) {
    this.setState({ password: value });
  }

  private handleHostnameChange(value: string) {
    this.setState({ hostname: value });
  }

  private handlePortChange(value: string) {
    this.setState({ port: value });
  }

  //private handleShardIdChange(value: string) {
  //  this.setState({ shardId: value });
  //}
  //private handleShardPassChange(value: string) {
  //  this.setState({ shardPass: value });
  //}
  private handleProtocolChange(value: string) {
    this.setState({ protocol: value });
  }

  private handleLoginButton() {
    if (this.state.username.trim() == '') {
      return false;
    }
    if (this.state.password.trim() == '') {
      return false;
    }
    if (this.state.hostname.trim() == '') {
      return false;
    }
    if (this.state.port.trim() == '') {
      return false;
    }
    //if (this.state.shardId.trim() == '') {
    //  return false;
    //}
    if (this.state.showLogin) {
      this.login();
    } else {
      this.register();
    }
  }

  updateHostname() {
    Communications.communicationData.socket.protocol = this.state.protocol;
    Communications.communicationData.uri.hostname = this.state.hostname;
    Communications.communicationData.uri.port = this.state.port;
    //Communications.communicationData.shard.id = this.state.shardId;
  }

  login() {
    this.updateHostname();
    Communications.authentication.login(
      this.state.username,
      this.state.password
    );
  }

  register() {
    this.updateHostname();
    Communications.authentication.register(
      this.state.username,
      this.state.password
    );
  }

  render() {
    return (
      <Dialog
        className='dd-login-menu bp4-dark'
        isOpen={this.state.showMenu}
        title='User Login'
        usePortal={true}
        autoFocus={true}
        enforceFocus={true}
        hasBackdrop={true}
      >
        <ControlGroup vertical>
          <input
            type='text'
            className='bp4-input'
            placeholder='Username'
            value={this.state.username}
            onChange={(e) => {
              this.handleUsernameChange(e.target.value);
            }}
          />
          <input
            type='password'
            className='bp4-input'
            placeholder='Password'
            value={this.state.password}
            onChange={(e) => {
              this.handlePasswordChange(e.target.value);
            }}
          />
          <ControlGroup fill>
            <HTMLSelect
              options={['http://', 'https://', 'ws://', 'wss://']}
              value={this.state.protocol}
              onChange={(e) => {
                this.handleProtocolChange(e.target.value);
              }}
            ></HTMLSelect>
            <input
              type='text'
              className='bp4-input'
              placeholder='Hostname / IP'
              value={this.state.hostname}
              onChange={(e) => {
                this.handleHostnameChange(e.target.value);
              }}
            />
            <input
              type='text'
              className='bp4-input'
              placeholder='Port'
              value={this.state.port}
              onChange={(e) => {
                this.handlePortChange(e.target.value);
              }}
            />
          </ControlGroup>
          {/* <ControlGroup fill>
            <input
              type='password'
              className='bp4-input'
              placeholder='ShardID'
              value={this.state.shardId}
              onChange={(e) => {
                this.handleShardIdChange(e.target.value);
              }}
            />
            <input
              type='text'
              className='bp4-input'
              placeholder='Shard Password (not available yet)'
              value={this.state.shardPass}
              onChange={(e) => {
                this.handleShardPassChange(e.target.value);
              }}
              disabled
            />
          </ControlGroup> */}
          <ControlGroup fill>
            <Button
              intent='warning'
              onClick={() => {
                this.setState({ showLogin: !this.state.showLogin });
              }}
              icon='import'
            >
              {this.state.showLogin ? 'Not Registered?' : 'Already Registered?'}
            </Button>
            <Button
              intent={this.state.showLogin ? 'primary' : 'danger'}
              onClick={() => this.handleLoginButton()}
              icon='log-in'
            >
              {this.state.showLogin ? 'Login' : 'Register'}
            </Button>
          </ControlGroup>
        </ControlGroup>
      </Dialog>
    );
  }
}

export default LoginMenu;
