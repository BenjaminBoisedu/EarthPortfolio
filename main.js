import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// Scene

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

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
camera.position.x = 0;
camera.position.y = 1;
camera.rotation.y = 45;

renderer.render(scene, camera, 0.1);

const resisze = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", resisze);

const pointLight = new THREE.PointLight(0xffffff, 50, 100, 2);
pointLight.position.set(0, 3, 0);
scene.add(pointLight);

const pointLightBottom = new THREE.PointLight(0xffffff, 70, 100, 2);
pointLightBottom.position.set(0, -3, 0);

const PointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(PointLightHelper);

const GridHelper = new THREE.GridHelper(200, 50);
scene.add(GridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1, 4),
  new THREE.Vector3(3, 1, 2),
  new THREE.Vector3(5, 1, 0),
  new THREE.Vector3(3, 1, -2),
  new THREE.Vector3(0, 1, -4),
]);

const points = path.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const curveObject = new THREE.Line(geometry, material);
scene.add(curveObject);

//cam follow path

const camPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1, 4),
  new THREE.Vector3(3, 1, 2),
  new THREE.Vector3(5, 1, 0),
  new THREE.Vector3(3, 1, -2),
  new THREE.Vector3(0, 1, -4),
  new THREE.Vector3(-3, 1, -2),
  new THREE.Vector3(-5, 1, 0),
  new THREE.Vector3(-3, 1, 2),
  new THREE.Vector3(0, 1, 4),
]);

const camPoints = camPath.getPoints(50);
const camGeometry = new THREE.BufferGeometry().setFromPoints(camPoints);
const camMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const camObject = new THREE.Line(camGeometry, camMaterial);
scene.add(camObject);

const camHelper = new THREE.CameraHelper(camera);
scene.add(camHelper);

const lightShadow = new THREE.DirectionalLight(0xff0000, 10, 10, 2);
lightShadow.position.set(3, -1, 1);
lightShadow.castShadow = true;
scene.add(lightShadow);

const lightShadowHelper = new THREE.DirectionalLightHelper(lightShadow, 1);
scene.add(lightShadowHelper);

const lightShadow2 = new THREE.DirectionalLight(0x3461dd6a, 10, 10, 2);
lightShadow2.position.set(-3, -1, 1);
lightShadow2.castShadow = true;
scene.add(lightShadow2);

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

// const BoxGeometry = new THREE.BoxGeometry(2, 2, 2);
// const BoxMaterial = new THREE.MeshLambertMaterial({
//   color: 0xfffffff,
//   side: THREE.DoubleSide,
//   emissive: 0xffffff,
//   emissiveIntensity: 0.8,
//   shadowSide: THREE.DoubleSide,
// });
// const Box = new THREE.Mesh(BoxGeometry, BoxMaterial);
// scene.add(Box);
// Box.position.x = 0;
// Box.position.y = -1;
// Box.position.z = 0;

function UpdateCam() {
  const time = performance.now() / 1000;
  const looptime = 40;
  const t = (time % looptime) / looptime;
  // const t2 = ((time + 0.1) % looptime) / looptime;

  const pos = camPath.getPointAt(t);
  // const pos2 = camPath.getPointAt(t2);
  camHelper.update();

  camera.position.copy(pos);
  camera.lookAt(scene.position);
}
function animate() {
  requestAnimationFrame(animate);
  UpdateCam();
  renderer.render(scene, camera);
}

animate();

const scroll = {
  y: window.scrollY,
};

const tl = gsap.timeline({
  onUpdate: () => {
    window.scrollTo(0, scroll.y);
  },
});

window.addEventListener("scroll", () => {
  scroll.y = window.scrollY;
  UpdateCam();
});
