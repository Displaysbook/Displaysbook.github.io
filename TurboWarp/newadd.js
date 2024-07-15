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
        // 假设你要替换的 canvas 元素是页面上的第一个 canvas 元素
let oldCanvas = document.getElementsByTagName('canvas')[0];

// 创建新的 canvas 元素
let newCanvas = document.createElement('canvas');
newCanvas.width = 510;
newCanvas.height = 382;
newCanvas.style.height = '306px';
newCanvas.style.width = '408px';

// 在旧的 canvas 元素的位置插入新的 canvas 元素
oldCanvas.parentNode.insertBefore(newCanvas, oldCanvas);

// 删除旧的 canvas 元素
oldCanvas.parentNode.removeChild(oldCanvas);

console.log('New canvas element created at the same position.');



Scratch.extensions.register(new HelloWorldExtension());