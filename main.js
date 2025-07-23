import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#121212');

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let INTERSECTED = null;
let model = null;

const loader = new GLTFLoader();
loader.load('assets/model/muscle.glb', (gltf) => {
  model = gltf.scene;
  scene.add(model);
  model.position.set(0, 0, 0);
}, undefined, (error) => {
  console.error('Error loading GLB:', error);
});

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', () => {
  if (INTERSECTED) {
    const name = INTERSECTED.name || INTERSECTED.parent?.name;
    if (name) {
      const pageName = name.toLowerCase().replace(/\s+/g, '-');
      window.location.href = `pages/${pageName}.html`;
    }
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  raycaster.setFromCamera(mouse, camera);
  if (model) {
    const intersects = raycaster.intersectObjects(model.children, true);
    if (intersects.length > 0) {
      const first = intersects[0].object;
      if (INTERSECTED !== first) {
        if (INTERSECTED?.material?.emissive) {
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        }

        INTERSECTED = first;
        if (INTERSECTED.material?.emissive) {
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
          INTERSECTED.material.emissive.setHex(0xff0000);
        }
      }
    } else {
      if (INTERSECTED?.material?.emissive) {
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      }
      INTERSECTED = null;
    }
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();

document.getElementById('inbodyForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const gender = document.getElementById('gender').value;

  let idealWeight, fatPercentage, muscleMass;

  if (gender === 'male') {
    idealWeight = (height - 100) * 0.9;
    fatPercentage = Math.max(8, Math.min(25, ((weight - idealWeight) / weight) * 100));
    muscleMass = weight * 0.4;
  } else {
    idealWeight = (height - 100) * 0.85;
    fatPercentage = Math.max(15, Math.min(30, ((weight - idealWeight) / weight) * 100));
    muscleMass = weight * 0.35;
  }

  document.getElementById('idealWeight').textContent = idealWeight.toFixed(1);
  document.getElementById('fatPercentage').textContent = fatPercentage.toFixed(1);
  document.getElementById('muscleMass').textContent = muscleMass.toFixed(1);
  document.getElementById('results').style.display = 'block';
});
function showInBodySection() {
  document.body.style.overflowY = 'auto';  
  document.querySelector('.inbody-section').style.display = 'block';
}

function hideInBodySection() {
  document.body.style.overflowY = 'auto'; 
  document.querySelector('.inbody-section').style.display = 'none';
}

  position: relative;
  display: block;
  overflow-y. auto;
document.getElementById('inbody-results').classList.remove('hidden');

document.getElementById('result-weight').textContent = "75 kg";
document.getElementById('result-muscle').textContent = "38 kg";
document.getElementById('result-fat').textContent = "15%";
document.getElementById('result-bmr').textContent = "1650 kcal";
document.getElementById("inbody-results").style.display = "block";
function simulateResults() {
 
  document.getElementById("result-weight").textContent = "75 kg";
  document.getElementById("result-muscle").textContent = "32 kg";
  document.getElementById("result-fat").textContent = "16%";
  document.getElementById("result-bmr").textContent = "1600 kcal";

  document.getElementById("inbody-results").style.display = "block";
}
document.addEventListener("DOMContentLoaded", () => {

  function toggleSupplements() {
  const sidebar = document.getElementById("supplements-sidebar");
  sidebar.classList.toggle("open");
}

});

const urlParams = new URLSearchParams(window.location.search);
const height = parseFloat(urlParams.get('height'));
const weight = parseFloat(urlParams.get('weight'));
const gender = urlParams.get('gender');

let idealWeight, fatPercentage, muscleMass;


if (gender === 'male') {
    idealWeight = (height - 100) * 0.9;
    fatPercentage = Math.max(8, Math.min(25, ((weight - idealWeight) / weight) * 100));
    muscleMass = weight * 0.4;
} else {
    idealWeight = (height - 100) * 0.85;
    fatPercentage = Math.max(15, Math.min(30, ((weight - idealWeight) / weight) * 100));
    muscleMass = weight * 0.35;
}

document.getElementById('result-weight').textContent = idealWeight.toFixed(1) + ' kg';
document.getElementById('result-fat').textContent = fatPercentage.toFixed(1) + '%';
document.getElementById('result-muscle').textContent = muscleMass.toFixed(1) + ' kg';
document.getElementById('result-bmr').textContent = (10 * weight + 6.25 * height - 5 * 25 + 5).toFixed(1) + ' kcal'; // Example BMR calculation

document.getElementById('backButton').addEventListener('click', () => {
    window.history.back(); 
});
document.getElementById('inbodyForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const gender = document.getElementById('gender').value;

    window.location.href = `results.html?height=${height}&weight=${weight}&gender=${gender}`;
});