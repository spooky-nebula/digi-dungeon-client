import React, { Component } from 'react';

import Communications from '../../core/communications';
import { TempUserData } from '../../core/commsmodules/cacher';

interface UserTextProps {
  userId: string;
  children: JSX.Element | JSX.Element[] | string;
}

interface UserTextState {
  userData?: TempUserData;
  loading: boolean;
}

class UserText extends Component<UserTextProps, UserTextState> {
  constructor(props: UserTextProps) {
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
    const { children } = this.props;
    const { userData, loading } = this.state;
    return (
      <span
        className={'dd-usertext ' + (loading && 'bp4-skeleton')}
        style={{ borderColor: userData.colour }}
      >
        {children}
      </span>
    );
  }
}

export default UserText;
