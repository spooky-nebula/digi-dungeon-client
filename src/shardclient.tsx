import { HotkeyConfig, useHotkeys } from '@blueprintjs/core';
import { HotkeysProvider } from '@blueprintjs/core';
import React, { Component, FunctionComponent, useMemo, useState } from 'react';
import DebugHell from './components/debug/debughell';
import GameLog from './components/shardclient/gamelog/gamelog';
import PartyList from './components/shardclient/partylist/partylist';
import Renderer from './components/shardclient/world/renderer';
import ShardMenu from './components/authentication/shardmenu';

interface ShardClientState {
  open: {
    history: boolean;
  };
  display: 'menu' | 'client';
}

const ShardClient: FunctionComponent = () => {
  // WARNING: SOMETHING IS WRONG HERE
  // I DON'T KNOW WHY BUT SOMETIMES YOU HAVE TO PRESS THE HOTKEY TWICE
  // I DON'T KNOW WHY I WROTE THIS IN SHOUTY CAPS
  const [state, setState] = useState<ShardClientState>({
    open: { history: false },
    display: 'menu'
  });

  const hotkeys = useMemo<HotkeyConfig[]>(
    () => [
      {
        combo: 'cmd+]',
        global: true,
        label: 'Toggle History Window',
        onKeyDown: (e: KeyboardEvent) => {
          e.preventDefault();
          state.open.history = !state.open.history;
          setState({
            ...state,
            open: { history: !state.open.history }
          });
        }
      }
    ],
    []
  );

  const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);

  const handleClose = {
    history: () => {
      setState({
        ...state,
        display: state.display
      });
    }
  };

  const handleConnect = () => {
    setState({
      ...state,
      display: 'client'
    });
  };

  switch (state.display) {
    case 'menu':
      return (
        //<div className='dd-client'>
        <ShardMenu handleConnection={handleConnect}></ShardMenu>
        //</div>
      );
    case 'client':
      return (
        <HotkeysProvider>
          <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
            <PartyList></PartyList>
            <GameLog></GameLog>
            <DebugHell
              handleClose={{ history: handleClose.history }}
              open={{ history: state.open.history }}
            ></DebugHell>
            <Renderer></Renderer>
          </div>
        </HotkeysProvider>
      );
  }
};

export default ShardClient;
