/**
 * View Counter Worker
 *
 * Tracks unique page views using Cloudflare Workers + KV
 *
 * KV Namespace binding: VIEW_COUNTS
 *
 * Endpoints:
 *   GET /api/views/:slug - Get view count and optionally increment
 *
 * Query params:
 *   ?increment=true - Increment the count (default: false, just returns count)
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://raduan.xyz',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// TTL for visitor tracking (30 days in seconds)
const VISITOR_TTL = 30 * 24 * 60 * 60;

/**
 * Generate a hash from visitor identifiers
 */
async function hashVisitor(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const userAgent = request.headers.get('User-Agent') || 'unknown';
  const data = `${ip}:${userAgent}`;

  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // Take first 8 chars of hex hash
  return hashArray.slice(0, 4).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Normalize slug - remove leading/trailing slashes, handle index pages
 */
function normalizeSlug(slug) {
  return slug.replace(/^\/+|\/+$/g, '') || 'index';
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Only allow GET requests
    if (request.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: CORS_HEADERS,
      });
    }

    // Parse the path: /api/views/:slug
    const pathMatch = url.pathname.match(/^\/api\/views\/(.+)$/);
    if (!pathMatch) {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: CORS_HEADERS,
      });
    }

    const slug = normalizeSlug(decodeURIComponent(pathMatch[1]));
    const shouldIncrement = url.searchParams.get('increment') === 'true';

    try {
      const countKey = `count:${slug}`;

      if (shouldIncrement) {
        const visitorHash = await hashVisitor(request);
        const seenKey = `seen:${slug}:${visitorHash}`;

        // Check if this visitor has already viewed this page
        const alreadySeen = await env.VIEW_COUNTS.get(seenKey);

        if (!alreadySeen) {
          // New unique visitor - increment count
          const currentCount = parseInt(await env.VIEW_COUNTS.get(countKey) || '0', 10);
          const newCount = currentCount + 1;

          // Use waitUntil to not block the response
          ctx.waitUntil(Promise.all([
            env.VIEW_COUNTS.put(countKey, newCount.toString()),
            env.VIEW_COUNTS.put(seenKey, '1', { expirationTtl: VISITOR_TTL }),
          ]));

          return new Response(JSON.stringify({ slug, count: newCount, unique: true }), {
            headers: CORS_HEADERS,
          });
        }

        // Returning visitor - just return current count
        const count = parseInt(await env.VIEW_COUNTS.get(countKey) || '0', 10);
        return new Response(JSON.stringify({ slug, count, unique: false }), {
          headers: CORS_HEADERS,
        });
      }

      // Just return the count without incrementing
      const count = parseInt(await env.VIEW_COUNTS.get(countKey) || '0', 10);
      return new Response(JSON.stringify({ slug, count }), {
        headers: CORS_HEADERS,
      });

    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: CORS_HEADERS,
      });
    }
  },
};
