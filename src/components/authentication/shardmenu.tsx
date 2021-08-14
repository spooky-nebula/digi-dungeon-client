import { Button, ControlGroup, Dialog } from '@blueprintjs/core';
import React, { Component } from 'react';

import Communications from '../../core/communications';

interface ShardMenuProps {
  handleConnection: () => void;
}

interface ShardMenuState {
  showMenu: boolean;
  shardId: string;
  shardPass: string;
}

class ShardMenu extends Component<ShardMenuProps, ShardMenuState> {
  constructor(props: any) {
    super(props);

    this.handleShardIdChange = this.handleShardIdChange.bind(this);
    this.handleShardPassChange = this.handleShardPassChange.bind(this);

    Communications.eventKeeper.on('force-reset', () => {
      this.setState({ showMenu: false });
      this.props.handleConnection();
    });
  }

  state = {
    showMenu: true,
    shardId: '',
    shardPass: ''
  };

  checkBiscuits() {
    this.state.showMenu =
      Communications.biscuits.comms.socket.connected == 'false' || true;
  }

  private handleShardIdChange(value: string) {
    this.setState({ shardId: value });
  }
  private handleShardPassChange(value: string) {
    this.setState({ shardPass: value });
  }

  private handleLoginButton() {
    if (this.state.shardId.trim() == '') {
      return false;
    }
    //if (this.state.shardPass.trim() == '') {
    //  return false;
    //}
    this.updateHostname();
    this.login();
    return true;
  }

  updateHostname() {
    Communications.communicationData.shard.id = this.state.shardId;
  }

  login() {
    Communications.connect();
  }

  render() {
    return (
      <Dialog
        className='dd-login-menu bp4-dark'
        isOpen={this.state.showMenu}
        title='Shard Login'
        usePortal={false}
        autoFocus={true}
        enforceFocus={true}
        hasBackdrop={false}
      >
        <ControlGroup vertical>
          <ControlGroup fill>
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
          </ControlGroup>
          <ControlGroup fill>
            <Button
              intent='primary'
              onClick={() => this.handleLoginButton()}
              icon='log-in'
            >
              Connect to Shard
            </Button>
          </ControlGroup>
        </ControlGroup>
      </Dialog>
    );
  }
}

export default ShardMenu;
