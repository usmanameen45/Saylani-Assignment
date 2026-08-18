/**
 * formatDate — formats an ISO date string into a human-readable date.
 *
 * @param {string} iso — ISO 8601 date string
 * @returns {string}   — e.g. "Aug 5, 2024"
 */
export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}
