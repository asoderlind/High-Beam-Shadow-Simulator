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

  dirLight!: THREE.DirectionalLight;

  headlightL!: THREE.SpotLight;
  headLightR!: THREE.SpotLight;

  torusKnot!: THREE.Mesh;
  cube!: THREE.Mesh;
  dirLightShadowMapViewer!: ShadowMapViewer;

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
    this.camera.position.set(0, 15, 35);
  }

  initScene() {
    this.scene = new THREE.Scene();

    // Lights
    this.headlightL = new THREE.SpotLight(0xffffff, 500);
    this.headlightL.name = "Headlight L";
    this.headlightL.angle = Math.PI / 5;
    this.headlightL.penumbra = 0.3;
    this.headlightL.position.set(-4, 5, 15);
    this.headlightL.castShadow = true;
    this.headlightL.shadow.camera.near = 6;
    this.headlightL.shadow.camera.far = 30;
    this.headlightL.shadow.mapSize.width = 1024;
    this.headlightL.shadow.mapSize.height = 1024;
    this.scene.add(this.headlightL);

    this.headLightR = new THREE.SpotLight(0xffffff, 500);
    this.headLightR.name = "Headlight R";
    this.headLightR.angle = Math.PI / 5;
    this.headLightR.penumbra = 0.3;
    this.headLightR.position.set(5, 5, 15);
    this.headLightR.castShadow = true;
    this.headLightR.shadow.camera.near = 6;
    this.headLightR.shadow.camera.far = 30;
    this.headLightR.shadow.mapSize.width = 1024;
    this.headLightR.shadow.mapSize.height = 1024;
    this.scene.add(this.headLightR);

    this.scene.add(new THREE.CameraHelper(this.headlightL.shadow.camera));
    this.scene.add(new THREE.CameraHelper(this.headLightR.shadow.camera));

    this.dirLight = new THREE.DirectionalLight(0xffffff, 0);
    this.dirLight.name = "Dir. Light";
    this.dirLight.position.set(0, 10, 0);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.camera.near = 1;
    this.dirLight.shadow.camera.far = 10;
    this.dirLight.shadow.camera.right = 15;
    this.dirLight.shadow.camera.left = -15;
    this.dirLight.shadow.camera.top = 15;
    this.dirLight.shadow.camera.bottom = -15;
    this.dirLight.shadow.mapSize.width = 1024;
    this.dirLight.shadow.mapSize.height = 1024;
    this.scene.add(this.dirLight);

    const geometry = new THREE.BoxGeometry(10, 0.15, 10);
    const material = new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      shininess: 150,
      specular: 0x111111,
    });

    const flatBlockR = new THREE.Mesh(geometry, material);
    flatBlockR.position.set(3, 3, 7);
    flatBlockR.setRotationFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
    flatBlockR.scale.multiplyScalar(0.1);
    flatBlockR.receiveShadow = true;
    flatBlockR.castShadow = true;
    this.scene.add(flatBlockR);

    const flatBlockL = new THREE.Mesh(geometry, material);
    flatBlockL.position.set(-3, 3, 7);
    flatBlockL.setRotationFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
    flatBlockL.scale.multiplyScalar(0.1);
    flatBlockL.receiveShadow = true;
    flatBlockL.castShadow = true;
    this.scene.add(flatBlockL);

    const ground = new THREE.Mesh(geometry, material);
    ground.scale.multiplyScalar(3);
    ground.castShadow = false;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  initShadowMapViewers() {
    this.headlightLShadowMapViewer = new ShadowMapViewer(this.headlightL);
    this.headLightRShadowMapViewer = new ShadowMapViewer(this.headLightR);
    this.resizeShadowMapViewers();
  }

  initMisc() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;

    // Mouse control
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 2, 0);
    controls.update();

    this.clock = new THREE.Clock();
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  InitEntity() {
    this.initScene();
    this.initShadowMapViewers();
    this.initMisc();

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.onWindowResize);
  }

  resizeShadowMapViewers() {
    const size = window.innerWidth * 0.15;

    this.headlightLShadowMapViewer.size.set(size, size);
    this.headlightLShadowMapViewer.position.set(size + 20, 10);

    this.headLightRShadowMapViewer.size.set(size, size);
    this.headLightRShadowMapViewer.position.set(size * 2 + 30, 10);

    // headlightLShadowMapViewer.update();	//NOT required because .set updates automatically
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.resizeShadowMapViewers();
    this.headlightLShadowMapViewer.updateForWindowResize();
    this.headLightRShadowMapViewer.updateForWindowResize();
  }

  Update() {
    this.renderer.render(this.scene, this.camera);
    this.headlightLShadowMapViewer.render(this.renderer);
    this.headLightRShadowMapViewer.render(this.renderer);
    this.stats.update();
  }
}

export default ThreeJSComponent;
