import * as THREE from 'three';

export function createDust(count = 500) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3); // x, y, z for each point

    for (let i = 0; i < count * 3; i++) {
        // Randomly scatter them in a large cube
        positions[i] = (Math.random() - 0.5) * 20; 
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const textureLoader = new THREE.TextureLoader();
    const sprite = textureLoader.load('../res/particle.png');

    const material = new THREE.PointsMaterial({
        color: 0x174880,
        size: 0.15,
        map: sprite,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true // Particles get smaller as they get further away
    });

    return new THREE.Points(geometry, material);
}