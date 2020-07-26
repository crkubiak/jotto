import React from 'react'
import { shallow, mount } from 'enzyme'

import guessedWordsContext from './guessedWordsContext'

const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWord()
  return <div />
}

it('useGuessedWord throws an error when not wrapped in GuessedWordProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />)
  }).toThrow('useGuessedWord must be used within a GuessedWordProvider')
})

it('useGuessedWord does not throw an error when wrapped in GuessedWordProvider', () => {
  expect(() => {
    mount(
      <guessedWordsContext.GuessedWordProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordProvider>
    )
  }).not.toThrow()
})
