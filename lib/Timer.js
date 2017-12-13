var Util = require('./Util');

/**
 * create a polling timer instance
 * @param interval
 * @param timeout
 * @constructor
 */
function PollingTimer(interval, timeout) {
    this.setInterval(interval);
    this.setTimeout(timeout);
    this.timer = null;
    this.first = true;
    this.startTime = 0;
    // call every polling
    this.runCallback = null;
    // call at the end
    this.endCallback = null;
    // call when the polling is timeout
    this.timeoutCallback = null;
}

var PTPrototype = PollingTimer.prototype;

PTPrototype.setInterval = function (interval) {
    // default timeout is 10 minutes
    this.interval = Util.isNumber(interval) ? interval : 600000;
};

PTPrototype.setTimeout = function (timeout) {
    this.timeout = Util.isNumber(timeout) ? timeout : 0;
};

PTPrototype.setRunCallback = function (func) {
    this.runCallback = func;
};

PTPrototype.setEndCallback = function (func) {
    this.endCallback = func;
};

PTPrototype.setTimeoutCallback = function (func) {
    this.timeoutCallback = func;
};

PTPrototype.start = function () {
    if (this.first) {
        this.startTime = Date.now();
        this.first = false;
    }
    this.run();
};

PTPrototype.isTimeout = function () {
    return this.startTime + this.timeout < Date.now();
};

PTPrototype.run = function () {
    var self = this;
    this.timer = setTimeout(function () {
        if (self.timeout !== 0) {
            if (self.isTimeout() && Util.isFunction(self.timeoutCallback)) {
                self.timeoutCallback();
                return self.stop();
            }
        }
        if (!Util.isFunction(self.runCallback)) {
            return false;
        }
        var result = self.runCallback();
        if (Util.isTruly(result)) {
            return self.stop();
        }
        if (Util.isFalsy(result)) {
            return self.run();
        }
        if (Util.isPromise(result)) {
            result
                .then(function (res) {
                    if (Util.isTruly(res)) {
                        return self.stop();
                    }
                    self.run();
                })
                .catch(function (err) {
                    self.stop(err);
                });
        }
    }, this.interval);
};
PTPrototype.stop = function (err) {
    clearTimeout(this.timer);
    this.timer = null;
    this.startTime = 0;
    if (Util.isFunction(this.endCallback)) {
        this.endCallback(err);
    }
};

module.exports = PollingTimer;
