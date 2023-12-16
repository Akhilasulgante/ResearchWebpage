// Followed developedbyed coding tutoial
import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const scene = new THREE.Scene();

//sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#3eebcc",
  roughness: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//light
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(0, 10, 10);
// light.intensity = 125;
scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

//render
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGL1Renderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

//timeline
const t1 = gsap.timeline({ defaults: { duration: 1 } });
t1.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
t1.fromTo(".title", { opacity: 0 }, { opacity: 1 });
t1.fromTo(".desc", { opacity: 0 }, { opacity: 1 });
t1.fromTo("nav", { y: "-100%" }, { y: "0%" });

let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => {
  mouseDown = true;
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});
window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ];
    //animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);

    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
