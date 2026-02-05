import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { loadIcosphereIntoGroup } from './modelLoader.js';

export function createIcoSphere(color = 0x00ffcc, waypoints) {
    const group = new THREE.Group();
    const icosphere = loadIcosphereIntoGroup("../res/icosphere.glb", group);

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