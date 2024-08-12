class HelloWorldExtension {
    getInfo() {
        return {
            id: 'game',
            name: '游戏!',
            blocks: [
                {
                    opcode: 'gamestart',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '开始游戏',
                },
            ],
        };
    }

    async gamestart() {
        // 创建新画布并替换旧画布
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

        console.log('新画布元素已创建，旧画布已被移除。');

        try {
            // 异步加载 Babylon.js 和 Cannon.js 脚本
            const babylonResponse = await fetch('https://cdn.babylonjs.com/babylon.js');
            const babylonScript = await babylonResponse.text();
            eval(babylonScript);

            const cannonResponse = await fetch('https://cdn.babylonjs.com/cannon.js');
            const cannonScript = await cannonResponse.text();
            eval(cannonScript);

            // 初始化 Babylon.js 引擎和场景
            const canvas = document.getElementById("renderCanvas");
            const engine = new BABYLON.Engine(canvas, true);

            const createScene = function () {
                const scene = new BABYLON.Scene(engine);

                // 启用物理引擎
                scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());

                // 添加相机
                const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -20), scene);
                camera.setTarget(BABYLON.Vector3.Zero());
                camera.attachControl(canvas, true);

                camera.keysUp.push(87); // W 键
                camera.keysDown.push(83); // S 键
                camera.keysLeft.push(65); // A 键
                camera.keysRight.push(68); // D 键

                // 添加光源
                const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
                light.intensity = 0.7;

                // 添加球体
                const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
                sphere.position.x = -5;

                // 添加地面
                const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
                ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

                // 添加方块
                const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
                box.position.y = 10;
                box.position.x = 5;

                // 存储方块的初始位置
                const originalPosition = box.position.clone();

                // 为方块添加物理属性
                box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);

                // 定义一个函数将方块移回原始位置
                function returnBoxToOriginalPosition() {
                    box.position = originalPosition.clone();
                    box.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero());
                    box.physicsImpostor.setAngularVelocity(BABYLON.Vector3.Zero());
                }

                // 每7秒将方块移回原始位置
                setInterval(returnBoxToOriginalPosition, 7000);

                // 添加圆环
                const torus = BABYLON.MeshBuilder.CreateTorus("torus", { diameter: 3, thickness: 1 }, scene);
                torus.position.y = 3;
                torus.position.x = -10;

                // 为圆环添加纹理
                const texture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/torus_texture.jpg", scene);
                const torusMaterial = new BABYLON.StandardMaterial("torusMaterial", scene);
                torusMaterial.diffuseTexture = texture;
                torus.material = torusMaterial;

                // 添加透明反射球体
                const reflectiveSphere = BABYLON.MeshBuilder.CreateSphere("reflectiveSphere", { diameter: 2 }, scene);
                reflectiveSphere.position.y = 1;
                reflectiveSphere.position.x = 10;

                // 创建反射纹理
                const reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true);
                reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, -1.0);

                // 创建反射球体的材质
                const reflectiveMaterial = new BABYLON.StandardMaterial("reflectiveMaterial", scene);
                reflectiveMaterial.reflectionTexture = reflectionTexture;
                reflectiveMaterial.reflectionTexture.level = 0.5; // 调整反射强度
                reflectiveMaterial.alpha = 0.5; // 调整透明度

                reflectiveSphere.material = reflectiveMaterial;

                // 将地面和其他物体添加到反射纹理的渲染列表中
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

        } catch (error) {
            console.error('加载 Babylon.js 时发生错误:', error);
        }
    }
}

Scratch.extensions.register(new HelloWorldExtension());
