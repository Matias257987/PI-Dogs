const { Breed, Temperament, conn } = require("../../src/db")
const { expect } = require('chai');

describe('Model Testing', function() {
 
  describe('Breed model', function () {
    beforeEach(async function() {
      await Breed.sync({ force: true });
    });

    describe('Validations', function () {
      it('Should not be created without all required fields completed', function(done) {
        Breed.create({
        name: 'Rofo',
        })
        .then(() => done('Should not have been created'))
        .catch(() => done());
      });

      it('Should not be created without all required fields completed', function(done) {
        Breed.create({
          height: 'MAX',
        })
        .then(() => done('Should not have been created'))
        .catch(() => done());
      });
    });
  });

  describe('Temperament model', function () {
    beforeEach(async function() {
      await Temperament.sync({ force: true });
    });
    
    it('Should not be created without all required fields completed', function(done) {
      Temperament.create({
        id: '11',
      })
      .then(() => done('Should not have been created'))
      .catch(() => done());
    });

    it('Name should be a string', function(){
      expect(typeof Temperament.name).equal("string")
    });
  });
});