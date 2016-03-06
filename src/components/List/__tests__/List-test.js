'use strict'

import List from '../'
import { render } from 'enzyme'

let component
const mockProps = {
  items: [
    { '.key': 'rAnDOMmumBOjuMbO', done: true, text: 'potato' },
    { '.key': 'fooBArBAZbOOM', done: false, text: 'onion' }
  ],
  uid: 'github:000000',
  clear: sinon.spy(),
  itemStore: {}
}

describe('List component', () => {
  beforeEach(() => {
    component = render(<List { ...mockProps } />)
  })

  it('renders a list of todo items', () => {
    component.find('.Todo').length.should.equal(2)
  })

  it('renders an `add todo` button', () => {
    component.find('.AddTodo').length.should.equal(1)
  })

  describe('completedCounter method', () => {
    it('counts the number of completed items', () => {
      component = renderIntoDocument(<List { ...mockProps } />)
      component.completedCounter(mockProps.items).should.equal(1)
    });
  });
})
