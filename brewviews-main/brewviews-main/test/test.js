// Write a minimum of 2 test cases
// to run: npm test

// Imports the server.js file to be tested.
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
  // Sample test case given to test / endpoint.
  it("Main returns status 200.", (done) => {
    chai
      .request(server)
      .get("/main")
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        done();
      });
  });

  it("Reviews returns status 200.", (done) => {
    chai
      .request(server)
      .get("/reviews")
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        done();
      });
  });

  // ===========================================================================
  // TODO: Please add your test cases for part A here.
  // 1. Test case to check if response:
    // is of type array
    // size of array is non-zero
//   it("Returns an array with length greater than 0", (done) => {
//     chai
//       .request(server)
//       .get("/operations")
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an.a('array');
//         expect(res.body).not.to.be.empty;
//         done();
//       });
//   });

  // 2. Test case to fetch the operation with id=1 and check if response:
    // has property id equal to 1
    // has property name
    // has property sign
//   it("Returns an object with properties name, sign, and id=1", (done) => {
//     chai
//       .request(server)
//       .get("/operations/1")
//       .end((err, res) => {
//         expect(res.body).to.have.property('name');
//         expect(res.body).to.have.property('sign');
//         expect(res.body.id).to.equal(1);
//         done();
//       });
//   });

  // 3. Test case to add new operation and check if response:
    // has property id equal to 4
    // has property name equal to name of the newly added operation
    // has property sign equal to the sign of the newly added operation
//   it("Adds new operation, returns an object with id=4, name=<new operation name>, sign=<new operation sign>", (done) => {
//     const op = {
//       name: 'name',
//       sign: 'sign',
//       id: 4,
//     };
//     chai
//       .request(server)
//       .post('/operations')
//       .send(op)
//       .end((err, res) => {
//         expect(res.body.id).to.equal(4);
//         expect(res.body.name).to.equal('name');
//         expect(res.body.sign).to.equal('sign');
//         done();
//       });
//   });

  // ===========================================================================
  // TODO: Please add your test cases for part B here.
  // Positive Test 1
//   it("Returns sum=num1+num2", (done) => {
//     const nums = {
//       num1: 10,
//       num2: 15,
//     };
//     chai
//       .request(server)
//       .post('/add')
//       .send(nums)
//       .end((err, res) => {
//         expect(res.body.sum).to.equal(25);
//         done();
//       });
//   });

  // Negative Test 1
//   it("Should error for non-numbers.", (done) => {
//     const nums = {
//       num1: "apple",
//       num2: "orange",
//     };
//     chai
//       .request(server)
//       .post('/add')
//       .send(nums)
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//   });

//   // Positive Test 2
//   it("Returns quotient=num1/num2", (done) => {
//     const nums = {
//       num1: 25,
//       num2: 5,
//     };
//     chai
//       .request(server)
//       .post('/divide')
//       .send(nums)
//       .end((err, res) => {
//         expect(res.body.quotient).to.equal(5);
//         done();
//       });
//   });

//   // Negative Test 2
//   it("Should error for num2=0.", (done) => {
//     const nums = {
//       num1: 25,
//       num2: 0,
//     };
//     chai
//       .request(server)
//       .post('/divide')
//       .send(nums)
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//   });
});
