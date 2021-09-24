import * as THREE from 'three';

class MapGridHex {
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

export default MapGridHex;