import React, { Component } from 'react';
import * as THREE from 'three';

import Communications from '../../../core/communications';
import { constructGeometry } from '../../../core/canvasmodules/mapgeometry';
import { Camera } from '../../../core/canvasmodules/camera';

class Renderer extends Component {
  mount: HTMLDivElement;
  renderer: {[id: string]: any};

  constructor(props: any) {
    super(props);
    this.renderer = {};
  }

  setUpThreeJs(): void {
    this.renderer.scene = new THREE.Scene();
    this.renderer.camera = new Camera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.renderer.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.renderer.setSize(
      this.mount.clientWidth, 
      this.mount.clientHeight
    );
    this.renderer.renderer.shadowMap.enabled = true;
    this.renderer.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.renderer.outputEncoding = THREE.sRGBEncoding;

    window.addEventListener("resize", () => {
      this.renderer.renderer.setSize(
        this.mount.clientWidth, 
        this.mount.clientHeight
      );
    });

    this.mount.appendChild(this.renderer.renderer.domElement);

    this.renderer.light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.renderer.scene.add(this.renderer.light);

    this.animate();
  }

  animate(): void {
    const animate = this.animate.bind(this)
    requestAnimationFrame(animate);

    this.renderer.camera.tick();

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

      constructGeometry(event).then((objects) => {
        for (const elem of objects) {
          this.renderer.scene.add(elem);
        }
      });
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
