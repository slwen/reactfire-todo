'use strict'

import AddTodo from '../'
import { render, mount } from 'enzyme'

let component

describe('AddTodo component', () => {
  it('renders a form with an input and submit button', () => {
    component = render(
      <AddTodo itemsStore={ {} } updateScroll={ () => {} } />
    )
    component.find('.AddTodo').length.should.equal(1)
    component.find('.AddTodo__input').length.should.equal(1)
    component.find('.AddTodo__btn').length.should.equal(1)
  })

  describe('handleSubmit method', () => {
    let form

    beforeEach(() => {
      component = mount(
        <AddTodo
          itemsStore={ { push: sinon.spy() } }
          updateScroll={ sinon.spy() } />
      )
      component.setState({ text: 'foobar' })
      form = component.find('.AddTodo')
    })

    context('if the input has text', () => {
      it('creates a new todo', () => {
        form.simulate('submit')
        component.props().itemsStore.push.should.have.been.calledOnce
        component.props().itemsStore.push.should.have.been.calledWith({
          text: 'foobar',
          done: false
        })
      })

      it('sets input field back to blank after being submitted', () => {
        component.state().text.should.equal('foobar')
        form.simulate('submit')
        component.state().text.should.equal('')
      })

      it('sets input field back to blank after being submitted', () => {
        component.state().text.should.equal('foobar')
        form.simulate('submit')
        component.state().text.should.equal('')
      })

      it('calls updateScroll callback function', () => {
        form.simulate('submit')
        component.props().updateScroll.should.have.been.calledOnce
      })
    })
  })
})
