import "../style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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
camera.position.z = 0;
camera.position.x = 10;
camera.position.y = 0;

// const camhelper = new THREE.CameraHelper(camera);
// scene.add(camhelper);

renderer.render(scene, camera);

const resisze = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", resisze);

// Lights

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 0);
scene.add(directionalLight);

// Resize

// Sphere

const SphereGeometry = new THREE.SphereGeometry(35, 64, 64);
const SphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
SphereMaterial.map = new THREE.TextureLoader().load("Map-Planet/EarthMap.jpg");
SphereMaterial.bumpMap = new THREE.TextureLoader().load(
  "Map-Planet/EarthBump.jpg"
);
const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
scene.add(Sphere);

Sphere.position.z = 0;
Sphere.position.x = -30;
Sphere.position.y = -17;
function animate() {
  requestAnimationFrame(animate);

  Sphere.rotation.y += 0.001;
  Sphere.rotation.x += 0.001;
  Sphere.rotation.z += 0.001;

  renderer.render(scene, camera);
}

animate();

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
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
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enableZoom = true;
controls.enablePan = true;
controls.enableKeys = true;
controls.enableRotate = true;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = true;
controls.minDistance = 10;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2;
// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

window.addEventListener("scroll", () => {
  let value = window.scrollY;
  gsap.to(camera.position, {
    x: 20,
    y: value * 0.09,
    z: value * 0.1,
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      console.log("done");
    },
    onUpdate: () => {
      console.log("update");
      camera.lookAt(scene.position);
    },
  });
});
