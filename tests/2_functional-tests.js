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

  // If the puzzle submitted to /api/solve is invalid or cannot be solved,
  // the returned value will be { error: 'Puzzle cannot be solved' }
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

  //   test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {})

  //   test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {})
  //   test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {})
  //   test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {})
  //   test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {})
  //   test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {})
  //   test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {})
  //   test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {})
  //   test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {})
})
