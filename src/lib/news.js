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
    try {
      const query = toQuery({ isPublished, isFeatured, categoryId, q, limit, skip });
      const res = await fetch(`${API_BASE_URL}/news${query}`, { cache: 'no-store' });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await safeParseJson(res);
      if (data?.success === false) {
        const msg = data?.error?.message || data?.message || 'Failed to load news';
        throw new Error(msg);
      }
      
      return data?.data || { items: [], pagination: { total: 0, limit, skip, hasMore: false } };
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error(`Failed to load news: ${error.message}`);
    }
  },

  // GET /api/news/:id
  async getNews(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/news/${id}`, { cache: 'no-store' });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await safeParseJson(res);
      if (data?.success === false) {
        const msg = data?.error?.message || data?.message || 'Failed to load news item';
        throw new Error(msg);
      }
      
      return data?.data?.item;
    } catch (error) {
      console.error('Error fetching news item:', error);
      throw new Error(`Failed to load news item: ${error.message}`);
    }
  },

  // GET /api/news/categories
  async listCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}/news/categories`, { cache: 'no-store' });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await safeParseJson(res);
      if (data?.success === false) {
        const msg = data?.error?.message || data?.message || 'Failed to load categories';
        throw new Error(msg);
      }
      
      return data?.data?.items || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error(`Failed to load categories: ${error.message}`);
    }
  },

  // POST /api/newsletter/subscribe
  async subscribeNewsletter({ email, firstName, lastName }) {
    try {
      const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await safeParseJson(res);
      if (data?.success === false) {
        const msg = data?.error?.message || data?.message || 'Subscription failed';
        throw new Error(msg);
      }
      
      return data;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw new Error(`Subscription failed: ${error.message}`);
    }
  },

  // DELETE /api/newsletter/unsubscribe
  async unsubscribeNewsletter({ email }) {
    try {
      const res = await fetch(`${API_BASE_URL}/newsletter/unsubscribe`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await safeParseJson(res);
      if (data?.success === false) {
        const msg = data?.error?.message || data?.message || 'Unsubscribe failed';
        throw new Error(msg);
      }
      
      return data;
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      throw new Error(`Unsubscribe failed: ${error.message}`);
    }
  },
};

export default newsService;


