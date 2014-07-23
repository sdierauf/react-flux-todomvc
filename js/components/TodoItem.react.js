/** @jsx React.DOM */

var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var TodoItem = React.createClass({

    propTypes: {
        todo: React.PropTypes.object.isRequired
    },


    render: function() {
        var todo = this.props.todo;

        return (
            <li
                key={todo.id}>
                <label>
                    {todo.text}
                </label>
                <button className="destroy" onClick={this._onDestroyClick} style={this.props.todo.appearance}/>
            </li>
        );
    },

    _onDestroyClick: function() {
        TodoActions.destroy(this.props.todo.id);
    }

});

module.exports = TodoItem;