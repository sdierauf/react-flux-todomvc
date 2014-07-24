var Dispatcher = require('./Dispatcher');
var merge = require('react/lib/merge');


var AppDispatcher = merge(Dispatcher.prototype, {
    handleViewAction: function(action) {
    	console.log('handleViewAction is doing something!!');
        this.dispatch({
            source: 'VIEW_ACTIONS',
            action: action
        });
    }

});

module.exports = AppDispatcher;