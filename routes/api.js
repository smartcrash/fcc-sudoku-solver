'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

/**
 * Expect a string where is the letter A-I indicating the row, followed by a number 1-9 indicating the column
 * @param {string} string
 * @returns [number, number]
 */
const stringToXY = string => {
  const [firstLetter, secondLetter] = string.split('')
  const x = Number.parseInt(secondLetter) - 1
  const y = firstLetter.toLocaleLowerCase().charCodeAt(0) - 97

  return [x, y]
}

module.exports = function (app) {
  const solver = new SudokuSolver()

  app.route('/api/check').post((req, res) => {
    const { puzzle, coordinate, value } = req.body
    const conflict = []

    const [column, row] = stringToXY(coordinate)

    if (!solver.checkRowPlacement(puzzle, row, column, value)) {
      conflict.push('row')
    }

    if (!solver.checkColPlacement(puzzle, row, column, value)) {
      conflict.push('column')
    }

    if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
      conflict.push('region')
    }

    res.json({
      valid: !conflict.length,
      conflict,
    })
  })

  app.route('/api/solve').post((req, res) => {
    const { puzzle } = req.body

    if (!puzzle) {
      return res.json({ error: 'Required field missing' })
    }

    try {
      const solution = solver.solve(puzzle)

      res.json({ solution })
    } catch (error) {
      res.json({ error: error.message })
    }
  })
}
