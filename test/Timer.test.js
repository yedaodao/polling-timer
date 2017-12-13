var assert = require('assert');

var Timer = require('../lib/Timer');

describe('Timer', function () {
    describe('#Construct', function () {
        it('should runs without any unexpected results', function () {
            var timer = new Timer(1000, 1000);
            assert.equal(timer.interval, 1000);
            assert.equal(timer.first, true);
            assert.equal(timer.startTime, 0);
            assert.equal(timer.timeout, 1000);
        });
    });
    describe('#isTimeout()', function () {
        it('should runs without any unexpected results', function (done) {
            var timer = new Timer(1000, 1000);
            timer.start();
            setTimeout(function () {
                assert.equal(timer.isTimeout(), true);
                done();
            }, 1010);
        });
    });
    describe('#start()', function () {
        it('should run timeout', function (done) {
            this.timeout(20000);
            var runMark = false,
                timeoutMark = false;
            var timer = new Timer(1000, 10000);
            timer.setRunCallback(function () {
                runMark = true;
            });
            timer.setTimeoutCallback(function () {
                timeoutMark = true;
                assert.equal(runMark, true);
                assert.equal(timeoutMark, true);
                done();
            });
            timer.start();
        });
        it('test setTimeout & setInterval', function (done) {
            this.timeout(20000);
            var timer = new Timer(1000, 10000),
                mark = 0;
            timer.setInterval(2000);
            timer.setTimeout(3000);
            timer.setRunCallback(function () {
                mark = (mark + 1) % 2;
                return false;
            });
            timer.setTimeoutCallback(function () {
                assert.equal(mark, 1);
                done();
            });
            timer.setEndCallback(function () {
                done();
            });
            timer.start();
        });
        it('should run without timeout', function (done) {
            this.timeout(20000);
            var runMark = false,
                timeoutMark = false;
            var timer = new Timer(1000, 10000);
            timer.setRunCallback(function () {
                runMark = true;
                return runMark;
            });
            timer.setTimeoutCallback(function () {
                timeoutMark = true;
            });
            timer.setEndCallback(function () {
                assert.equal(timeoutMark, false);
                assert.equal(runMark, true);
                done();
            });
            timer.start();
        });
        it('should runs expected counts', function (done) {
            this.timeout(20000);
            var runCounts = 0;
            var timer = new Timer(1000, 10000);
            timer.setRunCallback(function () {
                runCounts++;
                if (runCounts === 5) {
                    return true;
                }
            });
            timer.setEndCallback(function () {
                done();
            });
            timer.start();
        });
        it('should runs with promise result', function (done) {
            this.timeout(20000);
            var timer = new Timer(1000, 10000);
            timer.setRunCallback(function () {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(true);
                    }, 1000);
                });
            });
            timer.setEndCallback(function () {
                done();
            });
            timer.start();
        });
        it('should runs with promise result', function (done) {
            this.timeout(20000);
            var timer = new Timer(1000, 10000),
                count = 0;
            timer.setRunCallback(function () {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        if (count === 0) {
                            count++;
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    }, 1000);
                });
            });
            timer.setEndCallback(function () {
                done();
            });
            timer.start();
        });
        it('should runs with promise error ', function (done) {
            this.timeout(20000);
            var timer = new Timer(1000, 10000),
                count = 0;
            timer.setRunCallback(function () {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        reject(new Error('promise error'));
                    }, 1000);
                });
            });
            timer.setEndCallback(function (err) {
                if (err) {
                    done();
                } else {
                    assert.fail('Catch function did not execute');
                }
            });
            timer.start();
        });
    });
});