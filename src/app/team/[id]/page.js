/**
 * team/[id]/page.js — The TEAM DETAIL PAGE (URL: /team/133816)
 *
 * 💡 In Next.js, folder names wrapped in [brackets] are "dynamic routes".
 * The [id] folder means: any URL like /team/123 or /team/456 will use this page,
 * and we can read the "id" part from the URL using useParams().
 *
 * This page shows detailed information about a single team,
 * including their description, stadium, and recent match results.
 */

"use client";

import { useState, useEffect } from "react";

// 💡 useParams() is a Next.js hook that reads the dynamic parts of the URL.
// For URL "/team/133816", useParams() returns { id: "133816" }.
import { useParams, useRouter } from "next/navigation";

import { fetchTeamById, fetchLastEvents } from "@/lib/api";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";

/**
 * ensureHttps(url) — Makes sure a URL starts with "https://".
 *
 * 💡 The API data is inconsistent — some URLs come as "www.instagram.com/aik",
 * others as just "aikfotboll". This helper normalizes them all to proper URLs.
 * If the URL already starts with "http", we leave it alone.
 * Otherwise, we prepend "https://".
 */
function ensureHttps(url) {
  if (url.startsWith("http")) {
    return url;
  }
  return `https://${url}`;
}

export default function TeamDetailPage() {
  // Read the team ID from the URL (e.g., "/team/133816" → id = "133816")
  const params = useParams();
  const id = params.id;

  // 💡 useRouter() gives us navigation functions.
  // We use router.back() to go back to the previous page.
  const router = useRouter();

  // State for team details
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for recent matches (separate from team details)
  const [lastEvents, setLastEvents] = useState([]);

  // Fetch team data when the page loads or when the ID changes
  useEffect(() => {
    loadTeamData();
  }, [id]); // 💡 [id] means: re-run this effect if the "id" value changes

  /**
   * loadTeamData() — Fetches both team details AND recent matches.
   *
   * 💡 We fetch two things at the same time using Promise.all — but we
   * keep it simple and just do them sequentially here so it's easier to follow.
   */
  async function loadTeamData() {
    setLoading(true);
    setError(null);

    try {
      // Fetch team details
      const teamData = await fetchTeamById(id);
      setTeam(teamData);

      // Fetch recent matches (this might return empty on the free tier)
      try {
        const events = await fetchLastEvents(id);
        setLastEvents(events);
      } catch {
        // If match fetching fails, that's OK — we still show the team info.
        // We just won't have the "Recent Matches" section.
        setLastEvents([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── Loading state ──
  if (loading) return <Loader />;

  // ── Error state ──
  if (error) {
    return (
      <main className="main-content">
        <ErrorMessage message={error} onRetry={loadTeamData} />
      </main>
    );
  }

  // ── No team found ──
  if (!team) {
    return (
      <main className="main-content">
        <ErrorMessage message="Team not found" />
      </main>
    );
  }

  // ── Success: show team details ──
  return (
    <main className="main-content">
      {/* Back button — navigates to the previous page */}
      <button className="back-button" onClick={() => router.back()}>
        ← Back to teams
      </button>

      {/* Team header section with banner image */}
      <section className="team-detail-header">
        {/* 
          Banner image — a wide image of the team/stadium.
          Not all teams have one, so we check with conditional rendering.
        */}
        {team.strBanner && (
          <div className="team-banner">
            <img
              src={team.strBanner}
              alt={`${team.strTeam} banner`}
              className="team-banner-image"
            />
          </div>
        )}

        <div className="team-detail-title">
          {/* Team badge */}
          {team.strBadge && (
            <img
              src={team.strBadge}
              alt={`${team.strTeam} badge`}
              className="team-detail-badge"
              width={100}
              height={100}
            />
          )}

          <div>
            <h1 className="team-detail-name">{team.strTeam}</h1>
            {team.strLeague && (
              <p className="team-detail-league">{team.strLeague}</p>
            )}
          </div>
        </div>
      </section>

      {/* Team info grid — key facts */}
      <section className="team-info-grid">
        {team.intFormedYear && (
          <div className="info-card">
            <span className="info-label">Founded</span>
            <span className="info-value">{team.intFormedYear}</span>
          </div>
        )}

        {team.strStadium && (
          <div className="info-card">
            <span className="info-label">Stadium</span>
            <span className="info-value">{team.strStadium}</span>
          </div>
        )}

        {team.intStadiumCapacity && (
          <div className="info-card">
            <span className="info-label">Capacity</span>
            {/* 
              💡 Number().toLocaleString() formats numbers with commas.
              Example: 50000 → "50,000" — makes big numbers easier to read.
            */}
            <span className="info-value">
              {Number(team.intStadiumCapacity).toLocaleString()}
            </span>
          </div>
        )}

        {team.strCountry && (
          <div className="info-card">
            <span className="info-label">Country</span>
            <span className="info-value">{team.strCountry}</span>
          </div>
        )}
      </section>

      {/* Team description */}
      {team.strDescriptionEN && (
        <section className="team-description">
          <h2>About</h2>
          <p>{team.strDescriptionEN}</p>
        </section>
      )}

      {/* Social media links */}
      {(team.strWebsite || team.strInstagram || team.strTwitter) && (
        <section className="team-socials">
          <h2>Links</h2>
          <div className="socials-list">
            {team.strWebsite && (
              <a
                href={ensureHttps(team.strWebsite)}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                🌐 Website
              </a>
            )}
            {team.strInstagram && (
              <a
                href={ensureHttps(team.strInstagram)}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                📷 Instagram
              </a>
            )}
            {team.strTwitter && (
              <a
                href={ensureHttps(team.strTwitter)}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                𝕏 Twitter
              </a>
            )}
          </div>
        </section>
      )}

      {/* Recent matches section */}
      {lastEvents.length > 0 && (
        <section className="team-matches">
          <h2>Recent Matches</h2>
          <div className="matches-list">
            {lastEvents.map((event) => (
              <div key={event.idEvent} className="match-card">
                <div className="match-teams">
                  {/* Home team name */}
                  <span className="match-team home">{event.strHomeTeam}</span>

                  {/* Score — only show if the match has been played */}
                  <span className="match-score">
                    {event.intHomeScore !== null
                      ? `${event.intHomeScore} - ${event.intAwayScore}`
                      : "vs"}
                  </span>

                  {/* Away team name */}
                  <span className="match-team away">{event.strAwayTeam}</span>
                </div>

                {/* Match date */}
                {event.dateEvent && (
                  <span className="match-date">{event.dateEvent}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
