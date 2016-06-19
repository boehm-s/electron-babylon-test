// Drag and drop
var mouseIsHold = false;
var isDraggable = false;
var drag, tmp;

function mouseEvents(canvas) {
    canvas.addEventListener("mousedown", function (e) {
        var pick = scene.pick(e.clientX, e.clientY);
        console.log(pick);
        if (pick.pickedMesh && pick.pickedMesh.isDraggable) {
            mouseIsHold = true;
            tmp = pick.pickedMesh;
            tmp.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
            camera.detachControl(canvas);
        }
    }, false);


    canvas.addEventListener("mouseup", function (e) {
        mouseIsHold = false;
        isDraggable = false;
        if (drag !== undefined)
            drag.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, {
                mass: Math.random() * 10,
                friction: 0.5,
                restitution: 0.7
            });

        if (tmp != null) {
            tmp.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
            tmp = null;
        }

        camera.attachControl(canvas);
        console.log("Mouse Hold state : " + mouseIsHold);
    });

    canvas.addEventListener("mousemove", function (e) {
        var pick = scene.pick(e.clientX, e.clientY);
        if (pick.pickedMesh && pick.pickedMesh.isDraggable && mouseIsHold)
            isDraggable = true;
        if (isDraggable && pick.pickedMesh !== null) {
            drag = pick.pickedMesh;
            drag.position.x = pick.pickedPoint.x;
            drag.position.y = pick.pickedPoint.y;
            drag.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, {mass: 0, friction: 0.5, restitution: 0.7});
            drag.updatePhysicsBodyPosition();
        }
    });

}