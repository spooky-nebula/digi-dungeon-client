import React, { Component } from 'react';
import * as CSS from 'csstype';

interface ImageButtonProps {
  imagePath: string;
  onClickHandler?: React.MouseEventHandler<HTMLAnchorElement>;
}

class ImageButton extends Component<ImageButtonProps> {
  render() {
    const { imagePath, onClickHandler } = this.props;
    return (
      <a
        href='#'
        style={ImageButtonStyles(imagePath)}
        onClick={onClickHandler}
      />
    );
  }
}

function ImageButtonStyles(imagePath: string): CSS.Properties {
  return {
    height: '24px',
    width: '24px',
    margin: '6px',
    backgroundImage: `url('${imagePath}')`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  };
}

export default ImageButton;
