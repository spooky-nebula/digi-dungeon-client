import * as THREE from 'three';
import * as ddapi from 'digi-dungeon-api';

class MapGeometry {
  constructor(mapGrid: ddapi.Map.Board) {}
}

function constructGeometry(mapGrid: ddapi.Map.Board) {
  var geometry = new THREE.BufferGeometry();
  // TODO: CONSTRUCT MAP GEOMETRY HERE
  // I can think of what I need to do into a list here
  // 1. Build hexagons for the grid in `Board.grid`
  // 2. Build models and textures for each ObjectEntity in `Board.objectList`
  // 3. ...
  // 4. PROFIT?????!?????
}

export { constructGeometry };
