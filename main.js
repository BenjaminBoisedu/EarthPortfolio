import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import EasePack from "gsap/dist/EasePack";

// Scene

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 2;
camera.position.x = 2;
camera.position.y = 1;
camera.rotation.y = 45;

renderer.render(scene, camera, 0.1);

const resisze = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", resisze);

const direcLight = new THREE.DirectionalLight(0xffffff, 1);
direcLight.position.set(0, 0, 10);
scene.add(direcLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 1, 0);
scene.add(pointLight);

const PoinntLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(PoinntLightHelper);

const DirectionalLightHelper = new THREE.DirectionalLightHelper(direcLight, 5);
scene.add(DirectionalLightHelper);

const GridHelper = new THREE.GridHelper(200, 50);
scene.add(GridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

let loader = new GLTFLoader();
loader.load("scene.gltf", function (gltf) {
  console.log(gltf);
  scene.add(gltf.scene);
  gltf.scene.scale.set(10, 10, 10);
  gltf.scene.position.x = 0;
  gltf.scene.position.y = 0;
  gltf.scene.position.z = 0;
  animate();
});

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshBasicMaterial({ color: 0xfffffff })
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -3;
scene.add(plane);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", renderer);

// Scroll Animation

const tl = gsap.timeline();

tl.fromTo(
  camera.position,
  {
    x: 2,
    y: 1,
    z: 2,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: camera.lookAt(0, 0, 0),
  },
  {
    x: 2,
    y: 3,
    z: 2,
    duration: 2,
    rotateZ: 45,
    ease: "power2.inOut",
    onUpdate: camera.lookAt(0, 0, 0),
  }
);

tl.fromTo(
  camera.position,
  {
    x: 2,
    y: 3,
    z: 2,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: camera.lookAt(0, 0, 0),
  },
  {
    x: 0,
    y: 0.5,
    z: 0,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: camera.lookAt(0, 0, 0),
  }
);
