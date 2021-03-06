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
        happy: false,
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

//The for realz destroy
function destroy(id) {
    delete _todos[id];
}

//fake destroy :D
// function destroy(id) {
//     var newText = _todos[id].text + ' DONE :DDDD';
//     _todos[id] = merge(_todos[id], 
//         {
//             text: newText,
//             appearance: {visibility: 'hidden'}
//         }
//     );
// }


function destroyCompleted() {
    for (var id in _todos) {
        if (_todos[id].complete) {
            destroy(id);
        }    
    }
}

function destroyAll() {
    console.log('called destroy all in todostore');
    for (var id in _todos) {
        destroy(id);
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

    areAllHappy: function() {
        for (id in _todos) {
            if (!_todos[id].happy) {
                return false;
                break;
            }
        }
        return true;
    },

    checkboxTest: function() {
        return {
            shouldBeChecked: false
        }
    },

    getAll: function() {
        return _todos;
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

    console.log(action.actionType);

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

        case TodoConstants.TODO_DESTROY_ALL:
            destroyAll();
            break;

        case TodoConstants.TODO_TOGGLE_HAPPY_EVERYBODY:
            if (TodoStore.areAllHappy()) {
                updateAll({happy: false});
            } else {
                updateAll({happy: true});
            }
            break;

        default:
            console.log('fell through to default');
            return true;
    }

    TodoStore.emitChange();

    //needed by promise
    return true;

});

module.exports = TodoStore; 