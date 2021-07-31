import React, { Component } from 'react';

import { Classes } from '@blueprintjs/core';
import Communications from '../../core/communications';
import { TempUserData } from '../../core/commsmodules/cacher';

interface UsernameProps {
  userId: string;
}

interface UsernameState {
  userData?: TempUserData;
  loading: boolean;
}

class Username extends Component<UsernameProps, UsernameState> {
  constructor(props: UsernameProps) {
    super(props);

    Communications.cacher.getUser(props.userId).then((newUserData) => {
      this.setState({ userData: newUserData, loading: false });
    });
  }

  state = {
    loading: true as boolean,
    userData: { username: 'username', userId: 'userId' } as TempUserData
  };

  render() {
    const { userData, loading } = this.state;
    return (
      <span
        className={'dd-username ' + (loading && 'bp4-skeleton')}
        style={{ backgroundColor: userData.colour }}
      >
        {userData.username}
      </span>
    );
  }
}

export default Username;
