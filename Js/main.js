import "../style.css";
import * as THREE from "three";
import MoonMap from "../Map-Planet/Moon.jpg";
import MoonBump from "../Map-Planet/BumpMoon.jpg";
import gsap from "gsap";

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
camera.position.z = -20;
camera.position.x = 15;
camera.position.y = -10;
camera.rotation.y = 90;

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

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 10, 0);
scene.add(directionalLight);

// Resize

// Sphere

const SphereGeometry = new THREE.SphereGeometry(35, 128, 128);
const SphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
SphereMaterial.map = new THREE.TextureLoader().load(MoonMap);
SphereMaterial.bumpMap = new THREE.TextureLoader().load(MoonBump);
SphereMaterial.bumpScale = 1;
SphereMaterial.metalness = 0.5;
SphereMaterial.roughness = 0.5;

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

const btn = document.querySelector(".btn-down");
btn.addEventListener("click", () => {});

const services = document.querySelector(".services");
4;
gsap.from(".services", { duration: 1, opacity: 0, y: -50, stagger: 0 });

gsap.from(".btn-down", { duration: 1, opacity: 0, y: -50, stagger: 1 });

gsap.from("nav", { duration: 1, opacity: 0, y: -50, stagger: 0.5, delay: 1 });

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  if (scroll > 100) {
    gsap.to(".btn-down", { duration: 1, opacity: 0 });
  } else {
    gsap.to(".btn-down", { duration: 1, opacity: 1 });
  }
});

gsap.fromTo(
  "#about",
  { x: -10, opacity: 0 },
  { x: 0, duration: 1, opacity: 1, stagger: 0.5, delay: 1 }
);

gsap.fromTo(
  ".products",
  { x: -10, opacity: 0 },
  { x: 0, duration: 1, opacity: 1, stagger: 0.5, delay: 2 }
);

gsap.fromTo(
  ".services",
  { x: -10, opacity: 0 },
  { x: 0, duration: 1, opacity: 1, stagger: 0.5, delay: 3 }
);

gsap.fromTo(
  ".skill",
  { x: -10, opacity: 0 },
  { x: 0, duration: 1, opacity: 1, stagger: 0.5, delay: 2 }
);

gsap.fromTo(
  "#contact",
  { x: -10, opacity: 0 },
  { x: 0, duration: 1, opacity: 1, stagger: 0.5, delay: 1 }
);

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 4,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  freemode: true,

  // If we need pagination
  // Breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 3,
    },
    480: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 3,
    },
  },
});
