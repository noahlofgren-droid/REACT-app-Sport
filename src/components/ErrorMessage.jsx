/**
 * ErrorMessage.jsx — Displays an error message with a retry button.
 *
 * 💡 PROPS: This component receives data from its parent via "props".
 * Props are like function arguments — the parent passes data DOWN to the child.
 *
 *   - message: The error text to display (string)
 *   - onRetry: A function to call when the user clicks "Try Again" (function)
 *
 * Example usage: <ErrorMessage message="Network error" onRetry={handleRetry} />
 */

export default function ErrorMessage({ message, onRetry }) {
  // 💡 The { message, onRetry } syntax is called "destructuring".
  // It's a shorthand for pulling specific properties out of the props object.
  // Without destructuring, we'd write: function ErrorMessage(props) { props.message... }

  return (
    <div className="error-container">
      {/* Error icon */}
      <span className="error-icon">⚠️</span>

      <h2 className="error-title">Something went wrong</h2>

      {/* Display the error message passed in via props */}
      <p className="error-message">{message}</p>

      {/* 
        💡 onClick={onRetry} means: when this button is clicked, 
        call the onRetry function that was passed in as a prop.
        This lets the PARENT component decide what "retry" does.
      */}
      {onRetry && (
        <button className="error-retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
