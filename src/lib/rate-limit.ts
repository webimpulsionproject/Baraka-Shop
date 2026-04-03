/**
 * Rate limiter en mémoire — fonctionne dans le middleware Edge de Next.js.
 * Limites par IP pour protéger les endpoints sensibles.
 *
 * Note : sur Vercel, le middleware Edge reste warm entre les requêtes sur la
 * même instance. Ce limiter est fiable pour la protection de base (brute force,
 * spam). Pour une protection multi-instance garantie, utiliser Upstash Redis.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Nettoyage périodique pour éviter les fuites mémoire
let lastCleanup = Date.now();
function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < 60_000) return; // toutes les 60s max
  lastCleanup = now;
  store.forEach((entry, key) => {
    if (now > entry.resetAt) store.delete(key);
  });
}

/**
 * Vérifie si une IP dépasse la limite pour une clé donnée.
 * @returns true = autorisé, false = bloqué (rate limit atteint)
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  cleanup();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}
