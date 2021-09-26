import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as CSS from 'csstype';

import Colours from './components/common/colours';

import LoginMenu from './components/authentication/loginmenu';
import Communications from './core/communications';
import Input from './core/input';
import ShardClient from './shardclient';
import { Icon, Tab, TabId, Tabs, Tooltip } from '@blueprintjs/core';
import HomebrewClient from './homebrewclient';
import UI from './assets/ui';
import NavBar, { NavBarTab } from './components/common/navbar';
import MapEditorClient from './mapeditorclient';
// Shitstain Debug Garbage
//import Communications from './core/communications';
//
//Communications.connect('http://localhost:8080', {
//  withCredentials: true,
//  extraHeaders: {
//    'digi-dungeon-server': 'cockalicious'
//  }
//});

function render() {
  ReactDOM.render(<App></App>, document.getElementById('root'));
}

interface AppState {
  epicTimeInitiated: boolean;
  currentTab: string;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    Input.init();

    Communications.init();

    this.updateEpicTime = this.updateEpicTime.bind(this);
    this.updateEpicTime();

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  updateEpicTime() {
    Communications.authentication.on('login', (data) => {
      this.setState({ epicTimeInitiated: data.success });
    });
    Communications.authentication.on('logout', (data) => {
      this.setState({ epicTimeInitiated: data.success && false });
    });
  }

  state = {
    epicTimeInitiated: false,
    currentTab: 'shard_client'
  };

  componentDidMount() {
    Communications.start();
  }

  render() {
    return (
      <div className='bp4-dark dd-app'>
        {this.LoginMenu}
        {this.state.epicTimeInitiated &&
          this.AppContents(this.state.currentTab)}
      </div>
    );
  }

  renderShardClient = (display: boolean) => (
    <div className={'dd-client shard-client ' + (display && 'hidden')}>
      <ShardClient></ShardClient>
    </div>
  );

  renderHomebrewClient = (display: boolean) => (
    <div className={'dd-client homebrew-client ' + (display && 'hidden')}>
      <HomebrewClient></HomebrewClient>
    </div>
  );

  renderMapEditorClient = (display: boolean) => (
    <div className={'dd-client mapeditor-client ' + (display && 'hidden')}>
      <MapEditorClient></MapEditorClient>
    </div>
  );

  tabs = [
    {
      tabId: 'shard_client',
      tooltip: 'Shard Client',
      icon: UI.get('icon/single_dice_small').toString(),
      content: this.renderShardClient
    },
    {
      tabId: 'homebrew_client',
      tooltip: 'Homebrew Client',
      icon: UI.get('icon/homebrew_simple').toString(),
      content: this.renderHomebrewClient
    },
    {
      tabId: 'mapeditor_client',
      tooltip: 'Map Editor Client',
      icon: UI.get('icon/mapeditor_simple').toString(),
      content: this.renderMapEditorClient
    }
  ] as NavBarTab[];

  handleTabChange = (tabId: string) => {
    this.setState({ currentTab: tabId });
  };

  AppContents = (currentTab: string) => (
    <div className='dd-content'>
      <NavBar
        onChange={this.handleTabChange}
        tabs={this.tabs}
        initialTab={'shard_client'}
      ></NavBar>
      {this.tabs.map((tab) => {
        if (tab.tabId == currentTab) {
          return tab.content(false);
        } else {
          return tab.content(true);
        }
      })}
    </div>
  );

  LoginMenu = (
    <div>
      <LoginMenu></LoginMenu>
    </div>
  );
}

render();
