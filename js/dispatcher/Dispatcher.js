var Promise = require('es6-promise').Promise;
var merge = require('react/lib/merge');


var _callbacks = [];
var _promises = [];

var _addPromise = function(callback, payload) {
    _promises.push(new Promise(function(resolve, reject) {
        if (callback(payload)) {
            resolve(payload);
        } else {
            reject(new Error('Dispatcher callback unsuccessful'));
        }
    }));
};

var Dispatcher = function() {};
Dispatcher.prototype = merge(Dispatcher.prototype, {

    register: function(callback) {
        _callbacks.push(callback);
        return _callbacks.length - 1; //the index
    },

    dispatch: function(payload) {
        //create an array of promises for callbacks to reference.
        var resolves = [];
        var rejects = [];

        _promises = _callbacks.map(function(_, i) {
            return new Promise(function(resolve, reject) {
                resolves[i] = resolve;
                rejects[i] = reject; 
            });
        });

        //dispatch to callbacks and resolve/reject promises.
        _callbacks.forEach(function(callback, i) {
            //calback can return obj to resolve or a promise to chain
            Promise.resolve(callback(payload)).then(function() {
                resolves[i](payload);
            }, function() {
                rejects[i](new Error('Dispatcher callback unsuccessful'));
            });
        });
        _promises = [];
    },

    waitFor: function(promiseIndexes, callback) {
        var selectedPromises = promiseIndexes.map(function(index) {
            return _promises[index];
        });
        return Promise.all(selectedPromises).then(callback);
    }

});

module.exports = Dispatcher;