<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Babylon.js Example</title>
    <style>
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            overflow: hidden;
        }
        #renderCanvas {
            width: 100%;
            height: 100%;
            touch-action: none;
        }
    </style>
</head>
<body>
    <canvas id="renderCanvas"></canvas>
    <script src="https://cdn.babylonjs.com/babylon.js"></script>
    <script>
        // Get the canvas element
        const canvas = document.getElementById("renderCanvas");

        // Create Babylon engine
        const engine = new BABYLON.Engine(canvas, true);

        // Create scene
        const createScene = function () {
            const scene = new BABYLON.Scene(engine);

            // Add camera
            const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -20), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, true);

            // Enable camera movement with W, A, S, D keys
            camera.keysUp.push(87); // W key
            camera.keysDown.push(83); // S key
            camera.keysLeft.push(65); // A key
            camera.keysRight.push(68); // D key

            // Add light
            const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 0.7;

            // Add a sphere
            const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
            sphere.position.x = -5;

            // Add a ground plane
            const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);

            // Add a box
            const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
            box.position.y = 1;
            box.position.x = 5;

            // Add a torus
            const torus = BABYLON.MeshBuilder.CreateTorus("torus", { diameter: 3, thickness: 1 }, scene);
            torus.position.y = 3;
            torus.position.x = -10;

            // Add a transparent, reflective sphere
            const reflectiveSphere = BABYLON.MeshBuilder.CreateSphere("reflectiveSphere", { diameter: 2 }, scene);
            reflectiveSphere.position.y = 1;
            reflectiveSphere.position.x = 10;

            // Create a reflection texture
            const reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
            reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, -1.0);

            // Create a material for the reflective sphere
            const reflectiveMaterial = new BABYLON.StandardMaterial("reflectiveMaterial", scene);
            reflectiveMaterial.reflectionTexture = reflectionTexture;
            reflectiveMaterial.reflectionTexture.level = 0.5; // Adjust reflection intensity
            reflectiveMaterial.alpha = 0.5; // Adjust transparency

            reflectiveSphere.material = reflectiveMaterial;

            // Add the ground and other objects to the reflection texture render list
            reflectionTexture.renderList.push(ground);
            reflectionTexture.renderList.push(sphere);
            reflectionTexture.renderList.push(box);
            reflectionTexture.renderList.push(torus);

            return scene;
        };

        // Create scene
        const scene = createScene();

        // Run render loop
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Resize engine on window resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    </script>
</body>
</html>
