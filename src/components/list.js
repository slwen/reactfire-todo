'use strict';

import React from 'react';
import { map, isEmpty } from 'lodash';
import Todo from '../components/todo';

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
    let buttonState = this.completedCounter(this.props.items) ? '' : 'disabled';

    return (
      <button
        type="button"
        onClick={ this.props.clear }
        disabled={ buttonState }>
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
        <div>
          No todos! Good job!
        </div>
      );
    }

    if (this.props.loaded) {
      return (
        <div>
          <ul>
            { this.renderTodos() }
          </ul>
          <div>
            { this.renderClearButton() }
          </div>
        </div>
      );
    }

    return <div>Loading...</div>;
  }
});
