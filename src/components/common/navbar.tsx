import { Tooltip, Button } from '@blueprintjs/core';
import React, { Component } from 'react';
import Communications from '../../core/communications';

interface NavBarProps {
  onChange: (newTab: string) => void;
  tabs: NavBarTab[];
  initialTab: string;
}

interface NavBarState {
  currentTab: string;
  loggedIn: boolean;
}

interface NavBarTab {
  tabId: string;
  tooltip: string;
  icon?: string;
  text?: string;
  content: (render: boolean) => JSX.Element | JSX.Element[] | string;
}

class NavBar extends Component<NavBarProps, NavBarState> {
  constructor(props: any) {
    super(props);
  }

  state = {
    currentTab: this.props.initialTab,
    loggedIn: Communications.authentication.loggedIn
  };

  changeHandler(newTab: string) {
    this.setState({ currentTab: newTab });
    this.props.onChange(newTab);
  }

  componentDidMount(): void {
    Communications.authentication.on("login", () => {
      this.setState({ loggedIn: Communications.authentication.loggedIn });
    })
    Communications.authentication.on("logout", () => {
      this.setState({ loggedIn: Communications.authentication.loggedIn });
    })
  }

  logout(): void {
    Communications.authentication.logout(
      "",
      Communications.authentication.token
    );
  }

  render() {
    const { tabs } = this.props;
    const loggedIn = this.state.loggedIn;

    return (
      <div className='dd-tablist'>
        {tabs.map((tab) => {
          return (
            <Tooltip content={tab.tooltip} position={'bottom'}>
              <a
                href='#'
                className={
                  'dd-tab ' +
                  (this.state.currentTab == tab.tabId && 'dd-selected-tab')
                }
                onClick={() => this.changeHandler(tab.tabId)}
              >
                {tab.icon && (
                  <img
                    src={tab.icon}
                    width='20px'
                    height='20px'
                    //className='bp4-icon'
                  ></img>
                )}
                {tab.text && <p>{tab.text}</p>}
              </a>
            </Tooltip>
          );
        })}
        {
          loggedIn &&
          <Button 
            className="logout" 
            text="Logout" 
            icon="log-out" 
            type="button"
            onClick={() => this.logout()} 
          />
        }
      </div>
    );
  }
}

export default NavBar;

export { NavBar, NavBarTab };
