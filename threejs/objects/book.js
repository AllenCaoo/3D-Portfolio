import * as THREE from "three";

const createBookMesh = () => {
    const leatherTexture = new THREE.TextureLoader().load('../textures/leather.jpg')
    const leatherMaterial = new THREE.MeshBasicMaterial({ map: leatherTexture });
    const plainMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const geo = new THREE.BoxGeometry(1.8, 2.5, 0.3)
    // const mat = new THREE.MeshStandardMaterial({
    //     // color: 0xccff
    //     map: leatherTexture 
    // })

    // Create an array of materials
    const materials = [
        leatherMaterial, // Right side
        leatherMaterial, // Left side
        plainMaterial,    // Top side
        plainMaterial,    // Bottom side
        leatherMaterial, // Front side
        leatherMaterial  // Back side
    ];

    const mesh = new THREE.Mesh(geo, materials)

    // Add wire to mesh
    const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });
    const wireMesh = new THREE.Mesh(geo, wireMat);
    wireMesh.scale.setScalar(1.0001)
    return mesh;
}

const tiltOnLeftBook = (leftBook, rightBook) => {
    rightBook.position.set(leftBook.position.x, leftBook.position.y, leftBook.position.z + 0.38);
    rightBook.rotateX(-0.06)
}

// book.add(wireMesh)
export {createBookMesh, tiltOnLeftBook};