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

    assert.throws(() => solver.validate(puzzleString), Error, 'Invalid characters in puzzle')
  })

  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    const solver = new Solver()
    const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.36'

    assert.throws(() => solver.validate(puzzleString), Error, 'Expected puzzle to be 81 characters long')
  })

  test('Logic handles a valid row placement', () => {
    const solver = new Solver()
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const value = 7

    assert.isTrue(solver.checkRowPlacement(puzzleString, 0, 0, value))
  })

  test('Logic handles an invalid row placement', () => {
    const solver = new Solver()
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const value = 1

    assert.isFalse(solver.checkRowPlacement(puzzleString, 0, 0, value))
  })

  test('Logic handles a valid column placement', () => {
    const solver = new Solver()
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const value = 7

    assert.isTrue(solver.checkColPlacement(puzzleString, 0, 0, value))
  })

  test('Logic handles an invalid column placement', () => {
    const solver = new Solver()
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const value = 6

    assert.isFalse(solver.checkColPlacement(puzzleString, 0, 0, value))
  })

  test('Logic handles a valid region (3x3 grid) placement', () => {
    const solver = new Solver()
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const value = 1

    assert.isTrue(solver.checkRegionPlacement(puzzleString, 0, 0, value))
  })

  test('Logic handles an invalid region (3x3 grid) placement', () => {
    const solver = new Solver()
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const value = 2

    assert.isFalse(solver.checkRegionPlacement(puzzleString, 0, 0, value))
  })

  // TODO:

  //   test('Valid puzzle strings pass the solver')
  //   test('Invalid puzzle strings fail the solver')
  //   test('Solver returns the expected solution for an incomplete puzzle')
})
