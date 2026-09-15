const CHUNK_FAILURE = /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS|Loading (?:CSS )?chunk .+ failed/i;
const RETRY_KEY = 'avante-route-recovery';

// A tab opened before a deployment can request a chunk that no longer exists.
// Reload the destination once, rather than reloading the page it came from.
export function recoverRoute(error, destination, { storage, navigate, online, build }) {
  if (!online || !CHUNK_FAILURE.test(String(error?.message ?? error))) return false;
  const attempt = JSON.stringify([build, destination]);
  try {
    if (storage.getItem(RETRY_KEY) === attempt) return false;
    storage.setItem(RETRY_KEY, attempt);
  } catch {
    // Without persistent storage we cannot safely guard against reload loops.
    return false;
  }
  navigate(destination);
  return true;
}
