import * as THREE from "three";
import { Component } from "../ComponentSystem/Component";
import ThreeJSComponent from "./ThreeJSComponent";

class GroundComponent extends Component {
  static CLASS_NAME = "GroundComponent";
  mesh!: THREE.Mesh;

  get NAME() {
    return GroundComponent.CLASS_NAME;
  }

  InitEntity() {
    const threejs = this.FindEntity("threeJSEntity").GetComponent(
      "ThreeJSComponent"
    ) as ThreeJSComponent;
    const loader = new THREE.TextureLoader();
    const texture = loader.load("static/textures/road.png");

    const scene = threejs.scene;
    const geometry = new THREE.BoxGeometry(10, 0.1, 10);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.multiplyScalar(3);
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;
    this.mesh.position.set(-4, 0, -30);
    this.mesh.scale.z = 20;
    scene.add(this.mesh);
  }

  Update() {}
}

export default GroundComponent;
