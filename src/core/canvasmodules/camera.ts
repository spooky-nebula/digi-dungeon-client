import * as THREE from 'three';

class Camera extends THREE.PerspectiveCamera {
  keysDown: {[id: string]: boolean};
  motionVector: THREE.Vector2;
  speed: number;

  constructor(...args: any) {
    super(...args);

    this.speed = 0.1;

    window.addEventListener("resize", () => {
      this.aspect = window.innerWidth / window.innerHeight;
      this.updateProjectionMatrix();
    });

    this.position.z = 4;
    this.position.y = 4;
    this.lookAt(0, 0, 0);

    this.keysDown = {};
    this.motionVector = new THREE.Vector2(0, 0);
    
    document.addEventListener("keydown", (event) => {
      switch (event.key){
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowUp":
        case "ArrowDown":
          this.keysDown[event.key] = true;
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.key){
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowUp":
        case "ArrowDown":
          this.keysDown[event.key] = false;
          break;
      }
    });
  }

  tick(): void {
    const getActionVal = (action: string) => {
      return (this.keysDown[action]) ? 1 : 0;
    }
    this.motionVector.x = getActionVal("ArrowRight") - getActionVal("ArrowLeft");
    this.motionVector.y = getActionVal("ArrowDown") - getActionVal("ArrowUp");
    this.motionVector = this.motionVector.normalize();

    this.position.x += this.motionVector.x * this.speed;
    this.position.z += this.motionVector.y * this.speed;
  }
}

export { Camera };
