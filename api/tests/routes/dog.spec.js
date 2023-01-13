/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai")
const session = require("supertest-session")
const app = require("../../src/app")
const { conn } = require("../../src/db")

const agent = session(app)

describe("Breed routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Can't reach DB", err)
    })
  );

  describe('/dogs', function() {
    it('GET respons with status 200', function(){
      return agent
        .get('/dogs')
        .expect(function(res){
          expect(res.status).equal(200)})
    }).timeout(10000);

    it('Elements received are Object type',  function() {
      return agent 
        .get('/dogs') 
        .expect(function(res) {
          expect(typeof res.body[0]).equal('object'); 
        });
    }).timeout(10000)
  });

  describe('/dogs?name=', function() {
    it('GET respons with status 200 with a name URL with mixed camel case', function() {
      return agent 
        .get('/dogs?name=TeRRiEr') 
        .expect(function(res){
          expect(res.status).equal(200)
        }); 
    }).timeout(10000);
  });

  describe('/dogs/:id', function() {
    it('GET responses with status 200 if a dog is found',  function() {
      return agent 
        .get('/dogs/13') 
        .expect(function(res){
          expect(res.status).equal(200)
        }); 
      }).timeout(10000);
  });

  describe('/temperament', function() {
    it('GET sends status 200 when finding temperaments', function() {
      return agent 
        .get('/temperament') 
        .expect(function(res){
          expect(res.status).equal(200)
      }); 
    }).timeout(10000);
  });
});