'use strict';

import React from 'react';
import { map, isEmpty } from 'lodash';
import AddTodo from '../AddTodo';
import Todo from '../Todo';

export default React.createClass({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.object,
    loaded: React.PropTypes.bool.isRequired,
    uid: React.PropTypes.string.isRequired,
    clear: React.PropTypes.func.isRequired
  },

  completedCounter(items) {
    let completedCount = 0;

    for (let key in items) {
      if (items[key].done) completedCount++;
    }

    return completedCount;
  },

  renderClearButton() {
    let disabled = !this.completedCounter(this.props.items);

    return (
      <button
        type="button"
        onClick={ this.props.clear }
        disabled={ disabled }
        className="List__clear-btn">
        Clear Completed Todos
      </button>
    );
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
    if (isEmpty(this.props.items) && this.props.loaded) {
      return (
        <div className="List List--empty">
          No todos! Good job!
          <AddTodo itemsStore={ this.props.itemStore } />
        </div>
      );
    }

    if (this.props.loaded) {
      return (
        <div className="List">
          <ul className="List__list-items">
            { this.renderTodos() }
          </ul>
          <AddTodo itemsStore={ this.props.itemStore } />
          <div className="List__clear">
            { this.renderClearButton() }
          </div>
        </div>
      );
    }

    return <div>Loading...</div>;
  }
});
