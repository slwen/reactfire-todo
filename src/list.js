'use strict';

import React from 'react';
import { map, isEmpty } from 'lodash';
import Todo from './todo';

export default React.createClass({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.object,
    loaded: React.PropTypes.bool.isRequired,
    clear: React.PropTypes.func.isRequired
  },

  completedCounter: function(items) {
    let completedCount = 0;

    for (let key in items) {
      if (items[key].done) completedCount++;
    }

    return completedCount;
  },

  renderClearButton: function() {
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

  renderTodos: function() {
    return map(this.props.items, function(item, key) {
      return(
        <Todo
          text={ item.text }
          done={ item.done }
          id={ key }
          key={ "item-" + key } />
      );
    });
  },

  render: function() {
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
