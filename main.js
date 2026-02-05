import * as THREE from 'three';
import { createIcoSphere } from './js/icosphere.js';
import { mapRange, lerp } from './js/helpers.js';
import { goldSphereWaypoints } from './js/waypoints.js';

let scrollFraction = 0;
let waypointNode = 0;

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


const icospheres = [];


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0,2,0);
light.rotation.set(0, 0, 180);
scene.add(light);
scene.add(new THREE.AmbientLight(0x0062a8, 1));

const axesHelper = new THREE.AxesHelper(5); 
scene.add(axesHelper);

const icosphere = createIcoSphere(0xEBA434, goldSphereWaypoints)
scene.add(icosphere);
icospheres.push(icosphere);
console.log(icosphere);

camera.position.set(0,0,5)

function render() {
    requestAnimationFrame(render);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    icospheres.forEach((sphere) => {
        const settings = sphere.userData;
        const outer = sphere.getObjectByName("outerLayer");
        const inner = sphere.getObjectByName("innerLayer");
        const light = sphere.getObjectByName("light");
        const model = sphere.getObjectByName("Icosphere");
        if (!model) return;

        const timeline = sphere.userData.waypoints;

        let p1 = timeline[0];
        let p2 = timeline[1];

        for (let i = 0; i < timeline.length - 1; i++) {
            if (scrollFraction >= timeline[i].percent && scrollFraction <= timeline[i+1].percent) {
                p1 = timeline[i];
                p2 = timeline[i+1];
                break;
            }
        }

        // 2. Calculate local progress between its own waypoints
        // We "clamp" the value between 0 and 1 so it doesn't break if scroll is out of range
        let t = (scrollFraction - p1.percent) / (p2.percent - p1.percent);
        t = Math.max(0, Math.min(1, t));

        outer.material.opacity = lerp(p1.outerAlpha, p2.outerAlpha, t);
        inner.material.opacity = lerp(p1.innerAlpha, p2.innerAlpha, t);
        light.intensity = lerp(p1.lightIntensity, p2.lightIntensity, t);
        model.material.opacity = lerp(p1.modelAlpha, p2.modelAlpha, t);

        // const settings = sphere.userData;
        // sphere.rotation.y += settings.rotationSpeed * delta;
        // sphere.rotation.z += settings.rotationSpeed * 0.5 * delta;

        // const localTime = elapsed * settings.pulseSpeed + settings.pulseOffset;
        // const outer = sphere.getObjectByName("outerLayer");
        // const inner = sphere.getObjectByName("innerLayer");
        // const light = sphere.getObjectByName("light");
        // const model = sphere.getObjectByName("Icosphere");

        // outer.scale.x = 1 + Math.sin(localTime) * 0.1;
        // outer.scale.y = 1 + Math.cos(localTime * 1.2) * 0.1;
        // outer.scale.z = 1 + Math.sin(localTime * 0.8) * 0.1;
        // sphere.position.y += (Math.sin(localTime) / 2) * 0.005;
    
        // let outerAlpha = mapRange(scrollFraction, 0, 0.2, 0, settings.outerOpacityMax);
        // let innerAlpha = mapRange(scrollFraction, 0, 0.2, 0, settings.innerOpacityMax);
        // let lightIntensity = mapRange(scrollFraction, 0, 0.2, 0.1, settings.lightIntensityMax);
        // let modelAlpha = mapRange(scrollFraction, 0, 0.2, 0, 1);

        // // console.log(outerAlpha + " / " + innerAlpha + " / " + lightIntensity)
        // outer.material.opacity = Math.min(Math.max(outerAlpha, 0), settings.outerOpacityMax);
        // inner.material.opacity = Math.min(Math.max(innerAlpha, 0), settings.innerOpacityMax);
        // inner.material.emissiveIntensity = inner.material.opacity * 2;
        // light.intensity = Math.min(Math.max(lightIntensity, 0), settings.lightIntensityMax);
        // if(model != undefined) {
        //     model.material.opacity = Math.min(Math.max(modelAlpha, 0), 1);
        // }
        // console.log(outer.material.opacity + " / " + inner.material.opacity + " / " + light.intensity)
    });


    renderer.render(scene, camera);
}

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    scrollFraction = scrollTop / docHeight;
    
});

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

render();