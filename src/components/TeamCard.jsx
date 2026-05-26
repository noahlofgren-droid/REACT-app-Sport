/**
 * TeamCard.jsx — Displays one team as a clickable card in the grid.
 *
 * 💡 This is a "presentational component" — it only displays data.
 * It doesn't fetch anything or manage state. It just receives a "team" object
 * via props and renders it. This makes it simple, reusable, and easy to test.
 *
 * Props:
 *   - team: An object containing team data from the API
 */

import Link from "next/link";

export default function TeamCard({ team }) {
  return (
    // Link wraps the entire card, making it clickable.
    // Clicking navigates to /team/[idTeam] — the team detail page.
    // 💡 Template literal: `/team/${team.idTeam}` inserts the team's ID into the URL.
    <Link href={`/team/${team.idTeam}`} className="team-card">
      {/* Team badge/logo image */}
      <div className="team-card-badge">
        {/* 
          💡 The "alt" attribute describes the image for screen readers 
          and shows as text if the image fails to load. Important for accessibility.
        */}
        <img
          src={team.strBadge}
          alt={`${team.strTeam} badge`}
          width={120}
          height={120}
        />
      </div>

      {/* Team info section */}
      <div className="team-card-info">
        <h2 className="team-card-name">{team.strTeam}</h2>

        {/* 
          Only show the stadium if the data exists.
          💡 "&&" here means: if the left side is true, render the right side.
          This is called "conditional rendering" — a very common React pattern.
        */}
        {team.strStadium && (
          <p className="team-card-detail">
            <span className="detail-icon">🏟️</span>
            {team.strStadium}
          </p>
        )}

        {team.intFormedYear && (
          <p className="team-card-detail">
            <span className="detail-icon">📅</span>
            Founded {team.intFormedYear}
          </p>
        )}
      </div>
    </Link>
  );
}
