import '../assets/css/styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

console.log("<Main> script loaded.");


class Scene {
    constructor(params) {
        this._init(params);
    }

    _init(params) {

        console.log("Initializing scene...")

        const { canvas } = params;

        // scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x242424);

        const helperSize = 500;
        const axesHelper = new THREE.AxesHelper(helperSize / 2, helperSize / 2);

        this.scene.add(axesHelper);

        // camera
        this.camera = new THREE.PerspectiveCamera(
            55, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            3000
        );
        this.camera.position.z = 50;
        this.camera.position.y = 50;

        // plane
        const planeGeo = new THREE.PlaneGeometry(helperSize, helperSize);
        const planeMat = new THREE.MeshBasicMaterial({ 
            color: 0xFFFFFF, 
            side: THREE.DoubleSide,
        });
        this.plane = new THREE.Mesh(planeGeo, planeMat);
        this.plane.rotation.x = -Math.PI / 2;
    
        this.scene.add(this.plane);

        // renderer
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // controls

        this.orbitControls = new OrbitControls(this.camera, canvas);
        this.orbitControls.enableDamping = true;
            
        this._animate();
    }

    _animate() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this._animate());
    }
}

const canvas = document.querySelector('#canvas');
new Scene({canvas});