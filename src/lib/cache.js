// Simple in-memory cache for API responses
// This reduces API calls by caching answers to similar questions

const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour cache TTL

// Normalize question for better cache hits
function normalizeQuestion(question) {
  return question
    .toLowerCase()
    .trim()
    .replace(/[?!.,]/g, "")
    .replace(/\s+/g, " ");
}

// Generate cache key from question
function getCacheKey(question) {
  const normalized = normalizeQuestion(question);

  // Check for common question patterns and map to canonical forms
  const patterns = [
    { match: /skill|tech|stack|know|expertise/i, key: "skills" },
    { match: /experience|work|job|company|employ/i, key: "experience" },
    { match: /project|built|develop|create/i, key: "projects" },
    { match: /education|degree|college|university|study/i, key: "education" },
    { match: /contact|email|phone|reach|linkedin/i, key: "contact" },
    { match: /who|about|tell me about|introduce/i, key: "about" },
    { match: /payment|razorpay|stripe/i, key: "payments" },
    { match: /react|next|frontend|front-end/i, key: "frontend" },
    { match: /supabase|firebase|backend/i, key: "backend" },
  ];

  for (const pattern of patterns) {
    if (pattern.match.test(normalized)) {
      return `pattern:${pattern.key}`;
    }
  }

  // For unique questions, use the normalized string
  return `exact:${normalized}`;
}

// Get cached response
export function getCachedResponse(question) {
  const key = getCacheKey(question);
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log(`Cache hit for: ${key}`);
    return cached.response;
  }

  if (cached) {
    cache.delete(key); // Remove expired cache
  }

  return null;
}

// Set cached response
export function setCachedResponse(question, response) {
  const key = getCacheKey(question);
  cache.set(key, {
    response,
    timestamp: Date.now(),
  });
  console.log(`Cached response for: ${key}`);
}

// Clear all cache
export function clearCache() {
  cache.clear();
}

// Get cache stats
export function getCacheStats() {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}
