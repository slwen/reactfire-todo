'use strict'

import Checkbox from '../'
import { mount, shallow } from 'enzyme'

let component;

describe('Checkbox component', () => {
  before(() => {
    component = mount(
      <Checkbox onChange={ sinon.spy() } checked={ false } />
    )
  })

  it('triggers a callback on change', () => {
    component.find('input').simulate('change')
    component.props().onChange.calledOnce.should.equal(true)
  })

  it('can change from checked to unchecked based on props', () => {
    let input = component.find('input')
    component.setProps({ checked: false })
    input.props().checked.should.equal(false)
    component.setProps({ checked: true })
    input.props().checked.should.equal(true)
  })
})
