/**
 * Loader.jsx — A spinning loading indicator.
 *
 * 💡 This is shown whenever we're waiting for data from the API.
 * It's a reusable component — we use <Loader /> anywhere we need it.
 * The spinning animation is done with pure CSS (defined in globals.css).
 */

export default function Loader() {
  return (
    <div className="loader-container">
      {/* This div is styled as a spinning circle using CSS @keyframes animation */}
      <div className="loader-spinner"></div>
      <p className="loader-text">Loading...</p>
    </div>
  );
}
