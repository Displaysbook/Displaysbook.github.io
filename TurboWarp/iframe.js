class ReplaceCanvasWithIframe {
    getInfo() {
        return {
            id: 'replaceCanvasWithIframe',
            name: 'Replace Canvas with Iframe',
            blocks: [
                {
                    opcode: 'replaceCanvas',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'replace canvas with iframe [URL]',
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'https://www.ccw.site/'
                        }
                    }
                }
            ]
        };
    }

    replaceCanvas({ URL }) {
        // 查找现有的 <iframe> 元素
        const existingIframe = document.querySelector('iframe');
        if (existingIframe) {
            // 如果找到 iframe 元素，更新其 src 属性为用户指定的 URL
            existingIframe.src = URL;
        } else {
            // 如果没有找到 iframe 元素，尝试找到 <canvas> 元素
            const canvas = document.querySelector('canvas');
            if (canvas) {
                // 创建新的 <iframe> 元素
                const newIframe = document.createElement('iframe');
                newIframe.src = URL;
                newIframe.style.border = 'none';
                newIframe.style.position = 'absolute';
                newIframe.style.top = '0';
                newIframe.style.left = '0';

                // 获取 <canvas> 的父节点
                const parent = canvas.parentNode;
                if (parent) {
                    // 设置 <iframe> 的宽度和高度以适应父节点
                    newIframe.style.width = '100%';
                    newIframe.style.height = '100%';

                    // 用新的 <iframe> 替换 <canvas>
                    parent.replaceChild(newIframe, canvas);
                } else {
                    console.error('Canvas has no parent node!');
                }
            } else {
                console.warn('未找到目标元素进行替换。');
            }
        }

        // 添加窗口大小变化的事件监听器
        window.addEventListener('resize', function() {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                const parent = iframe.parentNode;
                if (parent) {
                    iframe.style.width = `${parent.offsetWidth}px`;
                    iframe.style.height = `${parent.offsetHeight}px`;
                }
            });
        });

        // 确保 body 和 html 元素的高度为 100%
        document.body.style.height = '100%';
        document.documentElement.style.height = '100%';
    }
}

Scratch.extensions.register(new ReplaceCanvasWithIframe());
