/** @jsx React.DOM */

//var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

function getTodoState()  {
    return {
        allTodos: TodoStore.getAll(),
        areAllHappy: TodoStore.areAllHappy()
    }
}

var TodoApp = React.createClass({

    getInitialState: function() {
        return getTodoState();
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },


    render: function() {
        return (
            <div>
                <Header />
                <MainSection
                    allTodos={this.state.allTodos}
                    areAllHappy={this.state.areAllHappy} />
            </div>
        );
    },

    _onChange: function() {
        this.setState(getTodoState());
    }
});

module.exports = TodoApp;
