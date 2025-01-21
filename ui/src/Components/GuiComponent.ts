import { Component } from "../ComponentSystem/Component";
import GUI from "lil-gui";
import ThreeJSComponent from "./ThreeJSComponent";
import BoxComponent from "./BoxComponent";

class GuiComponent extends Component {
  static CLASS_NAME = "GuiComponent";
  gui!: GUI;

  get NAME() {
    return GuiComponent.CLASS_NAME;
  }

  InitEntity() {
    const threejs = this.FindEntity("threeJSEntity").GetComponent(
      "ThreeJSComponent"
    ) as ThreeJSComponent;
    const box = this.FindEntity("objectsEntity")?.GetComponent(
      "BoxComponent"
    ) as BoxComponent;

    this.gui = new GUI();
    /*
    const lightFolder = this.gui.addFolder("Lights");
    lightFolder.open();
    lightFolder.add(threejs.dirLight, "intensity", 0, 10);
    lightFolder.add(threejs.spotLight, "intensity", 0, 1000);
    lightFolder.add(threejs.dirLight.position, "x", -20, 20);
    lightFolder.add(threejs.dirLight.position, "y", -20, 20);
    lightFolder.add(threejs.dirLight.position, "z", -20, 20);
    lightFolder.add(threejs.spotLight.position, "x", -20, 20);
    lightFolder.add(threejs.spotLight.position, "y", -20, 20);
    lightFolder.add(threejs.spotLight.position, "z", -20, 20);
    */

    if (box) {
      const boxFolder = this.gui.addFolder("Box");
      boxFolder.open();
      boxFolder.add(box.mesh.position, "x", -20, 20);
      boxFolder.add(box.mesh.position, "y", -20, 20);
      boxFolder.add(box.mesh.position, "z", -20, 20);
    }
  }

  Update() {}
}

export default GuiComponent;
