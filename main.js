import * as THREE from 'three';
import { render, incrementGlobalTimeline, getCamera, getRenderer } from "./js/threeEnvironment.js";

const button = document.getElementById('continueButton');
button.addEventListener('click', incrementGlobalTimeline);

// Handle Window Resize
window.addEventListener('resize', () => {
    const camera = getCamera();
    const renderer = getRenderer();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const baseFOV = 75;
    const baseAspect = 1920 / 1080;

    renderer.setSize(width, height);
    camera.aspect = aspect;

    if (aspect < baseAspect) {
        const fovRad = THREE.MathUtils.degToRad(baseFOV);
        const hFOV = 2 * Math.atan(Math.tan(fovRad / 2) * baseAspect);
        camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(hFOV / 2) / aspect));
    } else {
        camera.fov = baseFOV;
    }

    camera.updateProjectionMatrix();
});

render();