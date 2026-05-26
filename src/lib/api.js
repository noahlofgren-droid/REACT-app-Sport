/**
 * api.js — All API calls to TheSportsDB live in this one file.
 *
 * 💡 WHY ONE FILE?
 * By keeping all API calls together, we have a single place to:
 * - Change the base URL or API key
 * - Add error handling that applies to ALL requests
 * - See every endpoint the app uses at a glance
 *
 * If we ever need to switch to a different sports API, we only change THIS file.
 */

// The base URL for all API requests. "3" is the free API key.
const BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

/**
 * fetchTeams() — Fetches all teams in the Swedish Allsvenskan league.
 *
 * 💡 This is an "async function". The word "async" means this function
 * does something that takes time (like fetching data from the internet).
 * We use "await" inside to wait for the response before continuing.
 *
 * Returns: An array of team objects, or an empty array if something goes wrong.
 */
export async function fetchTeams() {
  // "fetch" is a built-in browser function that makes HTTP requests (like visiting a URL).
  // "await" pauses here until the response comes back from the server.
  const response = await fetch(
    `${BASE_URL}/search_all_teams.php?l=Swedish_Allsvenskan`
  );

  // If the server returned an error (like 404 Not Found or 500 Server Error),
  // we throw an error so the calling code knows something went wrong.
  if (!response.ok) {
    throw new Error(`Failed to fetch teams (status: ${response.status})`);
  }

  // Convert the response from raw text into a JavaScript object.
  // The API returns JSON (JavaScript Object Notation) — a standard data format.
  const data = await response.json();

  // The API wraps the team list inside a "teams" property.
  // If "teams" is null (no results), we return an empty array instead.
  // The "||" means "or" — use the left side if it exists, otherwise use the right side.
  return data.teams || [];
}

/**
 * fetchTeamById(id) — Fetches detailed information for ONE specific team.
 *
 * 💡 "id" is a parameter — the caller passes in the team's unique ID number.
 * For example: fetchTeamById("133816") gets details for a specific team.
 *
 * 💡 WHY NOT USE lookupteam.php?
 * The free API tier's lookupteam.php only returns Arsenal data regardless of ID.
 * So instead, we fetch ALL teams from the league and find the one matching our ID.
 * The data returned is the same — same fields, same detail level.
 *
 * Returns: A single team object with all its details.
 */
export async function fetchTeamById(id) {
  // Fetch the full team list (this works on the free tier)
  const allTeams = await fetchTeams();

  // .find() searches through the array and returns the FIRST item where
  // the condition is true. Here we're looking for the team whose ID matches.
  // 💡 String(id) ensures we're comparing the same types (string to string).
  const team = allTeams.find((t) => String(t.idTeam) === String(id));

  if (!team) {
    throw new Error("Team not found");
  }

  return team;
}

/**
 * fetchLastEvents(teamId) — Fetches the most recent match results for a team.
 *
 * Returns: An array of recent match/event objects, or an empty array.
 */
export async function fetchLastEvents(teamId) {
  const response = await fetch(`${BASE_URL}/eventslast.php?id=${teamId}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch recent matches (status: ${response.status})`
    );
  }

  const data = await response.json();

  // "results" is the property name the API uses for past events.
  return data.results || [];
}
