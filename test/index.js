var assert = require('assert');

var Util = require('../lib/Util');

describe('Util', function () {
    describe('#isNumber', function () {
        it('should runs without any unexpected results', function () {
            assert.equal(true, Util.isNumber(1));
            assert.equal(true, Util.isNumber(-1.1));
            assert.equal(false, Util.isNumber(NaN));
            assert.equal(true, Util.isNumber(Infinity));
            assert.equal(false, Util.isNumber(null));
        });
    });
    describe('#isFunction', function () {
        it('should runs without any unexpected results', function () {
            assert.equal(true, Util.isFunction(function () {
            }));
            assert.equal(true, Util.isFunction(new Function()));
        });
    });
    describe('#isPromise', function () {
        it('should runs without any unexpected results', function () {
            assert.equal(true, Util.isPromise(Promise.resolve()));
            assert.equal(false, Util.isPromise({then: ''}));
            assert.equal(true, Util.isPromise({
                then: function () {
                }
            }));
        });
    });
    describe('#isTruly', function () {
        it('should runs without any unexpected results', function () {
            assert.equal(true, Util.isTruly(true));
            assert.equal(false, Util.isTruly(false));
        });
    });
    describe('#isFalsy', function () {
        it('should runs without any unexpected results', function () {
            assert.equal(true, Util.isFalsy(false));
            assert.equal(false, Util.isFalsy(true));
        });
    });
});