'use strict'

import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { map, isEmpty } from 'lodash'
import AddTodo from '../AddTodo'
import Todo from '../Todo'

export default React.createClass({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.array,
    uid: React.PropTypes.string.isRequired,
    clear: React.PropTypes.func.isRequired,
    itemStore: React.PropTypes.object.isRequired
  },

  updateScroll() {
    let node = this.refs.listItems
    setTimeout(() => {
      node.scrollTop = node.scrollHeight
    }, 50)
  },

  completedCounter(items) {
    let completedCount = 0

    for (let key in items) {
      if (items[key].done) completedCount++
    }

    return completedCount
  },

  renderTodos() {
    return map(this.props.items, (item, key) => {
      return (
        <Todo
          text={ item.text }
          done={ item.done }
          uid={ this.props.uid }
          id={ item['.key'] }
          key={ `item-${key}` } />
      )
    })
  },

  render() {
    const completed = this.completedCounter(this.props.items)
    const hasCompletedClass = completed ? 'List--hasCompleted' : ''

    if (isEmpty(this.props.items)) {
      return (
        <div className="List List--empty">
          <AddTodo
            itemsStore={ this.props.itemStore }
            updateScroll={ this.updateScroll } />
        </div>
      )
    }

    return (
      <div className={ `List ${hasCompletedClass}` }>
        <ul className="List__list-items" ref="listItems">
          <ReactCSSTransitionGroup
            transitionName="Todo"
            transitionEnterTimeout={ 400 }
            transitionLeaveTimeout={ 400 }>
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
          Clear { completed } Completed

          <svg width="23" height="23" viewBox="0 0 23 23" className="clearIcon">
            <path d="M18.28 6.26C17.94 5.91 17.38 5.91 17.03 6.26L9.53 13.84 6.51 10.79C6.16 10.44 5.6 10.44 5.26 10.79 4.91 11.14 4.91 11.7 5.26 12.05L8.91 15.74C9.08 15.91 9.3 16 9.53 16 9.76 16 9.98 15.91 10.16 15.74L18.28 7.53C18.63 7.18 18.63 6.61 18.28 6.26L18.28 6.26Z"/>
          </svg>

        </button>
      </div>
    )
  }
})
