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
	
    }
}

Scratch.extensions.register(new HelloWorldExtension());