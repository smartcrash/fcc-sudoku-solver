class SudokuSolver {
  /**
   * Take a given puzzle string and check it to see if it has 81 valid characters for the input.
   */
  validate(puzzleString) {
    if (typeof puzzleString !== 'string') return false
    if (puzzleString.length !== 81) return false
    if (puzzleString.replace(/[1-9.]/g, '').length) return false // Has invalid characters

    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  /**
   * Handle solving any given valid puzzle string
   */
  solve(puzzleString) {}
}

module.exports = SudokuSolver
