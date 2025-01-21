import * as THREE from "three";
import { Component } from "../ComponentSystem/Component";
import ThreeJSComponent from "./ThreeJSComponent";

class BoxComponent extends Component {
  static CLASS_NAME = "BoxComponent";
  mesh!: THREE.Mesh;

  get NAME() {
    return BoxComponent.CLASS_NAME;
  }

  InitEntity() {
    const threejs = this.FindEntity("threeJSEntity").GetComponent(
      "ThreeJSComponent"
    ) as ThreeJSComponent;

    const scene = threejs.scene;
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0.32, 3, -0.5);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    scene.add(this.mesh);
  }

  Update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}

export default BoxComponent;
