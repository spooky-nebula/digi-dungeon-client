import * as THREE from 'three';
import * as ddapi from 'digi-dungeon-api';
import Mesh from './mesh';
import MapGridHex from './hexgrid';

function constructGeometry(mapGrid: ddapi.Map.Board): Promise<THREE.Mesh[]> {
  const objects: THREE.Mesh[] = []

  const grid = mapGrid.grid.hex;

  for (const cell of grid) {
    const mapGridCell = new MapGridHex();
    mapGridCell.mesh.position.x = cell.position.x * 0.866025 * 2 + cell.position.y * 0.866025;
    mapGridCell.mesh.position.z = cell.position.y * 1.5;
    mapGridCell.mesh.position.y = cell.height * 0.5;
    objects.push(mapGridCell.mesh);
  }

  const loadMesh = (...args: [
    id: number,
    cloudModelLink: string,
    position: ddapi.Util.struct.Vector3,
    rotation: ddapi.Util.struct.Vector3,
    scale: ddapi.Util.struct.Vector3,
    castShadows: boolean,
    receiveShadows: boolean
  ]): Promise<Mesh> => {
    return new Promise((resolve) => {
      const newObjectEntity = new Mesh(...args);

      newObjectEntity.eventEmitter.on("ready", () => {
        resolve(newObjectEntity);
      });
    })
  }

  const promises: Promise<Mesh>[] = [];

  for (const objectEntity of mapGrid.objectList) {
    promises.push(
      loadMesh(
        objectEntity.id,
        objectEntity.cloudModelLink,
        objectEntity.position,
        objectEntity.rotation,
        objectEntity.scale,
        objectEntity.castShadows,
        objectEntity.receiveShadows
      )
    );
  }

  return new Promise((resolve) => {
    Promise.all(promises).then((values) => {
      for (const value of values) {
        objects.push((value as Mesh).mesh);
      }
      resolve(objects);
    });
  });


  // var geometry = new THREE.BufferGeometry();
  // TODO: CONSTRUCT MAP GEOMETRY HERE
  // I can think of what I need to do into a list here
  // 1. Build hexagons for the grid in `Board.grid`
  // 2. Build models and textures for each ObjectEntity in `Board.objectList`
  // 3. ...
  // 4. PROFIT?????!?????
}

export { constructGeometry };
