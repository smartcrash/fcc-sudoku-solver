const indexToXY = index => [Math.floor(index / 9), index % 9]
const xyToIndex = (x, y) => x * 9 + y

class SudokuSolver {
  /**
   * Take a given puzzle string and check it to see if it has 81 valid characters for the input.
   *
   * @param {string} puzzleString
   * @returns boolean
   */
  validate(puzzleString) {
    if (typeof puzzleString !== 'string') return false
    if (puzzleString.length !== 81) return false
    if (puzzleString.replace(/[1-9.]/g, '').length) return false // Has invalid characters

    return true
  }

  /**
   * Check if given value can be placed on the given row
   *
   * @param {string} puzzleString
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
   * @param {string} puzzleString
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

  checkRegionPlacement(puzzleString, row, column, value) {}

  /**
   * Handle solving any given valid puzzle string
   */
  solve(puzzleString) {}
}

module.exports = SudokuSolver
