/**
 * page.js — The HOME PAGE of the app (URL: /)
 *
 * 💡 In Next.js, the file path determines the URL:
 *    src/app/page.js → "/"  (the home page)
 *
 * This page fetches all Allsvenskan teams and displays them in a grid.
 * Each team is rendered as a clickable TeamCard component.
 */

// 💡 "use client" tells Next.js this component runs in the BROWSER (client-side).
// We need this because we use useState and useEffect, which only work in the browser.
// Without this, Next.js would try to run this code on the server.
"use client";

// Import React hooks for managing state and side effects.
// Think of hooks as special React functions that give components "superpowers".
import { useState, useEffect } from "react";

// Import our API function and UI components
import { fetchTeams } from "@/lib/api";
import TeamCard from "@/components/TeamCard";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";

export default function TeamsPage() {
  // ──────────────────────────────────────────────────────────
  // STATE — Variables that can change over time.
  // When state changes, React automatically re-renders (redraws) the page.
  // ──────────────────────────────────────────────────────────

  // 💡 useState returns TWO things: [currentValue, functionToUpdateIt]
  // We use "array destructuring" to give them names.

  // "teams" holds the array of team data from the API. Starts as empty array [].
  const [teams, setTeams] = useState([]);

  // "loading" is true while we're waiting for data, false when done.
  const [loading, setLoading] = useState(true);

  // "error" holds an error message string, or null if no error.
  const [error, setError] = useState(null);

  // ──────────────────────────────────────────────────────────
  // DATA FETCHING — Load teams when the page first appears.
  // ──────────────────────────────────────────────────────────

  // 💡 useEffect runs code AFTER the component renders.
  // The empty array [] as the second argument means "run this only ONCE when the page loads".
  // This is where we fetch data — we don't want to fetch on every single re-render.
  useEffect(() => {
    loadTeams();
  }, []);

  /**
   * loadTeams() — Fetches teams from the API and updates state.
   *
   * This function handles all three states:
   * 1. LOADING: Show spinner while fetching
   * 2. SUCCESS: Show the team data
   * 3. ERROR: Show error message with retry option
   */
  async function loadTeams() {
    // Start loading — this makes the spinner appear
    setLoading(true);
    // Clear any previous errors
    setError(null);

    try {
      // 💡 "try/catch" is error handling. Code in "try" runs normally.
      // If anything goes wrong (network error, API down), execution jumps to "catch".
      const data = await fetchTeams();
      setTeams(data); // SUCCESS: store the teams in state
    } catch (err) {
      // FAILURE: store the error message in state
      setError(err.message);
    } finally {
      // 💡 "finally" runs whether the try succeeded OR failed.
      // We always want to stop the loading spinner.
      setLoading(false);
    }
  }

  // ──────────────────────────────────────────────────────────
  // RENDER — What the user sees on screen.
  // ──────────────────────────────────────────────────────────

  // 💡 React components return JSX — HTML-like syntax that describes the UI.
  // The function runs again every time state changes, returning updated UI.

  return (
    <main className="main-content">
      {/* Page title section */}
      <section className="page-hero">
        <h2 className="page-title">Teams</h2>
        <p className="page-description">
          Explore the teams of the Swedish Allsvenskan league
        </p>
      </section>

      {/* 
        CONDITIONAL RENDERING — Show different content based on the current state.
        💡 This is a very common React pattern using ternary operators:
            condition ? showIfTrue : showIfFalse
      */}
      {loading ? (
        // STATE 1: Still loading → show spinner
        <Loader />
      ) : error ? (
        // STATE 2: Error occurred → show error with retry button
        // "onRetry={loadTeams}" passes our fetch function so the user can try again
        <ErrorMessage message={error} onRetry={loadTeams} />
      ) : (
        // STATE 3: Data loaded successfully → show the team grid
        <section className="teams-grid">
          {/* 
            💡 .map() loops over the teams array and creates a TeamCard for each one.
            It's like a "for each team, render this" instruction.
            
            "key" is required by React when rendering lists — it helps React
            efficiently update only the items that changed, not the entire list.
          */}
          {teams.map((team) => (
            <TeamCard key={team.idTeam} team={team} />
          ))}
        </section>
      )}
    </main>
  );
}
