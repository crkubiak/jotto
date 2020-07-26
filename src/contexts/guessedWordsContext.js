import React from 'react'

const guessedWordsContext = React.createContext()

/**
 * @function useGuessedWord
 * @returns {} -
 */

function useGuessedWord() {
  const context = React.useContext(guessedWordsContext)

  if (!context) {
    throw new Error('useGuessedWord must be used within a GuessedWordProvider')
  }
  return context
}
/**
 * @function GuessedWordProvider
 * @param {object} - props to pass through from declared component
 * @returns {JSX.Element} - Provider Component
 */
function GuessedWordProvider(props) {
  const [guessedWord, setGuessedWord] = React.useState(false)

  const value = React.useMemo(() => [guessedWord, setGuessedWord], [
    guessedWord
  ])

  return <guessedWordsContext.Provider value={value} {...props} />
}

export default { GuessedWordProvider, useGuessedWord }
