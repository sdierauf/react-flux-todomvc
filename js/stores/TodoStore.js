var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _todos = {};


function create(text) {
    //not showing how xhr or persistence

    var id = Date.now();
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    };

}

function update(id, updates) {
    _todos[id] = merge(_todos[id], updates);
}

function updateAll(updates) {
    for (var id in _todos) {
        update(id, updates);
    }
}

function destroy(id) {
    delete _todos[id];
}


function destroyCompleted() {
    for (var id in _todos) {
        if (_todos[id].complete) {
            destroy(id);
        }    
    }
}


var TodoStore = merge(EventEmitter.prototype, {

    areAllComplete: function() {
        for (id in _todos) {
            if (!_todos[id].complete) {
                return false;
                break;
            }
        }
        return true;
    },

    getAll: function() {
        reutn _todos;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});



AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
        case TodoConstants.TODO_CREATE:
            text = action.text.trim();
            if (text !== '') {
                create(text);
            }
            break;

        case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
            if (TodoStore.areAllComplete()) {
                updateAll({complete: false});
            } else {
                updateAll({complete: true});
            }
            break;

        case TodoConstants.TODO_UNDO_COMPLETE:
            update(action.id, {complete: false});
            break;

        case TodoConstants.TODO_COMPLETE:
            update(action.id, {complete: true});
            break;

        case TodoConstants.TODO_UPDATE_TEXT:
            text = action.text.trim();
            if (text !== '') {
                update(action.id, {text: text});
            };
            break;

        case TodoConstants.TODO_DESTROY:
            destroy(action.id);
            break;

        case TodoConstants.TODO_DESTROY_COMPLETED:
            destroyCompleted();
            break;

        default:
        return true;
    }

    TodoStore.emitChange();

    //needed by promise
    return true;

});

module.exports = TodoStore; 