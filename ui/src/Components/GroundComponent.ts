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

    const scene = threejs.scene;
    const geometry = new THREE.BoxGeometry(10, 0.1, 10);
    const material = new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      shininess: 150,
      specular: 0x111111,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.multiplyScalar(3);
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;
    scene.add(this.mesh);
  }

  Update() {}
}

export default GroundComponent;
