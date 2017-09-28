exports.isNumber = function (num) {
    return typeof num === 'number' && !isNaN(num);
};

exports.isFunction = function (func) {
    return typeof func === 'function';
};

exports.isPromise = function (obj) {
    return obj && obj.then && exports.isFunction(obj.then);
};

exports.isTruly = function (obj) {
    return obj === true;
};
exports.isFalsy = function (obj) {
    return !obj || obj == null;
};

