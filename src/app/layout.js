/**
 * layout.js — The ROOT LAYOUT that wraps every page.
 *
 * 💡 In Next.js, layout.js is like a "shell" that wraps all pages.
 * It contains things that are shared across the entire app:
 * - The <html> and <body> tags
 * - The Header component (shown on every page)
 * - Font imports
 * - The globals.css stylesheet
 *
 * The {children} prop is whatever page is currently being viewed.
 */

// Import the global stylesheet — this applies to ALL pages
import "./globals.css";

// Import our Header component
import Header from "@/components/Header";

// 💡 "metadata" is a special Next.js object for SEO (Search Engine Optimization).
// It sets the page title and description that appear in browser tabs and search results.
export const metadata = {
  title: "Allsvenskan Explorer — Swedish Football League",
  description:
    "Explore teams and matches from the Swedish Allsvenskan football league",
};

export default function RootLayout({ children }) {
  return (
    // lang="en" tells browsers and screen readers the page is in English
    <html lang="en">
      <head>
        {/* 
          Import the "Inter" font from Google Fonts.
          💡 Inter is a popular modern font used by companies like Vercel, Linear, etc.
          We load it from Google's CDN (Content Delivery Network) so it loads fast.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Header is shown on EVERY page because it's in the layout */}
        <Header />

        {/* 
          💡 {children} is replaced with the current page's content.
          When you're on "/" → children = <TeamsPage />
          When you're on "/team/123" → children = <TeamDetailPage />
        */}
        {children}
      </body>
    </html>
  );
}
