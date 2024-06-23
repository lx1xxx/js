document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('#game-board');
    const squares = document.querySelectorAll('.cell');
    let score = 0;

    // 初始化游戏板
    function createBoard() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].innerHTML = 0;
        }
        generate();
        generate();
    }

    // 生成一个数字
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == "0") {
            squares[randomNumber].innerHTML = 2;
        } else generate();
    }

    // 移动数字
    function moveRight() {
        // 你的移动逻辑
    }

    // 绑定键盘操作
    function control(e) {
        if(e.keyCode === 39) {
            moveRight();
        }
        // 添加其他方向的控制
    }
    document.addEventListener('keyup', control);

    createBoard();
});