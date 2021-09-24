import * as THREE from 'three';
import * as ddapi from 'digi-dungeon-api';

class MapGeometry {
  constructor(mapGrid: ddapi.Map.Board) {
    console.log("Buttsecks")
    console.log(mapGrid)
  }
}

class MapGridCell {
  mesh: THREE.Mesh

  constructor() {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
      0.000000, 0.000000, -0.935628,
      0.810277, 0.000000, -0.467814,
      0.866025, 0.000000, -0.500000,
      0.000000, 0.000000, -1.000000,
      0.866025, -0.000000, 0.500000,
      0.000000, -0.000000, 1.000000,
      -0.866025, -0.000000, 0.500000,
      -0.866025, 0.000000, -0.500000,
      0.810277, -0.000000, 0.467814,
      0.000000, -0.000000, 0.935628,
      -0.810277, -0.000000, 0.467814,
      -0.810277, 0.000000, -0.467814
    ]);
    
    const indices = new Uint16Array([
      2, 8, 4,
      6, 11, 7,
      7, 0, 3,
      3, 1, 2,
      6, 9, 10,
      4, 9, 5,
      2, 1, 8,
      6, 10, 11,
      7, 11, 0,
      3, 0, 1,
      6, 5, 9,
      4, 8, 9
    ])

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );

    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    this.mesh = new THREE.Mesh( geometry, material );

    this.mesh.castShadow = false;
    this.mesh.receiveShadow = false;
  }
}

function constructGeometry(mapGrid: ddapi.Map.Board): THREE.Mesh[] {
  const objects: THREE.Mesh[] = []

  const grid = mapGrid.grid.hex;

  for (const cell of grid) {
    const mapGridCell = new MapGridCell();
    mapGridCell.mesh.position.x = cell.position.x * 0.866025 * 2 + cell.position.y * 0.866025;
    mapGridCell.mesh.position.z = cell.position.y * 1.5;
    objects.push(mapGridCell.mesh)
  }

  // var geometry = new THREE.BufferGeometry();
  // TODO: CONSTRUCT MAP GEOMETRY HERE
  // I can think of what I need to do into a list here
  // 1. Build hexagons for the grid in `Board.grid`
  // 2. Build models and textures for each ObjectEntity in `Board.objectList`
  // 3. ...
  // 4. PROFIT?????!?????


  return objects;
}

export { constructGeometry };
