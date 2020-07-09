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

it('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' })
})

describe('state controlled input field', () => {
  it('state updates with value of input box upon change', () => {
    const mockSetCurrentGuess = jest.fn()
    React.useState = jest.fn(() => ['', mockSetCurrentGuess])

    const wrapper = setup()
    const inputBox = findByTestAttr(wrapper, 'input-box')

    const mockEvent = { target: { value: 'train' } }
    inputBox.simulate('change', mockEvent)

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
  })
})
