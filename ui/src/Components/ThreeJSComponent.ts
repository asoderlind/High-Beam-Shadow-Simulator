import { Component } from "../ComponentSystem/Component";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ShadowMapViewer } from "three/addons/utils/ShadowMapViewer.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

class ThreeJSComponent extends Component {
  static CLASS_NAME = "ThreeJSComponent";
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  clock!: THREE.Clock;
  stats!: Stats;

  headlightLShadowMapViewer!: ShadowMapViewer;
  headLightRShadowMapViewer!: ShadowMapViewer;

  get NAME() {
    return ThreeJSComponent.CLASS_NAME;
  }

  constructor() {
    super();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(0, 3.5, 21);
  }

  InitEntity() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;

    // ambient light
    const ambientLight = new THREE.AmbientLight(0x505050);
    this.scene.add(ambientLight);

    // Mouse control
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 6, 0);
    controls.update();

    this.clock = new THREE.Clock();
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.onWindowResize);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //this.resizeShadowMapViewers();
    //this.headlightLShadowMapViewer.updateForWindowResize();
    //this.headLightRShadowMapViewer.updateForWindowResize();
  }

  Update() {
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }
}

export default ThreeJSComponent;
