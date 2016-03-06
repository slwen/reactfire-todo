'use strict'

import Header from '../'
import { render } from 'enzyme'

let component;

describe('Header component', () => {
  before(() => {
    component = render(<Header name="foobar" />)
  })

  it('renders a title', () => {
    component.find('.Header__title').text().should.contain('Todos')
  })

  it('renders a name', () => {
    component.find('.Header__name').text().should.contain('foobar')
  })
})
