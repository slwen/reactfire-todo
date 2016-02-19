'use strict'

import React from 'react'

export default React.createClass({
  displayName: 'AddTodo',
  propTypes: {
    itemsStore: React.PropTypes.object,
    updateScroll: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return { text: '' }
  },

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.text !== '') {
      this.props.itemsStore.push({
        text: this.state.text,
        done: false
      })

      this.setState({ text: '' })
      this.props.updateScroll()
    }
  },

  handleInputChange(e) {
    this.setState({ text: e.target.value })
  },

  render() {
    return (
      <form onSubmit={ this.handleSubmit } className="AddTodo">
        <input
          value={ this.state.text }
          onChange={ this.handleInputChange }
          type="text"
          className="AddTodo__input"
          placeholder="Add a new todo..." />

        <span>
          <button
            type="submit"
            title="Add New"
            className="AddTodo__btn">
            <img src="images/add.svg" />
          </button>
        </span>
      </form>
    )
  }
})
