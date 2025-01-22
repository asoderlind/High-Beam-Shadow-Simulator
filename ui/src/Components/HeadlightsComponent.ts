import * as THREE from "three";
import { Component } from "../ComponentSystem/Component";
import ThreeJSComponent from "./ThreeJSComponent";
import { ShadowMapViewer } from "three/addons/utils/ShadowMapViewer.js";

class HeadlightsComponent extends Component {
  static CLASS_NAME = "HeadlightsComponent";
  mesh!: THREE.Mesh;
  headlightL!: THREE.SpotLight;
  headlightR!: THREE.SpotLight;
  headlightLShadowMapViewer!: ShadowMapViewer;
  headLightRShadowMapViewer!: ShadowMapViewer;
  flatBlockL!: THREE.Mesh;
  flatBlockR!: THREE.Mesh;
  renderer!: THREE.WebGLRenderer;
  near = 6;

  get NAME() {
    return HeadlightsComponent.CLASS_NAME;
  }

  resizeShadowMapViewers() {
    const size = window.innerWidth * 0.15;

    this.headlightLShadowMapViewer.size.set(size, size);
    this.headlightLShadowMapViewer.position.set(size + 20, 10);

    this.headLightRShadowMapViewer.size.set(size, size);
    this.headLightRShadowMapViewer.position.set(size * 2 + 30, 10);
  }

  initShadowMapViewers() {
    this.headlightLShadowMapViewer = new ShadowMapViewer(this.headlightL);
    this.headLightRShadowMapViewer = new ShadowMapViewer(this.headlightR);
    this.resizeShadowMapViewers();
  }

  /*
   * Get the point on the near plane that is in the middle of the light and the target
   */
  getNearPlaneMiddlePoint(
    lightPoint: THREE.Vector3,
    targetPoint: THREE.Vector3,
    near: number
  ) {
    const lightToTarget = targetPoint.clone().sub(lightPoint);
    const nearPoint = lightPoint.clone().add(
      lightToTarget
        .clone()
        .normalize()
        .multiplyScalar(near + 0.1)
    );
    return nearPoint;
  }

  getRotationQuaternion(boxNormal: THREE.Vector3, targetNormal: THREE.Vector3) {
    console.log("🚀 HeadlightsComponent.ts:52 ~ targetNormal", targetNormal);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      boxNormal,
      targetNormal.normalize()
    );
    return quaternion;
  }

  InitEntity() {
    const threejs = this.FindEntity("threeJSEntity").GetComponent(
      "ThreeJSComponent"
    ) as ThreeJSComponent;

    const scene = threejs.scene;
    const renderer = threejs.renderer;
    this.renderer = renderer;

    // Left headlight
    this.headlightL = new THREE.SpotLight(0xffffff, 500);
    this.headlightL.name = "Headlight L";
    this.headlightL.angle = Math.PI / 5;
    this.headlightL.penumbra = 0.3;
    this.headlightL.position.set(-3, 2, 15);
    this.headlightL.castShadow = true;
    this.headlightL.shadow.camera.near = this.near;
    this.headlightL.shadow.camera.far = 30;
    this.headlightL.shadow.mapSize.width = 1024;
    this.headlightL.shadow.mapSize.height = 1024;
    this.headlightL.target.position.set(0, 0, 0);
    scene.add(this.headlightL);
    scene.add(this.headlightL.target);

    // Right headlight
    this.headlightR = new THREE.SpotLight(0xffffff, 500);
    this.headlightR.name = "Headlight R";
    this.headlightR.angle = Math.PI / 5;
    this.headlightR.penumbra = 0.3;
    this.headlightR.position.set(3, 2, 15);
    this.headlightR.castShadow = true;
    this.headlightR.shadow.camera.near = this.near;
    this.headlightR.shadow.camera.far = 30;
    this.headlightR.shadow.mapSize.width = 1024;
    this.headlightR.shadow.mapSize.height = 1024;
    scene.add(this.headlightR);
    scene.add(this.headlightR.target);

    scene.add(new THREE.CameraHelper(this.headlightL.shadow.camera));
    scene.add(new THREE.CameraHelper(this.headlightR.shadow.camera));

    const geometry = new THREE.BoxGeometry(10, 0.15, 10);
    const material = new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      shininess: 150,
      specular: 0x111111,
    });

    // Left headlight shadow
    this.flatBlockL = new THREE.Mesh(geometry, material);

    // set position
    const screenPosL = this.getNearPlaneMiddlePoint(
      this.headlightL.position,
      this.headlightL.target.position,
      this.near
    );
    this.flatBlockL.position.set(screenPosL.x, screenPosL.y, screenPosL.z);

    // set scale
    this.flatBlockL.scale.multiplyScalar(0.1);

    // set rotation
    const quaternionL = this.getRotationQuaternion(
      new THREE.Vector3(0, 1, 0),
      this.headlightL.target.position.clone().sub(this.headlightL.position)
    );
    this.flatBlockL.setRotationFromQuaternion(quaternionL);
    this.flatBlockL.receiveShadow = true;
    this.flatBlockL.castShadow = true;
    scene.add(this.flatBlockL);

    // Right headlight shadow
    this.flatBlockR = new THREE.Mesh(geometry, material);

    // set position
    const screenPosR = this.getNearPlaneMiddlePoint(
      this.headlightR.position,
      this.headlightR.target.position,
      this.near
    );
    this.flatBlockR.position.set(screenPosR.x, screenPosR.y, screenPosR.z);

    // set scale
    this.flatBlockR.scale.multiplyScalar(0.1);

    // set rotation
    const quaternionR = this.getRotationQuaternion(
      new THREE.Vector3(0, 1, 0),
      this.headlightR.target.position.clone().sub(this.headlightR.position)
    );
    this.flatBlockR.setRotationFromQuaternion(quaternionR);
    this.flatBlockR.receiveShadow = true;
    this.flatBlockR.castShadow = true;
    scene.add(this.flatBlockR);

    this.initShadowMapViewers();
  }

  Update() {
    this.headlightLShadowMapViewer.render(this.renderer);
    this.headLightRShadowMapViewer.render(this.renderer);
  }
}

export default HeadlightsComponent;
