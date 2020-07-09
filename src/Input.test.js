import React from 'react'
import Input from './Input'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../test/testUtils'

const setup = (secretWord = 'party') => {
  return shallow(<Input secretWord={secretWord} />)
}

it('App renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'component-input')
  expect(component.length).toBe(1)
})

test('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' })
})
