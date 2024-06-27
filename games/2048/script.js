let score = {
    inner_value: 0,
    get value() {
        return this.inner_value;
    },
    set value(value) {
        this.inner_value = value;
        document.getElementById('score').innerHTML = value;
    }
}
let total_numbers = 0;
let gameOver = false;
let squares;

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
                score.value += sum;
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
    check();
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
                score.value += sum;
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
    check();
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
                score.value += sum;
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
    check();
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
                score.value += sum;
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
    check();
}

// 绑定键盘操作
function control(e) {
    if (e.keyCode === 39 || e.keyCode === 68 || e.keyCode === 76) {
        moveRight();
    }
    if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 72) {
        moveLeft();
    }
    if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 75) {
        moveUp();
    }
    if (e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 74) {
        moveDown();
    }
}

function createBoard() {
    generate();
    generate();
}

document.addEventListener('DOMContentLoaded', () => {
    squares = document.querySelectorAll('.cell');
    // 初始化游戏板
    
    document.addEventListener('keyup', control);
    document.getElementById('restart-button').addEventListener('click', Init);
    createBoard();
});

function Init() {
    score.value = 0;
    total_numbers = 0;
    gameOver = false;
    squares.forEach(square => {
        square.innerHTML = "";
        square.classList.remove('number-2', 'number-4', 'number-8', 'number-16', 'number-32', 'number-64', 'number-128', 'number-256', 'number-512', 'number-1024', 'number-2048', 'animate');
    });
    createBoard();
}

function check() {
    if (total_numbers >= 16) {
        gameOver = true;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let current = squares[i * 4 + j].innerHTML;
                let right = j < 3 ? (squares[i * 4 + j + 1] ? squares[i * 4 + j + 1].innerHTML : null) : null;
                // i*4 + j + 1不一定是下一个格子，因为有可能j = 3
                let down = squares[i * 4 + j + 4] ? squares[i * 4 + j + 4].innerHTML : null;
                if (current === right || current === down) {
                    gameOver = false;
                    break;
                }
            }
        }
        if (gameOver) {
            alert('Game Over! Your score is ' + score.value);
        }
    }
}