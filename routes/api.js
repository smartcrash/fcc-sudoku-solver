'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

module.exports = function (app) {
  const solver = new SudokuSolver()

  app.route('/api/check').post((req, res) => {})

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
