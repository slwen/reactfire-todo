'use strict'

import React from 'react'
import { connect } from '../../lib/fb'
import Checkbox from '../Checkbox'

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
    }
  },

  componentWillMount() {
    this.fb = connect(this.props.uid, this.props.id)
  },

  handleChecked(e) {
    const update = { done: e.target.checked }
    this.setState(update)
    this.fb.update(update)
  },

  handleDelete() {
    this.fb.remove()
  },

  handleEdit(e) {
    const value = e.target.value

    this.setState({
      text: value,
      edited: !!value && value !== this.props.text
    })
  },

  handleSave() {
    if (this.state.edited) {
      this.fb.update({ text: this.state.text })
      this.setState({ edited: false })
    }
  },

  renderActionButton() {
    return (
      <button
        type="button"
        onClick={ this.handleDelete }
        className="Todo__delete-btn">
        <img src="images/trash.svg" />
      </button>
    )
  },

  render() {
    const doneClass = this.state.done ? 'Todo__input--done' : ''

    return (
      <li className="Todo">

        <Checkbox
          checked={ this.state.done }
          onChange={ this.handleChecked }
        />

        <input
          type="text"
          value={ this.state.text }
          onChange={ this.handleEdit }
          onBlur={ this.handleSave }
          className={ `Todo__input ${doneClass}` } />

        { this.renderActionButton() }
      </li>
    )
  }
})
