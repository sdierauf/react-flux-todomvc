var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {


    create: function(text) {
        AppDispatcher.handleViewAction({ 
            actionType: TodoConstants.TODO_CREATE,
            text: text
        });
    },

    destroy: function(id) {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_DESTROY,
            id: id
        });
    }, 

    destroyAll: function() {
        console.log('called destroy all');
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_DESTROY_ALL
        });
    },

    toggleHappyfaceAll: function() {
        console.log('sending happyfaces to dispatcher');
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_TOGGLE_HAPPY_EVERYBODY
        })
    }

};

module.exports = TodoActions;
