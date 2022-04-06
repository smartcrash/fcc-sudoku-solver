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

  /**
   * If the given value is already in the same 3x3 square is not a valid placement
   *
   * @param {string} puzzleString
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
   */
  solve(puzzleString) {
    const validationError = this.validate(puzzleString)

    if (validationError) {
      throw new Error(validationError)
    }
  }
}

module.exports = SudokuSolver
