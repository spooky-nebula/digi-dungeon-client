import React, { Component } from 'react';

import {
  ButtonGroup,
  Button,
  Popover,
  NumericInput,
  ControlGroup,
  Position,
  Tooltip,
  Classes,
  PopoverInteractionKind
} from '@blueprintjs/core';
import * as CSS from 'csstype';

import Communications from '../../../core/communications';
import * as ddapi from 'digi-dungeon-api';
import { AppToaster } from '../../../core/overlay';

import UI from '../../../assets/ui';
import { PopoverPosition } from '@blueprintjs/core/lib/esm/components/popover/popoverSharedProps';

interface RollMenuProps {}

interface RollMenuState {
  rollMenuOpen: boolean;
  selectedDie: number;
  dieQuantity: number;
  modifier: number;
}

class RollMenu extends Component<RollMenuProps, RollMenuState> {
  constructor(props: any) {
    super(props);

    this.rollButtonClickHandler = this.rollButtonClickHandler.bind(this);
    this.selectDie = this.selectDie.bind(this);
    this.renderOptions = this.renderOptions.bind(this);

    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleModifierChange = this.handleModifierChange.bind(this);

    this.sendDiceRoll = this.sendDiceRoll.bind(this);
  }

  state = {
    rollMenuOpen: false,
    selectedDie: 20,
    dieQuantity: 1,
    modifier: 0
  };

  //#region Roll Button Handler
  rollButtonClickHandler(
    nextOpenState: boolean,
    e?: React.SyntheticEvent<HTMLElement, Event>
  ) {
    this.setState({
      rollMenuOpen: nextOpenState
    });
  }
  selectDie(diceNumber: number) {
    this.setState({
      selectedDie: diceNumber
    });
  }
  //#endregion
  render() {
    return (
      <Popover
        content={this.renderOptions()}
        isOpen={this.state.rollMenuOpen}
        onInteraction={this.rollButtonClickHandler}
        position={Position.RIGHT_BOTTOM}
        interactionKind={PopoverInteractionKind.HOVER}
      >
        <Button intent='warning' /* text='Roll' */>
          <img
            src={UI.get('icon/single_dice_small').toString()}
            width='20px'
            height='20px'
            className='bp4-icon'
          ></img>
        </Button>
      </Popover>
    );
  }

  //#region Roll Menu Handlers
  availableDie = [4, 6, 8, 10, 12, 20, 100];

  private handleQuantityChange(_v: number, value: string) {
    let v: number = parseInt(value);
    if (v == NaN || value == '' || value == '-') {
      v = 1;
    }
    if (v > 69) {
      v = 69;
    }
    if (v < 1) {
      v = 1;
    }
    this.setState({ dieQuantity: v });
  }

  private handleModifierChange(_v: number, value: string) {
    this.setState({ modifier: parseInt(value) });
  }

  sendDiceRoll() {
    let diceRequestEvent = new ddapi.Event.DiceRollRequestEvent(
      Communications.socket.id
    );
    diceRequestEvent.roll.dieQuantity = this.state.dieQuantity;
    diceRequestEvent.roll.dieType = this.state.selectedDie;
    diceRequestEvent.roll.modifier = this.state.modifier;

    Communications.emitBoardEvent(
      diceRequestEvent,
      'dd.event.DiceRollRequestEvent'
    );

    //Communications.socket.once('board-event-sent', () => {
    //  AppToaster.show({ message: 'Rolled' });
    //});
  }
  //#endregion

  renderOptions() {
    return (
      <div>
        <ControlGroup>
          <ButtonGroup>
            {this.availableDie.map((dice, index) => (
              <Tooltip content={'d' + dice} position={PopoverPosition.TOP}>
                <Button
                  intent={dice == this.state.selectedDie ? 'success' : 'none'}
                  //text={'d' + dice}
                  onClick={() => this.selectDie(dice)}
                >
                  <img
                    src={UI.get('icon/d' + dice + '_single').toString()}
                    width='20px'
                    height='20px'
                    className='bp4-icon'
                  ></img>
                </Button>
              </Tooltip>
            ))}
          </ButtonGroup>
          <Tooltip content='Die Quantity' position={PopoverPosition.TOP}>
            <NumericInput
              style={numericInputStyles}
              value={this.state.dieQuantity}
              onValueChange={this.handleQuantityChange}
              placeholder='Quantity'
              min={1}
              max={69}
            ></NumericInput>
          </Tooltip>
          <Tooltip content='Die Modifier' position={PopoverPosition.TOP}>
            <NumericInput
              style={numericInputStyles}
              value={this.state.modifier}
              onValueChange={this.handleModifierChange}
              placeholder='Modifier'
            ></NumericInput>
          </Tooltip>
          <Button
            text='Send Roll'
            intent='primary'
            onClick={() => {
              this.sendDiceRoll();
            }}
          ></Button>
        </ControlGroup>
      </div>
    );
  }
}

const numericInputStyles: CSS.Properties = {
  width: '50px'
};

export default RollMenu;
