'use strict';

const expect = require("chai").expect;
const mold = require('../lib/index');
const Model = mold.Model;

describe('Model', function () {
    let model = null;

    beforeEach(function () {
        model = new Model('foobar', ['test']);
    });

    it('should create fields on construction', function () {
        expect(model).to.have.any.keys('_test');
    });

    it('should create fields dynamically', function () {
        model.addField('funky');

        expect(model).to.have.any.keys('_funky');
    });

    it('should persist fields value', function () {
        model.test = 42;
        expect(model.test).to.be.equal(42);
    });

    it('should keep track of changes', function () {
        model.test = 42;
        expect(model._propertiesChanged).to.be.deep.equal(['test']); 
    });

    it('should prepare packet with changes only', function () {
        model.test = 42;
        expect(model.preparePacket(true)).to.be.deep.equal({ 'test': 42 });
    });

    it('should flush changes if requested', function () {
        model.test = 42;
        model.preparePacket(true, true);
        expect(model.preparePacket(true)).to.be.empty;
    });    
});