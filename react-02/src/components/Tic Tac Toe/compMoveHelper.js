const compMove = {
  checkBoard: (squares, stepNumber, compIsNext) => {
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
    let ran = Math.random();
    const occupiedOwnIndex = [];
    const occupiedOppIndex = [];
    let occupiedOwnSign;
    let occupiedOppSign;
    squares.forEach((s, index) => {
      if (compIsNext && s === 'X') {
        occupiedOwnIndex.push(index);
        occupiedOwnSign = 'X';
      } else if (compIsNext && s === 'O') {
        occupiedOppIndex.push(index);
        occupiedOppSign = 'O';
      } else if (!compIsNext && s === 'X') {
        occupiedOppIndex.push(index);
        occupiedOppSign = 'X';
      } else if (!compIsNext && s === 'O') {
        occupiedOwnIndex.push(index);
        occupiedOwnSign = 'O';
      }
    });
    const occupied = occupiedOwnIndex.concat(occupiedOppIndex);
    // empty board
    if (stepNumber === 0) {
      // center - 40% chance, corners - 15% chance each
      if (ran > 0.6) squares[4] = compIsNext ? 'X' : 'O';
      else if (ran < 0.15) squares[0] = compIsNext ? 'X' : 'O';
      else if (ran < 0.25) squares[2] = compIsNext ? 'X' : 'O';
      else if (ran < 0.35) squares[6] = compIsNext ? 'X' : 'O';
      else squares[8] = compIsNext ? 'X' : 'O';
      return squares;
    }

    let winOrBlock = false;
    lines.forEach((line, lidx) => {
      let [a, b, c] = line;
      // winning
      if (
        occupiedOwnIndex.includes(a) &&
        occupiedOwnIndex.includes(b) &&
        !occupiedOppIndex.includes(c)
      ) {
        squares[c] = occupiedOwnSign;
        winOrBlock = true;
      } else if (
        occupiedOwnIndex.includes(c) &&
        occupiedOwnIndex.includes(b) &&
        !occupiedOppIndex.includes(a)
      ) {
        squares[a] = occupiedOwnSign;
        winOrBlock = true;
      } else if (
        occupiedOwnIndex.includes(c) &&
        occupiedOwnIndex.includes(a) &&
        !occupiedOppIndex.includes(b)
      ) {
        squares[b] = occupiedOwnSign;
        winOrBlock = true;
      }
      // block-two
      else if (
        occupiedOppIndex.includes(c) &&
        occupiedOppIndex.includes(b) &&
        !occupiedOwnIndex.includes(a)
      ) {
        squares[a] = occupiedOwnSign;
        winOrBlock = true;
      } else if (
        occupiedOppIndex.includes(c) &&
        occupiedOppIndex.includes(a) &&
        !occupiedOwnIndex.includes(b)
      ) {
        squares[b] = occupiedOwnSign;
        winOrBlock = true;
      } else if (
        occupiedOppIndex.includes(b) &&
        occupiedOppIndex.includes(a) &&
        !occupiedOwnIndex.includes(c)
      ) {
        squares[c] = occupiedOwnSign;
        winOrBlock = true;
      }
    });
    if (winOrBlock) {
      return squares;
    }

    // fork
    let fork = compMove.fork(
      lines,
      squares,
      occupiedOwnIndex,
      occupied,
      occupiedOwnSign
    );
    if (fork) return squares;
    // block fork
    let blockFork = compMove.fork(
      lines,
      squares,
      occupiedOppIndex,
      occupied,
      occupiedOwnSign
    );
    if (blockFork) return squares;

    // make two to force defense

    return squares;
  },

  blockFork: (lines, squares, humanSquare, occupied, sign) => {
    let pairs = [];
    for (let i = 0; i < humanSquare.length; i++) {
      //for each human occupied squares,
      //get the squares on the board that aren't on the lines with that square
      // e.g. square 0 --> returns square 5 and 7
      let contained = [];
      lines.forEach(line => {
        contained.concat(line.includes(humanSquare[i]) ? line : []);
      });
      let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => {
        return !contained.includes(num);
      });
      // check if those squares are filled by human
      let filled = nums.filter(i => humanSquare.includes(i));
      // if not filled, no need to block
      if (filled.length === 0) continue;
      filled.forEach(n => {
        pairs.push([i, n]);
      });
    }
    // if no pairs exist, no fork, return
    if (pairs.length === 0) return null;
    // check if the possible fork spot is blocked by comp already
    let forkSpots = [];
    let lines1 = [],
      lines2 = [];
    pairs.forEach(pair => {
      lines.forEach(line => {
        lines1.concat(line.includes(humanSquare[pair[0]]) ? line : []);
        lines2.concat(line.includes(humanSquare[pair[1]]) ? line : []);
      });
    });
    for (let j = 0; j < lines1.length; j += 1) {
      //check if comp has blocked
      if (lines2.includes(lines1[j] && !occupied.includes(lines1[j]))) {
        forkSpots.push(lines1[j]);
      }
    }
    // all fork spots blocked
    if (forkSpots.length === 0) return null;
    let ran = Math.floor(Math.random() * forkSpots.length);
    squares[forkSpots[ran]] = sign;
    return squares;
  },

  fork: (lines, squares, compSquares, occupied, sign) => {
    let pairs = [];
    for (let i = 0; i < compSquares.length; i++) {
      //for each computer occupied squares,
      //get the squares on the board that aren't on the lines with that square
      // e.g. square 0 --> returns square 5 and 7
      let contained = [];
      lines.forEach(line => {
        contained.concat(line.includes(compSquares[i]) ? line : []);
      });
      let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => {
        return !contained.includes(num);
      });
      // check if those squares are filled by comp
      let filled = nums.filter(i => compSquares.includes(i));
      // if not filled, no possible fork
      if (filled.length === 0) continue;
      filled.forEach(n => {
        pairs.push([i, n]);
      });
    }
    // if no pairs exist, no fork, return
    if (pairs.length === 0) return null;
    // check if the possible fork spot is blocked by opponent
    let forkSpots = [];
    let lines1 = [],
      lines2 = [];
    pairs.forEach(pair => {
      lines.forEach(line => {
        lines1.concat(line.includes(compSquares[pair[0]]) ? line : []);
        lines2.concat(line.includes(compSquares[pair[1]]) ? line : []);
      });
    });
    for (let j = 0; j < lines1.length; j += 1) {
      //check if opponent has occupied
      if (lines2.includes(lines1[j] && !occupied.includes(lines1[j]))) {
        forkSpots.push(lines1[j]);
      }
    }
    // all fork spots blocked
    if (forkSpots.length === 0) return null;
    let ran = Math.floor(Math.random() * forkSpots.length);
    squares[forkSpots[ran]] = sign;
    return squares;
  }
};

export default compMove;
