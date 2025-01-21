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
  spotLight!: THREE.SpotLight;
  torusKnot!: THREE.Mesh;
  cube!: THREE.Mesh;
  dirLightShadowMapViewer!: ShadowMapViewer;
  spotLightShadowMapViewer!: ShadowMapViewer;

  get NAME() {
    return ThreeJSComponent.CLASS_NAME;
  }

  initScene() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(0, 15, 35);

    this.scene = new THREE.Scene();

    // Lights

    this.scene.add(new THREE.AmbientLight(0x404040, 3));

    this.spotLight = new THREE.SpotLight(0xffffff, 500);
    this.spotLight.name = "Spot Light";
    this.spotLight.angle = Math.PI / 5;
    this.spotLight.penumbra = 0.3;
    this.spotLight.position.set(10, 10, 5);
    this.spotLight.castShadow = true;
    this.spotLight.shadow.camera.near = 8;
    this.spotLight.shadow.camera.far = 30;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.scene.add(this.spotLight);

    this.scene.add(new THREE.CameraHelper(this.spotLight.shadow.camera));

    this.dirLight = new THREE.DirectionalLight(0xffffff, 3);
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

    this.scene.add(new THREE.CameraHelper(this.dirLight.shadow.camera));

    // Geometry
    let geometry: THREE.TorusKnotGeometry | THREE.BoxGeometry;
    geometry = new THREE.TorusKnotGeometry(25, 8, 75, 20);
    let material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 150,
      specular: 0x222222,
    });

    this.torusKnot = new THREE.Mesh(geometry, material);
    this.torusKnot.scale.multiplyScalar(1 / 18);
    this.torusKnot.position.y = 3;
    this.torusKnot.castShadow = true;
    this.torusKnot.receiveShadow = true;
    this.scene.add(this.torusKnot);

    geometry = new THREE.BoxGeometry(10, 0.15, 10);
    material = new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      shininess: 150,
      specular: 0x111111,
    });

    const ground = new THREE.Mesh(geometry, material);
    ground.scale.multiplyScalar(3);
    ground.castShadow = false;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  initShadowMapViewers() {
    this.dirLightShadowMapViewer = new ShadowMapViewer(this.dirLight);
    this.spotLightShadowMapViewer = new ShadowMapViewer(this.spotLight);
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

    this.dirLightShadowMapViewer.position.x = 10;
    this.dirLightShadowMapViewer.position.y = 10;
    this.dirLightShadowMapViewer.size.width = size;
    this.dirLightShadowMapViewer.size.height = size;
    this.dirLightShadowMapViewer.update(); //Required when setting position or size directly

    this.spotLightShadowMapViewer.size.set(size, size);
    this.spotLightShadowMapViewer.position.set(size + 20, 10);
    // spotLightShadowMapViewer.update();	//NOT required because .set updates automatically
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.resizeShadowMapViewers();
    this.dirLightShadowMapViewer.updateForWindowResize();
    this.spotLightShadowMapViewer.updateForWindowResize();
  }

  Update() {
    this.renderer.render(this.scene, this.camera);
    this.dirLightShadowMapViewer.render(this.renderer);
    this.spotLightShadowMapViewer.render(this.renderer);
    this.stats.update();

    // geometry
    this.torusKnot.rotation.x += 0.01;
    this.torusKnot.rotation.y += 0.01;
  }
}

export default ThreeJSComponent;
