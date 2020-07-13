import React from 'react'
import App from './App'
import { mount, ReactWrapper } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import hookActions from './actions/hookActions'

const mockGetSecretWord = jest.fn()

/**
 * Setup function for app component
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
const setup = (secretWord = 'party') => {
  mockGetSecretWord.mockClear()
  hookActions.getSecretWord = mockGetSecretWord

  const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn()])

  React.useReducer = mockUseReducer

  // use mount, because useEffect is not called on `shallow`
  return mount(<App />)
}

it('App renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'component-app')
  expect(component.length).toBe(1)
})

describe('getSecretWord calls', () => {
  it('getSecretWord is called on App mount', () => {
    setup()

    // check to see if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled()
  })

  it('secretWord does not update on App updae', () => {
    const wrapper = setup()
    mockGetSecretWord.mockClear()
    wrapper.setProps()

    expect(mockGetSecretWord).not.toHaveBeenCalled()
  })
})

describe('secretWord is not null', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup('party')
  })

  it('renders app when secretWord is not null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.exists()).toBe(true)
  })
  it('does not render spinner when secretWord is not null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner')
    expect(spinnerComponent.exists()).toBe(false)
  })
})

describe('secretWord is null', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup(null)
  })

  it('does not render app when secretWord is null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.exists()).toBe(false)
  })
  it('renders spinner when secretWord isnull', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner')
    expect(spinnerComponent.exists()).toBe(true)
  })
})
