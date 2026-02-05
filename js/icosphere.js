import * as THREE from 'three';
import { loadIcosphereIntoGroup } from './modelLoader.js';
import { lerp } from './helpers.js';

export function createIcoSphere(color = 0x00ffcc, waypoints) {
    const group = new THREE.Group();
    loadIcosphereIntoGroup("../res/icosphere.glb", group);

    const coreInnerGeo = new THREE.SphereGeometry(0.4, 12, 12);
    const coreInnerMat = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 2,
        transparent: true,
        opacity: 1
    });
    const coreInnerMesh = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    coreInnerMesh.name = "innerLayer";

    const coreOuterGeo = new THREE.SphereGeometry(0.5, 12, 12);
    const coreOuterMat = new THREE.MeshPhysicalMaterial({
        color: color,
        transmission: 0.8,
        roughness: 0.1,
        thickness: 0.5,
        transparent: true,
        opacity: 0,
        depthWrite: false
    });
    const coreOuterMesh = new THREE.Mesh(coreOuterGeo, coreOuterMat);
    coreOuterMesh.name = "outerLayer";

    const pointLight = new THREE.PointLight(color, 10, 1);
    pointLight.position.set(0,0,0);
    pointLight.name = "light";

    group.add(coreInnerMesh);
    group.add(coreOuterMesh);
    group.add(pointLight);

    group.userData = {
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        rotationSpeed: (Math.random() - 0.5),
        innerOpacityMax: 1,
        outerOpacityMax: 0.6,
        lightIntensityMax: 10
    };

    group.userData.waypoints = waypoints;

    return group;
}

export function animateSphere(sphere, currentScroll, delta, elapsed) {
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
        if (currentScroll >= timeline[i].percent && currentScroll <= timeline[i+1].percent) {
            p1 = timeline[i];
            p2 = timeline[i+1];
            break;
        }
    }

    let t = (currentScroll - p1.percent) / (p2.percent - p1.percent);
    t = Math.max(0, Math.min(1, t));

    outer.material.opacity = lerp(p1.outerAlpha, p2.outerAlpha, t);
    inner.material.opacity = lerp(p1.innerAlpha, p2.innerAlpha, t);
    light.intensity = lerp(p1.lightIntensity, p2.lightIntensity, t);
    model.material.opacity = lerp(p1.modelAlpha, p2.modelAlpha, t);

    sphere.rotation.y += settings.rotationSpeed * delta;
    sphere.rotation.z += settings.rotationSpeed * 0.5 * delta;

    const localTime = elapsed * settings.pulseSpeed + settings.pulseOffset;

    outer.scale.x = 1 + Math.sin(localTime) * 0.1;
    outer.scale.y = 1 + Math.cos(localTime * 1.2) * 0.1;
    outer.scale.z = 1 + Math.sin(localTime * 0.8) * 0.1;
    sphere.position.y += (Math.sin(localTime) / 2) * 0.005;
}