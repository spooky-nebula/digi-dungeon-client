import { Vector2 } from 'digi-dungeon-api/dist/util/structs';
import ReactDOM from 'react';

class Input {
  static mousePos: Vector2;
  private static root: HTMLElement;

  static init() {
    this.root = document.getElementById('root');

    this.mousePos = { x: 0, y: 0 };

    this.setupListeners = this.setupListeners.bind(this);
    this.setupListeners();
  }

  private static setupListeners() {
    this.root.addEventListener('mousemove', (e: MouseEvent) => {
      this.mousePos.x = e.pageX;
      this.mousePos.y = e.pageY;
    });
  }
}

export default Input;
