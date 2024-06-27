const canvas = document.getElementById('gomoku');
const context = canvas.getContext('2d');
const statusDiv = document.getElementById('status');
const gridSize = 40;
const boardSize = 15;
const board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
let currentMode = null;
let isPlayerTurn = true;
let moveHistory = [];
let potentialMoves = new Set();

function addPotentialMoves(x, y) {
    const directions = [
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: -1 },
        { dx: -1, dy: 1 }
    ];

    directions.forEach(({ dx, dy }) => {
        for (let i = -1; i <= 1; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[ny][nx] === 0) {
                potentialMoves.add(`${nx},${ny}`);
            }
        }
    });
}

function startGame(mode) {
    currentMode = mode;
    resetBoard();
    drawBoard();
    statusDiv.textContent = mode === 'twoPlayers' ? '玩家 1 的回合' : '玩家的回合';
    canvas.style.display = 'block';
    canvas.addEventListener('click', handleMove);
}

function resetBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = 0;
        }
    }
     potentialMoves.clear(); 
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            context.strokeRect(i * gridSize, j * gridSize, gridSize, gridSize);
        }
    }
}

function handleMove(event) {
    const x = Math.floor(event.offsetX / gridSize);
    const y = Math.floor(event.offsetY / gridSize);
    if (board[y][x] !== 0) return;
    
    if (currentMode === 'twoPlayers') {
        handleTwoPlayerMove(x, y);
    } else if (currentMode === 'vsComputer') {
        handlePlayerMove(x, y);
    }
}

function handleTwoPlayerMove(x, y) {
    const player = isPlayerTurn ? 1 : 2;
    board[y][x] = player;
    moveHistory.push({ x, y, player });
    drawPiece(x, y, isPlayerTurn ? 'black' : 'white');
    addPotentialMoves(x, y);
    if (checkWin(x, y, player)) {
        statusDiv.textContent = `玩家 ${player} 获胜！`;
        canvas.removeEventListener('click', handleMove);
        return;
    }
    isPlayerTurn = !isPlayerTurn;
    statusDiv.textContent = `玩家 ${isPlayerTurn ? 1 : 2} 的回合`;
}

function handlePlayerMove(x, y) {
    if (!isPlayerTurn) return;
    board[y][x] = 1;
    moveHistory.push({ x, y, player: 1 });
    drawPiece(x, y, 'black');
    addPotentialMoves(x, y);
    if (checkWin(x, y, 1)) {
        statusDiv.textContent = '玩家获胜！';
        canvas.removeEventListener('click', handleMove);
        return;
    }
    isPlayerTurn = false;
    statusDiv.textContent = '电脑的回合';
    setTimeout(handleComputerMove, 500);
}
function evaluateBoard() {
    let score = 0;

    // 定义一个函数来计算连续的棋子数量
    function countContinuousPieces(x, y, dx, dy, player) {
        let count = 0;
        while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[y][x] === player) {
            count++;
            x += dx;
            y += dy;
        }
        return count;
    }

    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            if (board[y][x] !== 0) {
                const player = board[y][x];

                // 检查四个方向的棋子
                const directions = [
                    { dx: 1, dy: 0 },
                    { dx: 0, dy: 1 },
                    { dx: 1, dy: 1 },
                    { dx: 1, dy: -1 }
                ];

                for (const { dx, dy } of directions) {
                    const count = countContinuousPieces(x, y, dx, dy, player);
                    if (count >= 5) {
                        score += (player === 1 ? 1000000 : -1000000);  // 高分奖励胜利
                    } else {
                        score += (player === 1 ? count * 10 : -count * 10);  // 根据连续棋子的数量评分
                    }
                }
            }
        }
    }
    return score;
}
function minimax(depth, alpha, beta, isMaximizingPlayer) {
    const score = evaluateBoard();
    if (Math.abs(score) === 1000000 || depth === 0) {
        return score;
    }

    if (isMaximizingPlayer) {
        let maxEval = -Infinity;
        for (const move of potentialMoves) {
            const [x, y] = move.split(',').map(Number);
            if (board[y][x] === 0) {
                board[y][x] = 1;
                const eval = minimax(depth - 1, alpha, beta, false);
                board[y][x] = 0;
                maxEval = Math.max(maxEval, eval);
                alpha = Math.max(alpha, eval);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of potentialMoves) {
            const [x, y] = move.split(',').map(Number);
            if (board[y][x] === 0) {
                board[y][x] = 2;
                const eval = minimax(depth - 1, alpha, beta, true);
                board[y][x] = 0;
                minEval = Math.min(minEval, eval);
                beta = Math.min(beta, eval);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return minEval;
    }
}
function findBestMove() {
    let bestMove = null;
    let bestValue = -Infinity;
    for (const move of potentialMoves) {
        const [x, y] = move.split(',').map(Number);
        if (board[y][x] === 0) {
            board[y][x] = 1;
            const moveValue = minimax(3, -Infinity, Infinity, false);  // 3 是搜索深度，可以调整
            board[y][x] = 0;
            if (moveValue > bestValue) {
                bestValue = moveValue;
                bestMove = { x, y };
            }
        }
    }
    return bestMove;
}

function handleComputerMove() {
    const bestMove = findBestMove();
    if (bestMove) {
        const { x, y } = bestMove;
        board[y][x] = 2;
        moveHistory.push({ x, y, player: 2 });
        drawPiece(x, y, 'white');
        if (checkWin(x, y, 2)) {
            statusDiv.textContent = '电脑获胜！';
            canvas.removeEventListener('click', handleMove);
            return;
        }
        isPlayerTurn = true;
        statusDiv.textContent = '玩家的回合';
    }
}

function drawPiece(x, y, color) {
    context.beginPath();
    context.arc(x * gridSize + gridSize / 2, y * gridSize + gridSize / 2, gridSize / 2.5, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    context.stroke();
}


function checkWin(x, y, player) {
    const directions = [
        { x: 1, y: 0 }, 
        { x: 0, y: 1 }, 
        { x: 1, y: 1 },  
        { x: 1, y: -1 }  
    ];
    for (const { x: dx, y: dy } of directions) {
        let count = 1;
        for (let step = 1; step < 5; step++) {
            const nx = x + step * dx;
            const ny = y + step * dy;
            if (nx < 0 || nx >= boardSize || ny < 0 || ny >= boardSize || board[ny][nx] !== player) break;
            count++;
        }
        for (let step = 1; step < 5; step++) {
            const nx = x - step * dx;
            const ny = y - step * dy;
            if (nx < 0 || nx >= boardSize || ny < 0 || ny >= boardSize || board[ny][nx] !== player) break;
            count++;
        }
        if (count >= 5) return true;
    }
    return false;
}

drawBoard();
