'use strict';

import React from 'react';
import { connect } from './fb';

export default React.createClass({
  displayName: 'Todo',
  propTypes: {
    text: React.PropTypes.string.isRequired,
    done: React.PropTypes.bool.isRequired,
    id: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      text: this.props.text,
      done: this.props.done,
      edited: false
    };
  },

  componentWillMount: function() {
    this.fb = connect(this.props.id);
  },

  handleChecked: function(e) {
    let update = { done: e.target.checked }
    this.setState(update);
    this.fb.update(update);
  },

  handleDelete: function() {
    this.fb.remove();
  },

  handleEdit: function(e) {
    let value = e.target.value;

    this.setState({
      text: value,
      edited: !!value && value !== this.props.text
    });
  },

  handleSave: function() {
    if (this.state.edited) {
      this.fb.update({ text: this.state.text });
      this.setState({ edited: false });
    }
  },

  renderActionButton: function() {
    if (this.state.done) {
      return (
        <button
          type="button"
          onClick={ this.handleDelete }>
          Delete
        </button>
      );
    }
  },

  render: function() {
    return (
      <li>
        <div>
          <span>
            <input
              type="checkbox"
              onChange={ this.handleChecked }
              checked={ this.state.done } />
          </span>

          <input
            type="text"
            value={ this.state.text }
            onChange={ this.handleEdit }
            onBlur={ this.handleSave } />

          <div>
            { this.renderActionButton() }
          </div>
        </div>
      </li>
    );
  }
});
