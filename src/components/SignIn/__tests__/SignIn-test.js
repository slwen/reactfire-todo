'use strict'

import SignIn from '../'
import { mount } from 'enzyme'

describe('SignIn component', () => {
  it('triggers a callback when the button is clicked', () => {
    const component = mount(<SignIn handleClick={ sinon.spy() } />)
    component.find('button').simulate('click')
    component.props().handleClick.calledOnce.should.equal(true)
  })
})
