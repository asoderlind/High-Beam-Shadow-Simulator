import * as THREE from "three";
import { Component } from "../ComponentSystem/Component";
import ThreeJSComponent from "./ThreeJSComponent";
import { loadObj } from "../utils/objLoader";

class CarComponent extends Component {
  static CLASS_NAME = "CarComponent";
  mesh!: THREE.Mesh;
  meshPosition = new THREE.Vector3(-7, 0, -55);

  get NAME() {
    return CarComponent.CLASS_NAME;
  }

  async InitEntity(): Promise<void> {
    const threejs = this.FindEntity("threeJSEntity").GetComponent(
      "ThreeJSComponent"
    ) as ThreeJSComponent;
    const scene = threejs.scene;

    try {
      const material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
      });
      const model = await loadObj("static/objects/Car.obj", material);
      if (model.children.length === 0) {
        console.error("Loaded OBJ model has no children.");
        return;
      }
      this.mesh = model.children[0] as THREE.Mesh;
      this.mesh.castShadow = true;
      this.mesh.receiveShadow = true;
      this.mesh.scale.set(2.2, 2.2, 2.2);
      scene.add(model);
    } catch (error) {
      console.error("Error loading and adding car:", error);
    }
  }

  Update() {
    if (this.mesh) {
      this.mesh.position.set(
        this.meshPosition.x,
        this.meshPosition.y,
        this.meshPosition.z
      );
    }
  }
}

export default CarComponent;
