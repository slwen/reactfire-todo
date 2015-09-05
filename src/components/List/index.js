'use strict';

import React from 'react/addons';
import { map, isEmpty } from 'lodash';
import AddTodo from '../AddTodo';
import Todo from '../Todo';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.object,
    uid: React.PropTypes.string.isRequired,
    clear: React.PropTypes.func.isRequired
  },

  updateScroll() {
    var node = this.refs.listItems.getDOMNode();
    setTimeout(() => {
      node.scrollTop = node.scrollHeight;
    }, 50);
  },

  completedCounter(items) {
    let completedCount = 0;

    for (let key in items) {
      if (items[key].done) completedCount++;
    }

    return completedCount;
  },

  renderTodos() {
    return map(this.props.items, (item, key) => {
      return (
        <Todo
          text={ item.text }
          done={ item.done }
          uid={ this.props.uid }
          id={ key }
          key={ "item-" + key } />
      );
    });
  },

  render() {
    let completed = this.completedCounter(this.props.items);
    let hasCompletedClass = completed ? 'List--hasCompleted' : '';

    if (isEmpty(this.props.items)) {
      return (
        <div className="List List--empty">
          No todos! Good job!
          <AddTodo itemsStore={ this.props.itemStore } />
        </div>
      );
    }

    return (
      <div className={ "List " + hasCompletedClass }>
        <ul className="List__list-items" ref="listItems">
          <ReactCSSTransitionGroup transitionName="Todo">
            { this.renderTodos() }
          </ReactCSSTransitionGroup>
        </ul>

        <AddTodo
          itemsStore={ this.props.itemStore }
          updateScroll={ this.updateScroll } />

        <button
          type="button"
          onClick={ this.props.clear }
          disabled={ !completed }
          className="List__clear-btn">
          Clear { completed } Completed Todos
        </button>
      </div>
    );
  }
});
