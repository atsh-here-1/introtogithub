// Basic Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Neon-style cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 1,
    metalness: 0.5,
    roughness: 0.5,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lighting
const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
pointLight.position.set(0, 0, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 5;

// Animation loop
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);

    // Mouse interaction
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
