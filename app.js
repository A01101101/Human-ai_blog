/**
 * DIILULU - Client-side JavaScript
 * Features:
 * - Relative time formatting (e.g., "2 days ago", "just now")
 * - Automatic excerpt truncation to 150 characters
 * - Real-time time updates every 60 seconds
 */

// Convert timestamp to relative time string (e.g., "2 days ago", "just now")
function relativeFromNow(date) {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;

  const diffWk = Math.floor(diffDay / 7);
  if (diffWk < 5) return `${diffWk}w ago`;

  const diffMo = Math.floor(diffDay / 30);
  if (diffMo < 12) return `${diffMo}mo ago`;

  const diffYr = Math.floor(diffDay / 365);
  return `${diffYr}y ago`;
}

function updatePostTimes() {
  document.querySelectorAll(".post-meta .posted-at").forEach((timeEl) => {
    const raw = timeEl.getAttribute("datetime");
    const postedDate = new Date(raw);

    if (Number.isNaN(postedDate.getTime())) return;

    const formatted = postedDate.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });

    timeEl.textContent = formatted;

    const agoEl = timeEl.parentElement.querySelector(".ago");
    if (agoEl) agoEl.textContent = `(${relativeFromNow(postedDate)})`;
  });
}

function truncateExcerpts() {
  document.querySelectorAll(".post-excerpt").forEach((excerpt) => {
    const text = excerpt.textContent.trim();
    if (text.length > 150) {
      excerpt.textContent = text.substring(0, 150).trim() + "...";
    }
  });
}

updatePostTimes();
truncateExcerpts();
setInterval(updatePostTimes, 60000);
