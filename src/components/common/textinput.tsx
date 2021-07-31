import React, { Component } from 'react';
import * as CSS from 'csstype';
import Colours from './colours';

interface TextInputProps {
  onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyboardHandler?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string | '';
}

interface TextInputState {
  text: string;
}

class TextInput extends Component<TextInputProps, TextInputState> {
  constructor(props: TextInputProps) {
    super(props);
    this.updateTextField = this.updateTextField.bind(this);
    this.clear = this.clear.bind(this);
  }

  state = {
    text: ''
  };

  clear() {
    this.setState({
      text: ''
    });
  }

  updateTextField(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      text: e.target.value
    });
    const { onChangeHandler } = this.props;
    if (onChangeHandler) onChangeHandler(e);
  }

  render() {
    const { onChangeHandler, onKeyboardHandler, placeholder } = this.props;
    return (
      <input
        type='text'
        style={inputStyles}
        onChange={this.updateTextField}
        onKeyPress={onKeyboardHandler}
        placeholder={placeholder}
        value={this.state.text}
      />
    );
  }
}

const inputStyles: CSS.Properties = {
  height: '24px',
  backgroundColor: Colours.backgroundColour,
  color: Colours.textColour,
  border: 'none',
  borderBottom: `solid 1px ${Colours.textLogColour}`
};

export default TextInput;
