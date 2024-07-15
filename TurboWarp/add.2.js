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
        newCanvas.width = 510;
        newCanvas.height = 382;
        newCanvas.style.height = '306px';
        newCanvas.style.width = '408px';
        oldCanvas.parentNode.insertBefore(newCanvas, oldCanvas);
        oldCanvas.parentNode.removeChild(oldCanvas);

        console.log('New canvas element created at the same position.');

        fetch('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')
            .then(response => response.text())
            .then(text => {
                eval(text);

                let scene = new THREE.Scene();
                let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                let renderer = new THREE.WebGLRenderer({canvas: newCanvas});
                renderer.setSize(newCanvas.width, newCanvas.height);

                let geometry = new THREE.BoxGeometry(1, 1, 1);
                let material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
                let cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                let light = new THREE.PointLight(0xffffff, 1, 1000);
                light.position.set(0, 0, 10);
                scene.add(light);

                camera.position.z = 5;

                function animate() {
                    requestAnimationFrame(animate);
                    cube.rotation.x += 0.01;
                    cube.rotation.y += 0.01;
                    renderer.render(scene, camera);
                }

                animate();
            })
            .catch(error => console.error('Error:', error));
    }
}

Scratch.extensions.register(new HelloWorldExtension());
