const minimax = {
  calculateWinner: squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  },
  findBestMove: (board, compIsNextX) => {
    if (minimax.calculateWinner(board)) {
      return;
    }
    let bestMove = null;
    let bestVal = compIsNextX
      ? Number.MIN_SAFE_INTEGER
      : Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < board.length; i += 1) {
      // loop through board, find empty spots
      if (board[i] === null) {
        // move to the empty spot
        board[i] = compIsNextX ? 'X' : 'O';
        // calculate the value as a result of this move
        let val = minimax.minimax(board, 0, !compIsNextX);
        // undo move
        board[i] = null;
        // reset bestVal and bestMove if:
        if (compIsNextX && val > bestVal) {
          bestVal = val;
          bestMove = i;
        }
        if (!compIsNextX && val < bestVal) {
          bestVal = val;
          bestMove = i;
        }
      }
    }
    console.log('best move', bestMove);
    return bestMove;
  },

  minimax: (board, depth, compIsNext) => {
    // check the current score
    let score = minimax.evaluate(board);
    // X won or O won, return respective scores
    if (score === 100) return score - depth;
    if (score === -100) return score + depth;
    if (minimax.noMovesLeft(board)) return 0;
    // X is maximazer and X is computer
    if (compIsNext) {
      let best = Number.MIN_SAFE_INTEGER;
      for (let i = 0; i < board.length; i += 1) {
        // loop through board, find empty spots
        if (board[i] === null) {
          // move to the empty spot
          board[i] = 'X';
          // calculate the resulting value
          best = Math.max(best, minimax.minimax(board, depth + 1, !compIsNext));
          board[i] = null;
        }
      }
      return best;
    } else {
      let best = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < board.length; i += 1) {
        // loop through board, find empty spots
        if (board[i] === null) {
          // move to the empty spot
          board[i] = 'O';
          // calculate the resulting value
          best = Math.min(best, minimax.minimax(board, depth + 1, !compIsNext));
          board[i] = null;
        }
      }
      return best;
    }
  },

  evaluate: squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        if (squares[a] === 'X') return 100;
        return -100;
      }
    }
  },

  noMovesLeft: board => {
    let result = true;
    board.forEach(square => {
      if (square === null) {
        result = false;
      }
    });
    // console.log('no move left?', result);
    return result;
  }
};

export default minimax;
