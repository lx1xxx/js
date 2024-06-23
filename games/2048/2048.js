document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.cell');
    let score = 0;
    let total_numbers = 0;

    // 初始化游戏板
    function createBoard() {
        generate();
        generate();
    }

    // 生成一个数字
    function generate() {
        if (total_numbers >= 16) return;
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == "") {
            squares[randomNumber].innerHTML = 2;
            squares[randomNumber].classList.add('number-2', 'animate');
            total_numbers++;
        } else generate();
    }

    function moveLeft() {
        for (let i = 0; i < 4; i++) {
            let row = [];
            let newrow = [];
            for (let j = 0; j < 4; j++) {
                if (squares[i * 4 + j].innerHTML != "") {
                    row.push(squares[i * 4 + j].innerHTML);
                }
            }
            while (row.length > 0) {
                if (row[0] === row[1] && row[0] <= 2048) {
                    let sum = parseInt(row[0]) + parseInt(row[1]);
                    score += sum;
                    row.shift();
                    row.shift();
                    newrow.push(sum);
                    total_numbers--;
                } else {
                    newrow.push(row.shift());
                }
            }
            for (let j = 0; j < 4; j++) {
                squares[i * 4 + j].classList.remove('number-2', 'number-4', 'number-8', 'number-16', 'number-32', 'number-64', 'number-128', 'number-256', 'number-512', 'number-1024', 'number-2048', 'animate');
                if (j < newrow.length) {
                    squares[i * 4 + j].innerHTML = newrow[j];
                    squares[i * 4 + j].classList.add('number-' + newrow[j], 'animate');
                } else {
                    squares[i * 4 + j].innerHTML = "";
                }
            }
        }
        generate();
    }

    function moveRight() {
        for (let i = 0; i < 4; i++) {
            let row = [];
            let newrow = [];
            for (let j = 3; j >= 0; j--) {
                if (squares[i * 4 + j].innerHTML != "") {
                    row.push(squares[i * 4 + j].innerHTML);
                }
            }
            while (row.length > 0) {
                if (row[0] === row[1] && row[0] <= 2048) {
                    let sum = parseInt(row[0]) + parseInt(row[1]);
                    score += sum;
                    row.shift();
                    row.shift();
                    newrow.push(sum);
                    total_numbers--;
                } else {
                    newrow.push(row.shift());
                }
            }
            for (let j = 3; j >= 0; j--) {
                squares[i * 4 + j].classList.remove('number-2', 'number-4', 'number-8', 'number-16', 'number-32', 'number-64', 'number-128', 'number-256', 'number-512', 'number-1024', 'number-2048', 'animate');
                if (j >= 4 - newrow.length) {
                    squares[i * 4 + j].innerHTML = newrow[3 - j];
                    squares[i * 4 + j].classList.add('number-' + newrow[3 - j], 'animate');
                } else {
                    squares[i * 4 + j].innerHTML = "";
                }
            }
        }
        generate();
    }

    function moveUp() {
        for (let j = 0; j < 4; j++) {
            let column = [];
            let newcolumn = [];
            for (let i = 0; i < 4; i++) {
                if (squares[i * 4 + j].innerHTML != "") {
                    column.push(squares[i * 4 + j].innerHTML);
                }
            }
            while (column.length > 0) {
                if (column[0] === column[1] && column[0] <= 2048) {
                    let sum = parseInt(column[0]) + parseInt(column[1]);
                    score += sum;
                    column.shift();
                    column.shift();
                    newcolumn.push(sum);
                    total_numbers--;
                } else {
                    newcolumn.push(column.shift());
                }
            }
            for (let i = 0; i < 4; i++) {
                squares[i * 4 + j].classList.remove('number-2', 'number-4', 'number-8', 'number-16', 'number-32', 'number-64', 'number-128', 'number-256', 'number-512', 'number-1024', 'number-2048', 'animate');
                if (i < newcolumn.length) {
                    squares[i * 4 + j].innerHTML = newcolumn[i];
                    squares[i * 4 + j].classList.add('number-' + newcolumn[i], 'animate');
                } else {
                    squares[i * 4 + j].innerHTML = "";
                }
            }
        }
        generate();
    }

    function moveDown() {
        for (let j = 0; j < 4; j++) {
            let column = [];
            let newcolumn = [];
            for (let i = 3; i >= 0; i--) {
                if (squares[i * 4 + j].innerHTML != "") {
                    column.push(squares[i * 4 + j].innerHTML);
                }
            }
            while (column.length > 0) {
                if (column[0] === column[1] && column[0] <= 2048) {
                    let sum = parseInt(column[0]) + parseInt(column[1]);
                    score += sum;
                    column.shift();
                    column.shift();
                    newcolumn.push(sum);
                    total_numbers--;
                } else {
                    newcolumn.push(column.shift());
                }
            }
            for (let i = 3; i >= 0; i--) {
                squares[i * 4 + j].classList.remove('number-2', 'number-4', 'number-8', 'number-16', 'number-32', 'number-64', 'number-128', 'number-256', 'number-512', 'number-1024', 'number-2048', 'animate');
                if (i >= 4 - newcolumn.length) {
                    squares[i * 4 + j].innerHTML = newcolumn[3 - i];
                    squares[i * 4 + j].classList.add('number-' + newcolumn[3 - i], 'animate');
                } else {
                    squares[i * 4 + j].innerHTML = "";
                }
            }
        }
        generate();
    }

    // 绑定键盘操作
    function control(e) {
        if (e.keyCode === 39) {
            moveRight();
        }
        if (e.keyCode === 37) {
            moveLeft();
        }
        if (e.keyCode === 38) {
            moveUp();
        }
        if (e.keyCode === 40) {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    createBoard();
});