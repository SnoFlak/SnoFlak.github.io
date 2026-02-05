import * as THREE from 'three';
import { createIcoSphere, animateSphere } from './icosphere.js';
import { createBust, animateBust } from './bust.js';
import { mapRange, lerp } from './helpers.js';
import { CameraWaypoints, BlueSphereWaypoints, GreenSphereWaypoints, PurpleSphereWaypoints } from './waypoints.js';
import { createDust } from './dust.js';

let currentScroll = 0;
let scrollFraction = 0;
const icospheres = [];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 0.6);
light.position.set(0,2,0);
light.rotation.set(0, 0, 180);
scene.add(light);
scene.add(new THREE.AmbientLight(0x0062a8, 1));

// const axesHelper = new THREE.AxesHelper(5); 
// scene.add(axesHelper);

const dust = createDust(1000);
scene.add(dust);

const blueIcosphere = createIcoSphere(0x0041b0, BlueSphereWaypoints)
blueIcosphere.position.set(0,0,0);
scene.add(blueIcosphere);

const purpleIcosphere = createIcoSphere(0x8d00b0, PurpleSphereWaypoints)
purpleIcosphere.position.set(0,2,5);
scene.add(purpleIcosphere);

const greenIcosphere = createIcoSphere(0x00b020, GreenSphereWaypoints)
greenIcosphere.position.set(0,0,10);
scene.add(greenIcosphere);

icospheres.push(blueIcosphere);
icospheres.push(purpleIcosphere);
icospheres.push(greenIcosphere);

const bust = createBust();
bust.scale.set(3,3,3);
bust.position.set(3.5, -3.5, 5)
bust.rotation.y = THREE.MathUtils.degToRad(90)
scene.add(bust);

camera.position.set(0,0,5)

animateBust(bust, currentScroll);

function animateCamera() {
    const camTimeline = CameraWaypoints;

    let p1 = camTimeline[0];
    let p2 = camTimeline[1];

    for (let i = 0; i < camTimeline.length - 1; i++) {
        if (currentScroll >= camTimeline[i].percent && currentScroll <= camTimeline[i+1].percent) {
            p1 = camTimeline[i];
            p2 = camTimeline[i+1];
            break;
        }
    }

    let t = (currentScroll - p1.percent) / (p2.percent - p1.percent);
    t = Math.max(0, Math.min(1, t));

    camera.position.z = lerp(p1.z_pos, p2.z_pos, t);
    camera.position.y = lerp(p1.y_pos, p2.y_pos, t);
    camera.position.x = lerp(p1.x_pos, p2.x_pos, t);
    camera.rotation.y = THREE.MathUtils.degToRad(lerp(p1.y_rot, p2.y_rot, t));

}

export function incrementGlobalTimeline() {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const stepSize = Math.round(totalHeight / 10);
    const targetY = window.scrollY + stepSize;
    window.scrollTo({
        top: targetY,
        behavior: 'smooth'
    });
}

export function getCamera() {
    return camera;
}

export function getRenderer() {
    return renderer;
}

export function render() {
    requestAnimationFrame(render);

    currentScroll = lerp(currentScroll, scrollFraction, 0.05);

    dust.rotation.y += 0.001;
    dust.position.y = Math.sin(Date.now() * 0.0005) * 0.5;

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    icospheres.forEach((sphere) =>
        animateSphere(sphere, currentScroll, delta, elapsed)
    );
    animateCamera();
    animateBust(bust, currentScroll);

    renderer.render(scene, camera);
}

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    scrollFraction = scrollTop / docHeight;
    console.log(scrollFraction);
});