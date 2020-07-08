import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr } from '../test/testUtils'
import Congrats from './Congrats'

/**
 *
 * @param {object} props - Component props specific to this setup
 */
const setup = (props = {}) => {
  return shallow(<Congrats {...props} />)
}

test('renders Congrats component without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'component-congrats')
  expect(component.length).toBe(1)
})

test('renders no text when `success` prop is false', () => {
  const wrapper = setup({ success: false })
  const component = findByTestAttr(wrapper, 'component-congrats')
  expect(component.text()).toBe('')
})

test('renders non-empty congrats message when `success` prop is true', () => {
  const wrapper = setup({ success: true })
  const message = findByTestAttr(wrapper, 'congrats-message')
  expect(message.length).not.toBe(0)
})
