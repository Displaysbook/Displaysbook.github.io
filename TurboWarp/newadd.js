class HelloWorldExtension {
    getInfo() {
        return {
            id: 'game',
            name: 'game!',
            blocks: [
                {
                    opcode: 'gamestart',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'gamestart',
                },
            ],
        };
    }

    gamestart() {
        let oldCanvas = document.getElementsByTagName('canvas')[0];
        let newCanvas = document.createElement('canvas');
        newCanvas.id = 'renderCanvas';
        newCanvas.style.position = 'absolute';
        newCanvas.style.top = '0';
        newCanvas.style.left = '0';
        newCanvas.style.width = '100%';
        newCanvas.style.height = '100%';
        newCanvas.style.touchAction = 'none';
        oldCanvas.parentNode.insertBefore(newCanvas, oldCanvas);
        oldCanvas.parentNode.removeChild(oldCanvas);

        console.log('New canvas element created at the same position.');

        fetch('https://cdn.babylonjs.com/babylon.js')
            .then(response => response.text())
            .then(text => {
                eval(text);

                const canvas = document.getElementById("renderCanvas");
                const engine = new BABYLON.Engine(canvas, true);

                const createScene = function () {
                    const scene = new BABYLON.Scene(engine);

                    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -20), scene);
                    camera.setTarget(BABYLON.Vector3.Zero());
                    camera.attachControl(canvas, true);

                    camera.keysUp.push(87); // W key
                    camera.keysDown.push(83); // S key
                    camera.keysLeft.push(65); // A key
                    camera.keysRight.push(68); // D key

                    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
                    light.intensity = 0.7;

                    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
                    sphere.position.x = -5;

                    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);

                    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
                    box.position.y = 1;
                    box.position.x = 5;

                    const torus = BABYLON.MeshBuilder.CreateTorus("torus", { diameter: 3, thickness: 1 }, scene);
                    torus.position.y = 3;
                    torus.position.x = -10;

                    const reflectiveSphere = BABYLON.MeshBuilder.CreateSphere("reflectiveSphere", { diameter: 2 }, scene);
                    reflectiveSphere.position.y = 1;
                    reflectiveSphere.position.x = 10;

                    const reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
                    reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, -1.0);

                    const reflectiveMaterial = new BABYLON.StandardMaterial("reflectiveMaterial", scene);
                    reflectiveMaterial.reflectionTexture = reflectionTexture;
                    reflectiveMaterial.reflectionTexture.level = 0.5;
                    reflectiveMaterial.alpha = 0.5;

                    reflectiveSphere.material = reflectiveMaterial;

                    reflectionTexture.renderList.push(ground);
                    reflectionTexture.renderList.push(sphere);
                    reflectionTexture.renderList.push(box);
                    reflectionTexture.renderList.push(torus);

                    return scene;
                };

                const scene = createScene();

                engine.runRenderLoop(function () {
                    scene.render();
                });

                window.addEventListener("resize", function () {
                    engine.resize();
                });
            })
            .catch(error => console.error('Error:', error));
    }
}

Scratch.extensions.register(new HelloWorldExtension());
