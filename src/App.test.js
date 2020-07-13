import React from 'react'
import App from './App'
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import hookActions from './actions/hookActions'

const mockGetSecretWord = jest.fn()

const setup = () => {
  mockGetSecretWord.mockClear()
  hookActions.getSecretWord = mockGetSecretWord

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
