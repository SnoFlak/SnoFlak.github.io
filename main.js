import * as THREE from 'three';
import { render, incrementGlobalTimeline, getCamera, getRenderer } from "./js/threeEnvironment.js";
import { resizeEnvironment } from './js/threeEnvironment.js';

const button = document.getElementById('continueButton');
button.addEventListener('click', incrementGlobalTimeline);

// Handle Window Resize
window.addEventListener('resize', resizeEnvironment);

window.jumpTo = function(percent) {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const targetY = percent * totalHeight;
    
    window.scrollTo({
        top: targetY,
        behavior: 'smooth'
    });
};

resizeEnvironment();

render();