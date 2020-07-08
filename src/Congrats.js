import React from 'react'

/**
 * FUnctional react component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if 'success prop is)
 */
export default props => {
  if (props.success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          Congratulations! You have guessed the word!
        </span>
      </div>
    )
  } else {
    return <div data-test="component-congrats"></div>
  }
}
