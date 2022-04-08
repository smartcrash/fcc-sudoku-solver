const indexToXY = index => [Math.floor(index / 9), index % 9]
const xyToIndex = (x, y) => x * 9 + y

class SudokuSolver {
  /**
   * Take a given puzzle string and check it to see if it has 81 valid characters for the input.
   *
   * @param {string} puzzleString
   * @returns null | string
   */
  validate(puzzleString) {
    if (typeof puzzleString !== 'string') return 'Expected string, received:' + typeof puzzleString
    if (puzzleString.length !== 81) return 'Expected puzzle to be 81 characters long'
    if (puzzleString.replace(/[1-9.]/g, '').length) return 'Invalid characters in puzzle'

    return null
  }

  /**
   * Check if given value can be placed on the given row
   *
   * @param {string  | string[]} puzzleString
   * @param {number} row
   * @param {number} column
   * @param {number | string} value
   * @returns boolean
   */
  checkRowPlacement(puzzleString, row, _, value) {
    for (let column = 0; column < 9; ++column) {
      const index = xyToIndex(row, column)
      if (puzzleString[index] === value.toString()) return false
    }

    return true
  }

  /**
   * Check if given value can be placed on the given column
   *
   * @param {string | string[]} puzzleString
   * @param {number} row
   * @param {number} column
   * @param {number | string} value
   * @returns boolean
   */
  checkColPlacement(puzzleString, _, column, value) {
    for (let row = 0; row < 9; ++row) {
      const index = xyToIndex(row, column)
      if (puzzleString[index] === value.toString()) return false
    }

    return true
  }

  /**
   * If the given value is already in the same 3x3 square is not a valid placement
   *
   * @param {string | string[]} puzzleString
   * @param {number} row
   * @param {number} column
   * @param {number | string} value
   * @returns boolean
   */
  checkRegionPlacement(puzzleString, row, column, value) {
    const startX = row >= 6 ? 6 : row >= 3 ? 3 : 0
    const startY = column >= 6 ? 6 : column >= 3 ? 3 : 0

    for (let x = startX; x < startX + 3; ++x) {
      for (let y = startY; y < startY + 3; ++y) {
        const index = xyToIndex(x, y)
        if (puzzleString[index] === value.toString()) return false
      }
    }

    return true
  }

  /**
   * Handle solving any given valid puzzle string
   * @param {string} puzzleString
   */
  solve(puzzleString) {
    const validationError = this.validate(puzzleString)

    if (validationError) {
      throw new Error(validationError)
    }

    const puzzle = puzzleString.split('')

    this._solveSudoku(puzzle)

    return puzzle.join('')
  }

  /**
   * @param {string[]} puzzle
   * @returns {boolean}
   */
  _solveSudoku(puzzle) {
    const [index, moves] = this._bestMove(puzzle)

    if (index === null) return true // Is already solved!

    for (let move of moves) {
      puzzle[index] = move
      if (this._solveSudoku(puzzle)) return true
    }

    puzzle[index] = '.' // no digit fits here, backtrack!
    return false
  }

  /**
   * @param {string} puzzleString
   * @param {number} index
   * @returns string[]
   */
  _getMoves(puzzleString, index) {
    const moves = []
    const [row, column] = indexToXY(index)

    for (let n = 1; n <= 9; ++n) {
      if (
        this.checkColPlacement(puzzleString, row, column, n) &&
        this.checkRowPlacement(puzzleString, row, column, n) &&
        this.checkRegionPlacement(puzzleString, row, column, n)
      ) {
        moves.push(n.toString())
      }
    }

    return moves
  }

  /**
   * Retuns the index of the cell with the fewest posible moves
   * @param {string | string[]} puzzleString
   * @returns [number, string[]]
   */
  _bestMove(puzzleString) {
    let index = null
    let moves = []
    let best = Infinity

    for (let i = 0; i < puzzleString.length; ++i)
      if (puzzleString[i] === '.') {
        const m = this._getMoves(puzzleString, i)

        if (m.length < best) {
          best = m.length
          index = i
          moves = m

          if (best === 0) break
        }
      }

    return [index, moves]
  }
}

module.exports = SudokuSolver
