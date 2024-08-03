

function isMovesLeft (board) {
  return board.includes(null)
}

function evaluate (board) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] === 'X' ? 10 : -10
    }
  }

  return 0
}

function minimax (board, depth, isMax) {
  let score = evaluate(board)

  if (score === 10) return score - depth
  if (score === -10) return score + depth
  if (!isMovesLeft(board)) return 0

  if (isMax) {
    let best = -1000
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'X'
        best = Math.max(best, minimax(board, depth + 1, !isMax))
        board[i] = null
      }
    }
    return best
  } else {
    let best = 1000
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'O'
        best = Math.min(best, minimax(board, depth + 1, !isMax))
        board[i] = null
      }
    }
    return best
  }
}

function findBestMove (board) {
  let bestVal = -1000
  let bestMove = -1

  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'X'
      let moveVal = minimax(board, 0, false)
      board[i] = null
      if (moveVal > bestVal) {
        bestMove = i
        bestVal = moveVal
      }
    }
  }
  return bestMove
}

module.exports = { findBestMove }
