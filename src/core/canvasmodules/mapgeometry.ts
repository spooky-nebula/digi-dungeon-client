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
      0.000000, -0.500000, 0.000000,
      0.000000, 0.500000, 0.000000,
      0.000000, -0.500000, -1.000000,
      0.000000, 0.500000, -1.000000,
      0.866025, -0.500000, -0.500000,
      0.866025, 0.500000, -0.500000,
      0.866025, -0.500000, 0.500000,
      0.866025, 0.500000, 0.500000,
      -0.000000, -0.500000, 1.000000,
      -0.000000, 0.500000, 1.000000,
      -0.866025, -0.500000, 0.500000,
      -0.866025, 0.500000, 0.500000,
      -0.866025, -0.500000, -0.500000,
      -0.866025, 0.500000, -0.500000,
    ]);
    
    const indices = new Uint16Array([
      0, 2, 4, 
      1, 5, 3, 
      3, 4, 2, 
      0, 4, 6, 
      1, 7, 5, 
      5, 6, 4, 
      0, 6, 8, 
      1, 9, 7, 
      7, 8, 6, 
      0, 8, 10, 
      1, 11, 9, 
      9, 10, 8, 
      0, 10, 12, 
      1, 13, 11, 
      11, 12, 10, 
      0, 12, 2, 
      1, 3, 13, 
      13, 2, 12, 
      3, 5, 4, 
      5, 7, 6, 
      7, 9, 8, 
      9, 11, 10, 
      11, 13, 12, 
      13, 3, 2
    ])

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );

    geometry.computeVertexNormals();

    const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    this.mesh = new THREE.Mesh( geometry, material );

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
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
