import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as CSS from 'csstype';

import { HotkeysProvider, Text } from '@blueprintjs/core';

import Colours from './components/common/colours';

import GameLog from './components/gamelog/gamelog';
import LoginMenu from './components/authentication/loginmenu';
import Communications from './core/communications';
import PartyList from './components/partylist/partylist';
import Draggable from './components/common/draggable';
import Input from './core/input';

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
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    Input.init();

    Communications.init();

    this.updateEpicTime = this.updateEpicTime.bind(this);
    this.updateEpicTime();
  }

  updateEpicTime() {
    Communications.authentication.on('login', (data) => {
      this.setState({ epicTimeInitiated: data.success });
    });
  }

  state = {
    epicTimeInitiated: false
  };

  componentDidMount() {
    Communications.start();
  }

  render() {
    return (
      <div style={AppStyles} className='bp4-dark'>
        {this.LoginMenu}
        {this.state.epicTimeInitiated && this.AppContents}
      </div>
    );
  }

  /* <NavBar></NavBar> */

  AppContents = (
    <HotkeysProvider>
      <div>
        <PartyList></PartyList>
        <GameLog></GameLog>
      </div>
    </HotkeysProvider>
  );

  LoginMenu = (
    <div>
      <LoginMenu></LoginMenu>
    </div>
  );
}

const AppStyles: CSS.Properties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: Colours.backgroundColour,
  color: Colours.textColour,
  overflow: 'hidden'
};

render();
