'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

/**
 * Expect a string where is the letter A-I indicating the row, followed by a number 1-9 indicating the column
 * @param {string} string
 * @returns [number | null, number | null, string | null]
 */
const stringToXY = string => {
  if (string.length !== 2) {
    return [null, null, 'Invalid coordinate']
  }

  const [firstLetter, secondLetter] = string.split('')
  const x = Number.parseInt(secondLetter) - 1
  const y = firstLetter.toLocaleLowerCase().charCodeAt(0) - 97

  let error = null

  if (x >= 9 || y >= 9 || x < 0 || y < 0) error = 'Invalid coordinate'

  return [x, y, error]
}

module.exports = function (app) {
  const solver = new SudokuSolver()

  app.route('/api/check').post((req, res) => {
    const { puzzle, coordinate, value } = req.body
    const conflict = []

    if (!puzzle || !coordinate || !value) {
      return res.json({ error: 'Required field(s) missing' })
    }

    const validationError = solver.validate(puzzle)
    const [column, row, coordenatesError] = stringToXY(coordinate)
    const valueError = Number(value) > 9 || Number(value) < 0 ? 'Invalid value' : null
    const error = validationError || coordenatesError || valueError

    if (error) {
      return res.json({ error })
    }

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
