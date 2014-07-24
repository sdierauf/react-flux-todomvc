/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react');

var MainSection = React.createClass({ 
	
	propTypes: {
		allTodos: ReactPropTypes.object.isRequired,
		// areAllComplete: ReactPropTypes.bool.isRequired
		areAllHappy: ReactPropTypes.bool.isRequired
	},

	render: function() {

		if (Object.keys(this.props.allTodos).length < 1) {
			return null;
		}

		var allTodos = this.props.allTodos;
		var todos = [];

		for (var key in allTodos) {
			todos.push(<TodoItem key={key} todo={allTodos[key]} />);
		}

		return (
			<section id="main">
				<input
					id="toggle-happyface"
					type="checkbox"
					onChange={this._onToggleHappyFace}
					checked={this.props.areAllHappy ? 'checked' : ''} />
				<label htmlFor="toggle-happyface">Make all of them happy</label>
				<input
					id="destroy-all"
					type="button"
					onClick={this._onDestroyAll}
					value="remove all MUAHAHAHA" />
				<ul id="todo-list">{todos}</ul>
			</section>
		);
	},

	_onToggleCompleteAll: function() {
		TodoActions.toggleCompleteAll();
	},

	_onDestroyAll: function() {
		TodoActions.destroyAll();
	},

	_onToggleHappyFace: function() {
		TodoActions.toggleHappyfaceAll();
	}


});

module.exports = MainSection;