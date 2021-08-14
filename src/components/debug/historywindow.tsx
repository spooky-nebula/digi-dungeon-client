import React, { Component, useMemo } from 'react';
import Communications from '../../core/communications';
import { TempUserData } from '../../core/commsmodules/cacher';
import Draggable from '../common/draggable';
import {
  Button,
  Collapse,
  HTMLTable,
  Tab,
  TabId,
  Tabs
} from '@blueprintjs/core';
import { Vector2 } from 'digi-dungeon-api/dist/util/structs';
import * as ddapi from 'digi-dungeon-api';

interface DebugWindowProps {
  isOpen: boolean;
  handleClose: () => void;
}

interface DebugWindowState {
  cacherState: Map<string, TempUserData>;
  eventState: Array<ddapi.Event.default>;
  partyState: Array<ddapi.Party.default>;
  isOpen: boolean;
  currentTab: TabId;
}

class HistoryWindow extends Component<DebugWindowProps, DebugWindowState> {
  timer: NodeJS.Timeout;

  constructor(props: any) {
    super(props);

    this.updateCacher = this.updateCacher.bind(this);
    this.updateEvents = this.updateEvents.bind(this);
    this.updateParty = this.updateParty.bind(this);

    this.renderTableFromMap = this.renderTableFromMap.bind(this);
    this.renderEventTab = this.renderEventTab.bind(this);
    this.renderPartyTab = this.renderPartyTab.bind(this);
  }

  state = {
    cacherState: new Map<string, TempUserData>(),
    eventState: [] as Array<ddapi.Event.default>,
    partyState: [] as Array<ddapi.Party.default>,
    isOpen: this.props.isOpen,
    currentTab: 'debug_tabs_cacher'
  };

  updateCacher() {
    this.setState({ cacherState: Communications.cacher.tempUserData });
  }

  updateParty() {
    this.setState({ partyState: Communications.partyKeeper.partyList });
  }

  updateEvents() {
    this.setState({ eventState: Communications.eventKeeper.recordedEvents });
  }

  handleTabChange = (tabId: TabId) => this.setState({ currentTab: tabId });

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  componentDidUpdate(previousProps: DebugWindowProps) {
    if (this.props.isOpen != previousProps.isOpen) {
      this.setState({ isOpen: this.props.isOpen });
    }
  }

  render() {
    return (
      <Draggable
        closeHandler={this.props.handleClose}
        windowTitle='Debug Window'
        isOpen={this.props.isOpen}
      >
        <Tabs
          id='debug_tabs'
          className='debug_panel'
          onChange={this.handleTabChange}
          animate={false}
          selectedTabId={this.state.currentTab}
        >
          <Tab
            id='debug_tabs_cacher'
            title='Cacher'
            panel={this.renderCacherTab()}
          ></Tab>
          <Tab
            id='debug_tabs_events'
            title='Events'
            panel={this.renderEventTab()}
          ></Tab>
          <Tab
            id='debug_tabs_party'
            title='Party'
            panel={this.renderPartyTab()}
          ></Tab>
        </Tabs>
      </Draggable>
    );
  }

  renderTab(
    onClick: () => void,
    content: JSX.Element | JSX.Element[],
    tableHeaders: string[]
  ) {
    return (
      <div>
        <Button
          fill
          onClick={() => {
            onClick();
          }}
          icon='reset'
        ></Button>
        <div className='debug-table'>
          <HTMLTable bordered condensed striped>
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </HTMLTable>
        </div>
      </div>
    );
  }

  renderCacherTab() {
    return this.renderTab(
      this.updateCacher,
      this.renderTableFromMap<TempUserData>(this.state.cacherState),
      ['id', 'data']
    );
  }

  renderPartyTab() {
    return this.renderTab(
      this.updateParty,
      this.renderTableFromArray<ddapi.Party.default>(this.state.partyState),
      ['partyData']
    );
  }

  renderEventTab() {
    return this.renderTab(
      this.updateEvents,
      this.renderTableFromArray<ddapi.Event.default>(this.state.eventState),
      ['eventData']
    );
  }

  renderTableFromArray<T>(array: Array<T>): JSX.Element[] {
    let result: JSX.Element[] = [];
    array.forEach((element: T) => {
      let jsx = (
        <tr>
          <td>{JSON.stringify(element)}</td>
        </tr>
      );
      result.push(jsx);
    });

    return result;
  }

  renderTableFromMap<T>(map: Map<string, T>): JSX.Element[] {
    let result: JSX.Element[] = [];
    map.forEach((element: T, id: string) => {
      let jsx = (
        <tr>
          <td>{id}</td>
          <td>{JSON.stringify(element)}</td>
        </tr>
      );
      result.push(jsx);
    });

    return result;
  }
}

export default HistoryWindow;
