var keyMirror = require('react/lib/keyMirror');


//names for possible actions to send the dispatcher?
module.exports = keyMirror({
    TODO_CREATE: null,
    TODO_COMPLETE: null,
    TODO_DESTROY: null,
    TODO_DESTROY_ALL: null,
    TODO_DESTROY_COMPLETED: null,
    TODO_TOGGLE_HAPPY_EVERYBODY: null,
    TODO_TOGGLE_COMPLETE_ALL: null,
    TODO_UNDO_COMPLETE: null,
    TODO_UPDATE_TEXT: null
});