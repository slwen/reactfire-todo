'use strict';

import React from 'react';
import { connect } from '../lib/fb';

export default React.createClass({
  displayName: 'Todo',
  propTypes: {
    text: React.PropTypes.string.isRequired,
    done: React.PropTypes.bool.isRequired,
    uid: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      text: this.props.text,
      done: this.props.done,
      edited: false
    };
  },

  componentWillMount() {
    this.fb = connect(this.props.uid, this.props.id);
  },

  handleChecked(e) {
    let update = { done: e.target.checked }
    this.setState(update);
    this.fb.update(update);
  },

  handleDelete() {
    this.fb.remove();
  },

  handleEdit(e) {
    let value = e.target.value;

    this.setState({
      text: value,
      edited: !!value && value !== this.props.text
    });
  },

  handleSave() {
    if (this.state.edited) {
      this.fb.update({ text: this.state.text });
      this.setState({ edited: false });
    }
  },

  renderActionButton() {
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

  render() {
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
