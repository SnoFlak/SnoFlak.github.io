import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export function loadIcosphereIntoGroup(path, group) {
    loader.load(path, (gltf) => {
        const model = gltf.scene.children[0];

        if (model.isMesh) {
            model.material = new THREE.MeshStandardMaterial({
                color: 0xc0c0c0,
                metalness: 0.7,
                roughness: 0.2,
                transparent: true,
                opacity: 0
            });
        }
        group.add(model);
    }, undefined, (error) => {
        console.error(error);
    });
}

export function loadBustIntoGroup(path, group) {
    loader.load(path, (gltf) => {
        const model = gltf.scene.children[0];
        console.log(model);

        model.children.forEach(child => {
            child.material.transparent = true;
            child.material.opacity = 0;
        });


        group.add(model);
    }, undefined, (error) => {
        console.error(error);
    });
}