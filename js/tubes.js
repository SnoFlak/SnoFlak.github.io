import * as THREE from 'three';
import { TubeWaypoints } from './waypoints.js';
import { lerp } from './helpers.js';

export function createTube(spherePos, sphereColor) {
    const group = new THREE.Group();

    const midCurve = new THREE.Vector3((3 + spherePos.x) / 2, (-2.5 + spherePos.y) / 2, (3 + spherePos.z) / 2);
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(3, -2.5, 3),    // Bust center
        midCurve,    // Mid-air "bend" point
        spherePos         // The target sphere
    ]);

    const innerTubeGeo = new THREE.TubeGeometry(curve, 64, 0.055, 8, false);
    const innerTubeMat = new THREE.MeshStandardMaterial({ 
        color: 0xb08309, 
        emissive: 0xb08309, 
        emissiveIntensity: 1,
        transparent: true,
        depthWrite: false,
        opacity: 1
    });
    const innerTube = new THREE.Mesh(innerTubeGeo, innerTubeMat);
    innerTube.name = "innerTube";

    const outerTubeGeo = new THREE.TubeGeometry(curve, 64, 0.1, 8, false);
    const outerTubeMat = new THREE.MeshStandardMaterial({ 
        color: 0xb08309, 
        transparent: true,
        opacity: 0.6,
        depthWrite: false
    });
    const outerTube = new THREE.Mesh(outerTubeGeo, outerTubeMat);
    outerTube.name = "outerTube";

    group.userData.sphereColor = sphereColor;
    group.userData.curve = curve;
    group.userData.waypoints = TubeWaypoints;

    innerTube.renderOrder = 2;
    outerTube.renderOrder = 1;

    group.add(innerTube);
    group.add(outerTube);

    return group;
}

export function animateTube(group, spherePos, currentScroll) {
    const time = Date.now() * 0.002;
    const curve = group.userData.curve;

    const outer = group.getObjectByName("outerTube");
    const inner = group.getObjectByName("innerTube");

    curve.points[0].set(3.5, -1.8, 5);
    curve.points[2].copy(spherePos);

    curve.points[1].x = (3 + spherePos.x) / 2 + Math.sin(time) * 0.5;
    curve.points[1].y = (-2.5 + spherePos.y) / 2 + Math.cos(time) * 0.5;

    if (outer) {
        outer.geometry.dispose();
        outer.geometry = new THREE.TubeGeometry(curve, 64, 0.1, 8, false);
    }
    if (inner) {
        inner.geometry.dispose();
        inner.geometry = new THREE.TubeGeometry(curve, 64, 0.055, 8, false);
    }

    const timeline = group.userData.waypoints;
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

    if (outer) outer.material.opacity = lerp(p1.outerOpacity, p2.outerOpacity, t);
    if (inner) inner.material.opacity = lerp(p1.innerOpacity, p2.innerOpacity, t);
}