import * as THREE from 'three';
import { loadBustIntoGroup } from './modelLoader.js';
import { BustWaypoints } from './waypoints.js';
import { lerp } from './helpers.js';

export function createBust() {
    const group = new THREE.Group();
    loadBustIntoGroup("../res/bust_posed.glb", group);

    group.userData.waypoints = BustWaypoints;

    return group;
}

export function animateBust(bust, currentScroll) {
    const timeline = bust.userData.waypoints;
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

    let model = bust.getObjectByName("Mathias");

    if(model != undefined){
        model.children.forEach((child) => {
            if(child != undefined){
                child.material.opacity = lerp(p1.opacity, p2.opacity, t);
            }
        })
    }
}