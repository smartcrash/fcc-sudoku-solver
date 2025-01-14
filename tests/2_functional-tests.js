const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert
const server = require('../server')
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js')

chai.use(chaiHttp)

suite('Functional Tests', () => {
  /*
   // You can POST /api/solve with form data containing puzzle which will be
   // a string containing a combination of numbers (1-9) and periods . to
   // represent empty spaces. The returned object will contain a solution
   // property with the solved puzzle.
   */

  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', done => {
    const [puzzleString, solution] = puzzlesAndSolutions[0]

    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle: puzzleString })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.solution, solution)
        done()
      })
  })

  /*
  // If the object submitted to /api/solve is missing puzzle, the returned
  // value will be { error: 'Required field missing' }
  */
  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', done => {
    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle: undefined })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Required field missing')
        done()
      })
  })

  /*
  // If the puzzle submitted to /api/solve contains values which are not
  // numbers or periods, the returned value will be { error: 'Invalid characters in puzzle' }
  */
  test('Solve a puzzle with invalid characters: POST request to /api/solve', done => {
    const puzzleString = 'INVALID 1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....92'

    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle: puzzleString })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Invalid characters in puzzle')
        done()
      })
  })

  /*
  // If the puzzle submitted to /api/solve is greater or less than 81 characters,
  //   the returned value will be { error: 'Expected puzzle to be 81 characters long' }
  */
  test('Solve a puzzle with incorrect length: POST request to /api/solve', done => {
    const puzzleString = '12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....92'

    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle: puzzleString })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        done()
      })
  })

  /*
  // If the puzzle submitted to /api/solve is invalid or cannot be solved,
  // the returned value will be { error: 'Puzzle cannot be solved' }
  */
  test('Solve a puzzle that cannot be solved: POST request to /api/solve', done => {
    const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.999..81..7632..3...28.99'

    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle: puzzleString })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Puzzle cannot be solved')
        done()
      })
  })

  /*
  // You can POST to /api/check an object containing puzzle, coordinate, and
  // value where the coordinate is the letter A-I indicating the row, followed
  // by a number 1-9 indicating the column, and value is a number from 1-9.
  */
  test('Check a puzzle placement with all fields: POST request to /api/check', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: puzzleString,
        coordinate: 'A1',
        value: '7',
      })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.valid, true)
        done()
      })
  })

  /*
  // The return value from the POST to /api/check will be an object
  // containing a valid property, which is true if the number may
  // be placed at the provided coordinate and false if the number may
  // not. If false, the returned object will also contain a conflict
  // property which is an array containing the strings "row", "column",
  // and/or "region" depending on which makes the placement invalid.
  */
  test('Check a puzzle placement with single placement conflict: POST request to /api/check', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: puzzleString,
        coordinate: 'A1',
        value: '6',
      })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.valid, false)
        assert.isArray(res.body.conflict)
        assert.deepEqual(res.body.conflict, ['column'])

        done()
      })
  })

  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: puzzleString,
        coordinate: 'A1',
        value: '1',
      })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.valid, false)

        assert.isArray(res.body.conflict)
        assert.lengthOf(res.body.conflict, 2)
        assert.sameMembers(res.body.conflict, ['column', 'row'])

        done()
      })
  })

  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: puzzleString,
        coordinate: 'A1',
        value: '5',
      })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.valid, false)

        assert.isArray(res.body.conflict)
        assert.lengthOf(res.body.conflict, 3)
        assert.sameMembers(res.body.conflict, ['column', 'row', 'region'])

        done()
      })
  })

  test('If value submitted to /api/check is already placed in puzzle on that coordinate, the returned value will be an object containing a valid property with true if value is not conflicting.', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    const coordinate = 'C3'
    const value = '2'

    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: puzzleString,
        coordinate,
        value,
      })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.valid, true)

        done()
      })
  })

  /*
  // If the object submitted to /api/check is missing puzzle, coordinate or
  // value, the returned value will be { error: Required field(s) missing }
  */
  test('Check a puzzle placement with missing required fields: POST request to /api/check', done => {
    chai
      .request(server)
      .post('/api/check')
      .send({})
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Required field(s) missing')
        done()
      })
  })

  /*
  // If the puzzle submitted to /api/check contains values which are not
  // numbers or periods, the returned value will be { error: 'Invalid characters in puzzle' }
  */
  test('Check a puzzle placement with invalid characters: POST request to /api/check', done => {
    const puzzleString = 'INVALID 1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....92'

    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle: puzzleString, coordinate: 'A1', value: '5' })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Invalid characters in puzzle')
        done()
      })
  })

  /*
  // If the puzzle submitted to /api/check is greater or less than 81 characters,
  // the returned value will be { error: 'Expected puzzle to be 81 characters long' }
   */
  test('Check a puzzle placement with incorrect length: POST request to /api/check', done => {
    const puzzleString = '12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....92'

    chai
      .request(server)
      .post('/api/check')
      .send({ puzzle: puzzleString, coordinate: 'A1', value: '5' })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        done()
      })
  })

  /*
  // If the coordinate submitted to api/check does not point to an existing grid
  // cell, the returned value will be { error: 'Invalid coordinate'}
  */
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: puzzleString,
        coordinate: 'J1',
        value: '5',
      })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Invalid coordinate')
        done()
      })
  })

  /*
  // If the value submitted to /api/check is not a number between 1 and 9, the
  // returned values will be { error: 'Invalid value' }
  */
  test('Check a puzzle placement with invalid placement value: POST request to /api/check', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: puzzleString,
        coordinate: 'A1',
        value: '10',
      })
      .end(function (err, res) {
        assert.isNull(err)
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.equal(res.body.error, 'Invalid value')
        done()
      })
  })
})
