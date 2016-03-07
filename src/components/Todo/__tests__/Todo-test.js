'use strict'

import Todo from '../'

const mockProps = {
  text: 'foobar',
  done: true,
  uid: 'github:00000',
  id: 'thi5r4nd0m57r1ng'
}
let updateSpy = sinon.spy()
let removeSpy = sinon.spy()
let connectStub = sinon.stub().returns({
  update: updateSpy,
  remove: removeSpy
})
let component

describe('Todo component', () => {
  before(() => {
    Todo.__Rewire__('connect', connectStub)
  })

  beforeEach(() => {
    updateSpy.reset()
    removeSpy.reset()
    component = renderIntoDocument(<Todo { ...mockProps } />)
  })

  it('creates a reference to a todo via Firebase on mount', () => {
    connectStub.should.have.been.calledOnce
    connectStub.should.have.been.calledWith('github:00000', 'thi5r4nd0m57r1ng')
    component.fb.should.not.be.undefined
  })

  describe('handleChecked method', () => {
    it('updates the todo as done', () => {
      component.setState({ done: false })
      component.state.done.should.equal(false)
      component.handleChecked({ target: { checked: true }})
      component.state.done.should.equal(true)
      updateSpy.should.have.been.calledOnce
      updateSpy.should.have.been.calledWith({ done: true })
    })
  })

  describe('handleDelete method', () => {
    it('removes the todo from Firebase', () => {
      component.handleDelete()
      removeSpy.should.have.been.calledOnce
    })
  })

  describe('handleEdit method', () => {
    it('sets the text in state', () => {
      component.handleEdit({ target: { value: '' }})
      component.state.text.should.equal('')
      component.handleEdit({ target: { value: 'foobarbaz' }})
      component.state.text.should.equal('foobarbaz')
    })

    it('sets the edited status in state', () => {
      component.handleEdit({ target: { value: '' }})
      component.state.edited.should.equal(false)
      component.handleEdit({ target: { value: 'foobarbaz' }})
      component.state.edited.should.equal(true)
    })
  })

  describe('handleSave method', () => {
    context('when state.edited is set to true', () => {
      it('updates the text on Firebase', () => {
        component.setState({ text: 'potato', edited: true })
        component.handleSave()
        updateSpy.should.have.been.calledOnce
        updateSpy.should.have.been.calledWith({ text: 'potato' })
      })

      it('sets edited back to false', () => {
        component.setState({ text: 'potato', edited: true })
        component.state.edited.should.equal(true)
        component.handleSave()
        component.state.edited.should.equal(false)
      })
    })
  })
})
