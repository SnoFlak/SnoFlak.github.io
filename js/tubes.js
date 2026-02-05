import * as THREE from 'three';


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
        emissiveIntensity: 5
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

    // group.add(curve);
    group.add(innerTube);
    group.add(outerTube);

    return group;
}

export function animateTube(group, spherePos) {
    let time = Date.now() * 0.002;

    const outer = group.getObjectByName("outerTube");
    const inner = group.getObjectByName("innerTube");

    group.userData.curve.points[0].copy(new THREE.Vector3(3.5, -1.8, 5));
    group.userData.curve.points[2].copy(spherePos);

    group.userData.curve.points[1].x = (3 + spherePos.x) / 2 + Math.sin(time) * 0.5;
    group.userData.curve.points[1].y = (-2.5 + spherePos.y) / 2 + Math.cos(time) * 0.5;
    if (outer != undefined){
        outer.geometry.dispose(); // Clean up old memory
        outer.geometry = new THREE.TubeGeometry(group.userData.curve, 64, 0.1, 8, false);
    }
    if (inner != undefined) {
        inner.geometry.dispose();
        inner.geometry = new THREE.TubeGeometry(group.userData.curve, 64, 0.055, 8, false);
    }
}