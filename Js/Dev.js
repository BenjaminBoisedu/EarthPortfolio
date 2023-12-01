import "../style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import MoonMap from "../Map-Planet/Moon.jpg";
import BumpMoon from "../Map-Planet/BumpMoon.jpg";
// Scene

const scene = new THREE.Scene();

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
camera.position.setZ(20);
camera.position.setX(10);
renderer.render(scene, camera);

const resisze = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", resisze);
// Resize

// Sphere

const SphereGeometry = new THREE.SphereGeometry(8, 128, 128);
const SphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
SphereMaterial.map = new THREE.TextureLoader().load(MoonMap);
SphereMaterial.bumpMap = new THREE.TextureLoader().load(BumpMoon);
SphereMaterial.bumpScale = 1;

const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
scene.add(Sphere);

Sphere.position.z = 0;
Sphere.position.setX(10);
Sphere.position.y = 0;

// Lights

const pointLight = new THREE.DirectionalLight(0xffffff, 0.5);
pointLight.position.set(-10, 10, 5);
scene.add(pointLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

function animate() {
  requestAnimationFrame(animate);

  Sphere.rotation.x += 0.001;
  Sphere.rotation.y += 0.001;
  Sphere.rotation.z += 0.001;

  renderer.render(scene, camera);
}

animate();

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

// Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.rotateSpeed = 0.5;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enableZoom = false;
controls.enablePan = false;
controls.enableRotate = false;
controls.dampingFactor = 0.05;
controls.minDistance = 10;
controls.maxDistance = 20;
controls.update();
