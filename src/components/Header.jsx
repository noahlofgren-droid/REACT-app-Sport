/**
 * Header.jsx — The top navigation bar shown on every page.
 *
 * 💡 This is a "component" — a reusable piece of UI.
 * In React, components are just functions that return HTML-like code (called JSX).
 * We write it once and use it everywhere via <Header />.
 */

// "Link" is a Next.js component for navigating between pages.
// It's like an <a> tag but faster — it doesn't reload the whole page.
import Link from "next/link";

export default function Header() {
  return (
    // "header" is a semantic HTML element — it tells the browser "this is a header".
    <header className="header">
      {/* 
        className is React's version of the HTML "class" attribute.
        We use className instead of class because "class" is a reserved word in JavaScript.
      */}
      <div className="header-content">
        {/* Link to the home page. "/" means the root/home URL. */}
        <Link href="/" className="header-logo">
          {/* ⚽ is a Unicode emoji — works in all browsers */}
          <span className="header-icon">⚽</span>
          <h1>Allsvenskan Explorer</h1>
        </Link>

        <p className="header-subtitle">Swedish Football League</p>
      </div>
    </header>
  );
}
