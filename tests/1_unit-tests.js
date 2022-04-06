const chai = require('chai')
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js')
const { assert } = chai

const Solver = require('../controllers/sudoku-solver.js')

suite('UnitTests', () => {
  test('Logic handles a valid puzzle string of 81 characters', () => {
    const solver = new Solver()
    const puzzleString = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'
    const isValid = solver.validate(puzzleString)

    assert.isTrue(isValid)
  })

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
    const solver = new Solver()
    const puzzleString = 'INVALID 1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....92'
    const isValid = solver.validate(puzzleString)

    assert.isFalse(isValid)
  })

  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    const solver = new Solver()
    const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.36'
    const isValid = solver.validate(puzzleString)

    assert.isFalse(isValid)
  })

  // TODO:
  //   test('Logic handles a valid row placement')
  //   test('Logic handles an invalid row placement')
  //   test('Logic handles a valid column placement')
  //   test('Logic handles an invalid column placement')
  //   test('Logic handles a valid region (3x3 grid) placement')
  //   test('Logic handles an invalid region (3x3 grid) placement')
  //   test('Valid puzzle strings pass the solver')
  //   test('Invalid puzzle strings fail the solver')
  //   test('Solver returns the expected solution for an incomplete puzzle')
})
