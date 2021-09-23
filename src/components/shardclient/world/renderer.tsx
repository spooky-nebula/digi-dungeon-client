import React, { Component } from 'react';
import * as THREE from 'three';

import Communications from '../../../core/communications';
import { constructGeometry } from '../../../core/canvasmodules/mapgeometry';

class Renderer extends Component {
  mount: HTMLDivElement;
  renderer: any;

  constructor(props: any) {
    super(props);
    this.renderer = {}
  }

  setUpThreeJs(): void {
    this.renderer.scene = new THREE.Scene();
    this.renderer.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.renderer.renderer = new THREE.WebGLRenderer({ alpha: true });
    // WARNING: THE 46 is the pixels is from the navbar height
    this.renderer.renderer.setSize(window.innerWidth, window.innerHeight - 46);
    this.renderer.renderer.shadowMap.enabled = true;
    this.renderer.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.renderer.outputEncoding = THREE.sRGBEncoding;

    window.addEventListener("resize", () => {
      this.renderer.renderer.setSize( window.innerWidth, window.innerHeight - 46 );
      this.renderer.camera.aspect = window.innerWidth / window.innerHeight;
      this.renderer.camera.updateProjectionMatrix();
    });

    this.mount.appendChild(this.renderer.renderer.domElement);

    this.renderer.light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.renderer.scene.add(this.renderer.light);
    this.renderer.camera.position.z = 4;
    this.renderer.camera.position.y = 4;
    this.renderer.camera.lookAt(0, 0, 0);

    this.animate();
  }

  animate(): void {
    const animate = this.animate.bind(this)
    requestAnimationFrame(animate);

    for (let child of this.renderer.scene.children) {
      if (child.constructor.name == "Mesh") {
        // child.rotation.y += 0.05;
      }
    }

    this.renderer.renderer.render(this.renderer.scene, this.renderer.camera);
  }

  componentDidMount(): void {

    Communications.mapKeeper.on("map-resync", (event) => {
      this.setUpThreeJs()

      let objects = constructGeometry(event);

      for (let elem of objects) {
        this.renderer.scene.add(elem);
      }
    })

    // TODO: CONSTRUCT MAP GEOMETRY AND REPLACE THIS
    // This should be done in mapgeometry.ts
  }

  render() {
    return (
      <div className='dd-renderer' ref={(ref) => (this.mount = ref)}></div>
    );
  }
}

export default Renderer;
