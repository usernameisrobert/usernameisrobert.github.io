const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // --- CAMERA SETUP ---
    // UniversalCamera supports WASD and Mouse look out of the box
    const camera = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(0, 2, -10), scene);
    
    // Target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach controls to the canvas
    camera.attachControl(canvas, true);

    // Map WASD keys to movement
    camera.keysUp.push(87);    // W
    camera.keysDown.push(83);  // S
    camera.keysLeft.push(65);  // A
    camera.keysRight.push(68); // D

    // --- ENVIRONMENT ---
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // A ground plane so you can see movement
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 20}, scene);
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    ground.material = groundMat;

    // A box to give perspective
    const box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene);
    box.position.y = 1;

    // --- POINTER LOCK ---
    // Request pointer lock when the user clicks the canvas
    canvas.addEventListener("click", () => {
        canvas.requestPointerLock = canvas.requestPointerLock || 
                                   canvas.msRequestPointerLock || 
                                   canvas.mozRequestPointerLock || 
                                   canvas.webkitRequestPointerLock;
        if (canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }
    });

    return scene;
};

const scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
