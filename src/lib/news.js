// Public News and Newsletter API client
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api';

async function safeParseJson(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return response.json();
  const text = await response.text();
  throw new Error(`Unexpected response (${response.status} ${response.statusText}): ${text.slice(0, 200)}`);
}

function toQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    search.set(k, String(v));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export const newsService = {
  // GET /api/news
  async listNews({ isPublished = true, isFeatured, categoryId, q, limit = 20, skip = 0 } = {}) {
    const query = toQuery({ isPublished, isFeatured, categoryId, q, limit, skip });
    const res = await fetch(`${API_BASE_URL}/news${query}`, { cache: 'no-store' });
    const data = await safeParseJson(res);
    if (!res.ok || data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Failed to load news';
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return data?.data || { items: [], pagination: { total: 0, limit, skip, hasMore: false } };
  },

  // GET /api/news/:id
  async getNews(id) {
    const res = await fetch(`${API_BASE_URL}/news/${id}`, { cache: 'no-store' });
    const data = await safeParseJson(res);
    if (!res.ok || data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Failed to load news item';
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return data?.data?.item;
  },

  // GET /api/news/categories
  async listCategories() {
    const res = await fetch(`${API_BASE_URL}/news/categories`, { cache: 'no-store' });
    const data = await safeParseJson(res);
    if (!res.ok || data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Failed to load categories';
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return data?.data?.items || [];
  },

  // POST /api/newsletter/subscribe
  async subscribeNewsletter({ email, firstName, lastName }) {
    const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName, lastName }),
    });
    const data = await safeParseJson(res);
    if (!res.ok || data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Subscription failed';
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return data;
  },

  // DELETE /api/newsletter/unsubscribe
  async unsubscribeNewsletter({ email }) {
    const res = await fetch(`${API_BASE_URL}/newsletter/unsubscribe`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await safeParseJson(res);
    if (!res.ok || data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Unsubscribe failed';
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return data;
  },
};

export default newsService;


