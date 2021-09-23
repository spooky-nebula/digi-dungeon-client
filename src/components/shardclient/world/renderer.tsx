import React, { Component } from 'react';
import * as THREE from 'three';

class Renderer extends Component {
  mount: HTMLDivElement;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    // WARNING: THE 46 is the pixels is from the navbar height
    renderer.setSize(window.innerWidth, window.innerHeight - 46);
    this.mount.appendChild(renderer.domElement);

    // TODO: CONSTRUCT MAP GEOMETRY AND REPLACE THIS
    // This should be done in mapgeometry.ts

    //var geometry = new THREE.BoxGeometry(1, 1, 1);
    //var geometry = new THREE.TorusGeometry(0.6, 0.4, 6, 6);
    var geometry = new THREE.BufferGeometry();
    //let geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    var material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);
    camera.position.z = 2;
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }

  render() {
    return (
      <div className='dd-renderer' ref={(ref) => (this.mount = ref)}></div>
    );
  }
}

export default Renderer;
