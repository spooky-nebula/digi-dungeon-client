import * as THREE from 'three';
import * as ddapi from 'digi-dungeon-api';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import EventEmitter from 'events';

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'three/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

class Mesh {
  mesh: THREE.Mesh
  eventEmitter: EventEmitter
  id: number
  cloudModelLink: string
  position: ddapi.Util.struct.Vector3
  rotation: ddapi.Util.struct.Vector3
  scale: ddapi.Util.struct.Vector3
  castShadows: boolean
  receiveShadows: boolean

  constructor(
    id: number,
    cloudModelLink: string,
    position: ddapi.Util.struct.Vector3,
    rotation: ddapi.Util.struct.Vector3,
    scale: ddapi.Util.struct.Vector3,
    castShadows: boolean,
    receiveShadows: boolean
  ) {

    this.id = id;
    this.eventEmitter = new EventEmitter();
    
    loader.load(
      cloudModelLink,
      (gltf) => {
        this.mesh = gltf.scene.children[0] as THREE.Mesh;
        this.mesh.castShadow = false;
        this.mesh.receiveShadow = false;

        this.mesh.position.copy(position as THREE.Vector3);
        this.mesh.rotation.x = rotation.x;
        this.mesh.rotation.y = rotation.y;
        this.mesh.rotation.z = rotation.z;

        this.mesh.scale.copy(scale as THREE.Vector3);
        
        this.mesh.castShadow = castShadows;
        this.mesh.receiveShadow = receiveShadows;

        this.eventEmitter.emit("ready");
      }
    )

  }
}

export default Mesh;
