import * as THREE from "three";


const w = window.innerWidth
const h = window.innerHeight
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)

console.log(w)
console.log(h)

const fov = 75;
const aspect = w / h
const near = 0.1
const far = 10
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 5
const scene = new THREE.Scene()

// first book
const geo = new THREE.BoxGeometry(1.8, 2.5, 0.15)
const mat = new THREE.MeshStandardMaterial({
    color: 0xccff
})
const mesh = new THREE.Mesh(geo, mat)
scene.add(mesh)



// Add wire to mesh
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.0001)
// mesh.add(wireMesh)

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1)
scene.add(hemiLight)


// Add object rotation
var mouseDown = false,
    mouseX = 0,
    mouseY = 0;

function onMouseMove(evt) {
    if (!mouseDown) {
        return;
    }

    evt.preventDefault();

    var deltaX = evt.clientX - mouseX;
    var deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    rotateScene(deltaX, deltaY);
}

function onMouseDown(evt) {
    evt.preventDefault();
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function onMouseUp(evt) {
    evt.preventDefault();
    mouseDown = false;
}

function addMouseHandler(canvas) {
    canvas.addEventListener('mousemove', function (e) {
        onMouseMove(e);
    }, false);
    canvas.addEventListener('mousedown', function (e) {
        onMouseDown(e);
    }, false);
    canvas.addEventListener('mouseup', function (e) {
        onMouseUp(e);
    }, false);
}

function rotateScene(deltaX, deltaY) {
    mesh.rotation.y += deltaX / 100;
    mesh.rotation.x += deltaY / 100;
}

const toggleScreenButton = document.getElementById('toggleScreenButton')

// handle button logic 
toggleScreenButton.addEventListener('click', () => {
    // Example interaction: Change the cube color
//     mesh.material.color.set(Math.random() * 0xffffff);
//     console.log('Button clicked!');
    const tweenPosition = new TWEEN.Tween(mesh.position)
      .to({ z: 2.5 }, 2000) // Move to (0, 0, 10) in 2 seconds
      .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the movement smooth
      .start();

    const tweenRotate = new TWEEN.Tween(mesh.rotation)
      .to({ x: 0, y: 0, z: Math.PI / 2 }, 2000) // Move to (0, 0, 10) in 2 seconds
      .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the movement smooth
      .start();
});


function animate(t=0) {
    requestAnimationFrame(animate)
    // mesh.scale.setScalar(Math.cos(t * 0.001) + 1)
    // mesh.rotation.x = t*0.0001
    // mesh.rotation.y = t*0.0001
    TWEEN.update()
    renderer.render(scene, camera)

}

addMouseHandler(renderer.domElement)
animate()