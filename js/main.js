// Global variables
var canvas, engine, scene, camera, light;
var TOAD_MODEL;

// An array to store each ending of the lane
var ENDINGS = [];

/**
 * Load the scene when the canvas is fully loaded
 */
document.addEventListener("DOMContentLoaded", function () {
    if (BABYLON.Engine.isSupported()) {
        initScene();
        initGame();
    }
}, false);

/**
 * Creates a new BABYLON Engine and initialize the scene
 */
function initScene() {
    canvas = document.getElementById("renderCanvas");
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);

    camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,4,-50), scene);
    camera.setTarget(new BABYLON.Vector3(0,0,10));
    camera.attachControl(canvas);

    light = new BABYLON.PointLight("light", new BABYLON.Vector3(0,5,-5), scene);

    engine.runRenderLoop(function () {
        scene.render();
    });
}

/**
 * Initialize the game
 */
function initGame() {
    var gravity = new BABYLON.Vector3(0, -9.81, 0);

    // lights
    //var light0 = new BABYLON.HemisphericLight('light0', new BABYLON.Vector3(0,1,0), scene);
    var light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(2,2,15), scene);

    // scene
    scene.enablePhysics(gravity, new BABYLON.OimoJSPlugin());
    scene.gravity = gravity;
    scene.workerCollisions = true;
    scene.collisionsEnabled = true;

    // ground
    var ground = BABYLON.Mesh.CreateGround("ground", 16.7, 50, 20, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(0.3, 0.2, 0.7);
    ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(3.55, 2, 2);
    ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0, friction: 0.5, restitution: 0.7});

    ground.updatePhysicsBodyPosition();

    // walls
    var wall1 = BABYLON.Mesh.CreateGround("wall1", 10, 50, 1, scene);
    wall1.material = new BABYLON.StandardMaterial("groundMat", scene);
    wall1.material.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
    wall1.material.backFaceCulling = false;
    wall1.position = new BABYLON.Vector3(12,7,3);
    wall1.rotate(BABYLON.Axis.Z, 3.14/2, BABYLON.Space.LOCAL);
    wall1.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0, friction: 0.5, restitution: 0.7});

    var wall2 = BABYLON.Mesh.CreateGround("wall2", 10, 50, 1, scene);
    wall2.material = new BABYLON.StandardMaterial("groundMat", scene);
    wall2.material.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
    wall2.material.backFaceCulling = false;
    wall2.position = new BABYLON.Vector3(-5,7,5);
    wall2.rotate(BABYLON.Axis.Z, 3.14/2, BABYLON.Space.LOCAL);
    wall2.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0, friction: 0.5, restitution: 0.7});

    var wall3 = BABYLON.Mesh.CreateGround("wall3", 20, 17, 1, scene);
    wall3.material = new BABYLON.StandardMaterial("groundMat", scene);
    wall3.material.alpha = 0;
    wall3.position = new BABYLON.Vector3(4,10,-20);
    wall3.rotate(BABYLON.Axis.X, 3.14/2, BABYLON.Space.LOCAL);
    wall3.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0, friction: 0.5, restitution: 0.7});

    var wall4 = BABYLON.Mesh.CreateGround("wall3", 20, 17, 1, scene);
    wall4.material = new BABYLON.StandardMaterial("groundMat", scene);
    wall4.material.alpha = 0;
    wall4.position = new BABYLON.Vector3(4,10,20);
    wall4.rotate(BABYLON.Axis.X, 3.14/2, BABYLON.Space.LOCAL);
    wall4.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 0, friction: 0.5, restitution: 0.7});

//    mouseEvents(canvas);


    var sphere = new DragSphere(1, 5, 1), tmp;

    for (var i = 0; i < 40; i++)
         tmp = new DragSphere(Math.random()*10+1, Math.random()*10+4, Math.floor(Math.random() * 20) + 1 );




    ground.checkCollisions = true;
}

