import React, { Component } from 'react';
import * as CSS from 'csstype';
import Colours from './colours';

import { Button } from '@blueprintjs/core';
import UI from '../../assets/ui';

interface HideButtonProp {
  iconPath: string;
  onClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  offsetX: string;
  offsetY: string;
}

class HideButton extends Component<HideButtonProp> {
  render() {
    const { iconPath, onClickHandler, offsetX, offsetY } = this.props;
    return (
      <Button
        style={buttonStyles(iconPath, offsetX, offsetY)}
        onClick={onClickHandler}
      >
        <img
          src={UI.get(iconPath).toString()}
          width='20px'
          height='20px'
          className='bp4-icon'
        ></img>
      </Button>
    );
  }
}

function buttonStyles(
  imagePath: string,
  offsetX: string,
  offsetY: string
): CSS.Properties {
  return {
    height: '20px',
    width: '20px',
    borderRadius: '5px 0 0 5px',
    backgroundColor: Colours.buttonBackgroundColour,
    backgroundImage: `url(\'${imagePath}\')`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    position: 'absolute',
    left: offsetX,
    top: offsetY
  };
}

export default HideButton;
