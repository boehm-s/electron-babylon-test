// DragSphere (extends sphere)
function DragSphere(x, y, z) {
    this.sphere = BABYLON.Mesh.CreateSphere("sphere", 15, 2, scene);
    this.sphere.material = new BABYLON.StandardMaterial("sphereMat", scene);
    this.sphere.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    this.sphere.position = new BABYLON.Vector3(x, y, z);
    this.sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, {mass: Math.random()*10, friction: 0.5, restitution: 0.7});
    this.sphere.checkCollisions = true;
    this.sphere.updatePhysicsBodyPosition();
    this.sphere.isDraggable = true;

    return (this.sphere);
}