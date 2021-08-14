import {
  Button,
  ButtonGroup,
  Dialog,
  Text,
  Overlay,
  ControlGroup,
  HTMLSelect
} from '@blueprintjs/core';
import { Vector2 } from 'digi-dungeon-api/dist/util/structs';
import React, { Component, useRef } from 'react';
import ReactDOM from 'react-dom';

import Input from '../../core/input';

interface DraggableProps {
  // Initial Position
  position?: Vector2;
  isOpen?: boolean;
  windowTitle?: string;
  // Delete component on close
  removeOnClose?: boolean;
  closeHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

interface DraggableState {
  position: Vector2;
  dragging: boolean;
  offset: Vector2;
}

class Draggable extends Component<DraggableProps, DraggableState> {
  //buttonElement: React.MutableRefObject<typeof Button>;

  constructor(props: DraggableProps) {
    super(props);

    this.init();
    //this.buttonElement = useRef<typeof Button>();

    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  init() {
    this.state = {
      position: this.props.position || { x: 0, y: 0 },
      dragging: false,
      offset: { x: 0, y: 0 }
    };
  }

  handleDrag(e?: React.MouseEvent) {
    if (this.state.dragging) {
      this.setState({
        position: {
          x: Input.mousePos.x - this.state.offset.x,
          y: Input.mousePos.y - this.state.offset.y
        }
      });
    }
    if (e) {
      e.preventDefault();
    }
  }

  handleDragStart(e: React.MouseEvent) {
    let element = (
      ReactDOM.findDOMNode(this) as Element
    ).getBoundingClientRect();
    let elementPos = {
      x: element.left,
      y: element.top
    };

    this.setState({
      dragging: true,
      offset: {
        x: Input.mousePos.x - elementPos.x,
        y: Input.mousePos.y - elementPos.y
      }
    });

    e.preventDefault();
  }

  handleDragEnd(e: React.MouseEvent) {
    this.setState({ dragging: false });
    e.preventDefault();
  }

  handleClose(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (this.props.removeOnClose) {
      let element = ReactDOM.findDOMNode(this) as Element;
      element.remove();
    }
    e.preventDefault();
  }

  render() {
    let { isOpen, closeHandler, windowTitle } = this.props;
    return (
      <div
        onMouseMove={this.handleDrag}
        className='dd-draggable-window'
        style={{
          display: isOpen ? 'block' : 'none',
          left: this.state.position.x + 'px',
          top: this.state.position.y + 'px'
        }}
      >
        <ControlGroup className='dd-window-titlebar'>
          <p className='dd-window-title'>{windowTitle}</p>
          <Button
            //ref={this.buttonElement}
            onMouseDown={this.handleDragStart}
            onMouseUp={this.handleDragEnd}
            icon='move'
            intent={this.state.dragging ? 'success' : 'none'}
            fill
          ></Button>
          <Button
            onClick={closeHandler || this.handleClose}
            icon='delete'
          ></Button>
        </ControlGroup>

        {this.props.children}
      </div>
    );
  }
}

export default Draggable;
