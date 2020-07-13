import React from 'react'
import { mount, ReactWrapper } from 'enzyme'

import Input from './Input'
import { findByTestAttr, checkProps } from '../test/testUtils'
import languageContext from './contexts/languageContext'

/**
 * Create ReactWrapper for Input component for testing
 * @param {object} testValues - Context and props values for this specific test
 * @returns {ReactWrapper}
 */
const setup = ({ language, secretWord }) => {
  language = language || 'en'
  secretWord = secretWord || 'party'

  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={secretWord} />
    </languageContext.Provider>
  )
}

it('Input renders without error', () => {
  const wrapper = setup({})
  const component = findByTestAttr(wrapper, 'component-input')
  expect(component.length).toBe(1)
})

it('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' })
})

describe('state controlled input field', () => {
  let mockSetCurrentGuess
  let wrapper

  beforeEach(() => {
    mockSetCurrentGuess = jest.fn()
    React.useState = jest.fn(() => ['', mockSetCurrentGuess])
    wrapper = setup({})
  })

  it('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box')
    const mockEvent = { target: { value: 'train' } }
    inputBox.simulate('change', mockEvent)

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
  })

  it('currentGuess state is cleared when submit button is clicked', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    submitButton.simulate('click', { preventDefault() {} })

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
  })
})

describe('languagePicker', () => {
  it('should correctly render submit string in English ', () => {
    const wrapper = setup({ language: 'en' })
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    expect(submitButton.text()).toBe('Submit')
  })

  it('should correctly render congrats string in emoji', () => {
    const wrapper = setup({ language: 'emoji' })
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    expect(submitButton.text()).toBe('🚀')
  })
})
