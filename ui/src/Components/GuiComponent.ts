import { Component } from "../ComponentSystem/Component";
import GUI from "lil-gui";
import BoxComponent from "./BoxComponent";
import HeadlightsComponent from "./HeadlightsComponent";
import CarComponent from "./CarComponent";

class GuiComponent extends Component {
  static CLASS_NAME = "GuiComponent";
  gui!: GUI;

  get NAME() {
    return GuiComponent.CLASS_NAME;
  }

  InitEntity() {
    const car = this.FindEntity("carEntity")?.GetComponent(
      "CarComponent"
    ) as CarComponent;

    const box = this.FindEntity("objectsEntity")?.GetComponent(
      "BoxComponent"
    ) as BoxComponent;

    const headlights = this.FindEntity("headlightsEntity")?.GetComponent(
      "HeadlightsComponent"
    ) as HeadlightsComponent;

    this.gui = new GUI();

    if (car) {
      const carFolder = this.gui.addFolder("Car");
      carFolder.open();
      console.log("🚀 GuiComponent.ts:33 ~ ", car);
      carFolder.add(car.meshPosition, "x", -20, 20);
      carFolder.add(car.meshPosition, "z", -100, 100);
    }

    if (box) {
      const boxFolder = this.gui.addFolder("Box");
      boxFolder.open();
      boxFolder.add(box.mesh.position, "x", -20, 20);
      boxFolder.add(box.mesh.position, "y", -20, 20);
      boxFolder.add(box.mesh.position, "z", -20, 20);
    }

    if (headlights) {
      // Headlight L
      const headlightLFolder = this.gui.addFolder("Headlight L");
      const headlightLPos = headlightLFolder.addFolder("Position");
      headlightLPos.add(headlights.headlightL.position, "x", -20, 20);
      headlightLPos.add(headlights.headlightL.position, "y", -20, 20);
      headlightLPos.add(headlights.headlightL.position, "z", -20, 20);
      const headlightLTargetPos = headlightLFolder.addFolder("Target Position");
      headlightLTargetPos.open();
      headlightLTargetPos.add(
        headlights.headlightL.target.position,
        "x",
        -20,
        20
      );
      headlightLTargetPos.add(
        headlights.headlightL.target.position,
        "y",
        -20,
        20
      );
      headlightLTargetPos.add(
        headlights.headlightL.target.position,
        "z",
        -20,
        20
      );

      // Headlight R
      const headlightRFolder = this.gui.addFolder("Headlight R");
      const headlightRPos = headlightRFolder.addFolder("Position");
      headlightRPos.add(headlights.headlightR.position, "x", -20, 20);
      headlightRPos.add(headlights.headlightR.position, "y", -20, 20);
      headlightRPos.add(headlights.headlightR.position, "z", -20, 20);
      const headlightRTargetPos = headlightRFolder.addFolder("Target Position");
      headlightRTargetPos.open();
      headlightRTargetPos.add(
        headlights.headlightR.target.position,
        "x",
        -20,
        20
      );
      headlightRTargetPos.add(
        headlights.headlightR.target.position,
        "y",
        -20,
        20
      );
      headlightRTargetPos.add(
        headlights.headlightR.target.position,
        "z",
        -20,
        20
      );
      headlightLFolder.close();
      headlightRFolder.close();
    }

    // Screen L
    const screenLFolder = this.gui.addFolder("Screen L");
    screenLFolder.open();
    const screenLPos = screenLFolder.addFolder("Position");
    screenLPos.add(headlights.flatBlockL.position, "x", -6, 2, 0.01);
    screenLPos.add(headlights.flatBlockL.position, "y", -6, 12, 0.01);
    const screenLScale = screenLFolder.addFolder("Scale");
    screenLScale.add(headlights.flatBlockL.scale, "x", 0, 0.4, 0.01);
    screenLScale.add(headlights.flatBlockL.scale, "z", 0, 0.4, 0.01);

    // Screen R
    const screenRFolder = this.gui.addFolder("Screen R");
    screenRFolder.open();
    const screenRPos = screenRFolder.addFolder("Position");
    screenRPos.add(headlights.flatBlockR.position, "x", -2, 6, 0.01);
    screenRPos.add(headlights.flatBlockR.position, "y", -2, 6, 0.01);
    const screenRScale = screenRFolder.addFolder("Scale");
    screenRScale.add(headlights.flatBlockR.scale, "x", 0, 0.4, 0.01);
    screenRScale.add(headlights.flatBlockR.scale, "z", 0, 0.4, 0.01);
  }

  Update() {}
}

export default GuiComponent;
