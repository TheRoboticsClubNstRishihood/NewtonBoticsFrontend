const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api';
import authService from './auth';

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

export const projectRequestsService = {
  // GET /api/project-requests (auth optional)
  async list({ status, mentorId, submittedBy, limit = 20, skip = 0 } = {}) {
    const query = toQuery({ status, mentorId, submittedBy, limit, skip });
    const url = `${API_BASE_URL}/project-requests${query}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const data = await safeParseJson(res);
    if (data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Failed to load project requests';
      throw new Error(msg);
    }
    return data?.data || { items: [], pagination: { total: 0, limit, skip, hasMore: false } };
  },

  // GET /api/project-requests/:id (public)
  async get(id) {
    const res = await fetch(`${API_BASE_URL}/project-requests/${id}`, { cache: 'no-store' });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const data = await safeParseJson(res);
    if (data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Failed to load project request';
      throw new Error(msg);
    }
    return data?.data?.item || null;
  },

  // POST /api/project-requests (auth: team member)
  async create({ title, description, teamSize, estimatedDurationMonths }) {
    await authService.ensureValidToken();
    const res = await authService.makeAuthenticatedRequest(`${API_BASE_URL}/project-requests`, {
      method: 'POST',
      body: JSON.stringify({ title, description, teamSize, estimatedDurationMonths }),
    });
    const data = await safeParseJson(res);
    if (!res.ok || data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Create request failed';
      throw new Error(msg);
    }
    return data?.data?.item;
  },

  // PUT /api/project-requests/:id (auth: mentor)
  async update(id, payload) {
    await authService.ensureValidToken();
    const res = await authService.makeAuthenticatedRequest(`${API_BASE_URL}/project-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    const data = await safeParseJson(res);
    if (res.status === 404) return null;
    if (!res.ok || data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Update request failed';
      throw new Error(msg);
    }
    return data?.data?.item;
  },

  // POST /api/project-requests/:id/approve (auth: mentor)
  async approve(id) {
    await authService.ensureValidToken();
    const res = await authService.makeAuthenticatedRequest(`${API_BASE_URL}/project-requests/${id}/approve`, {
      method: 'POST',
    });
    const data = await safeParseJson(res);
    if (res.status === 404) return null;
    if (!res.ok || data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Approve failed';
      throw new Error(msg);
    }
    return data?.data?.request || data?.data?.item;
  },

  // POST /api/project-requests/:id/reject (auth: mentor)
  async reject(id, { reason } = {}) {
    await authService.ensureValidToken();
    const res = await authService.makeAuthenticatedRequest(`${API_BASE_URL}/project-requests/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
    const data = await safeParseJson(res);
    if (res.status === 404) return null;
    if (!res.ok || data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Reject failed';
      throw new Error(msg);
    }
    return data?.data?.request || data?.data?.item;
  },

  // DELETE /api/project-requests/:id (auth: admin)
  async remove(id) {
    await authService.ensureValidToken();
    const res = await authService.makeAuthenticatedRequest(`${API_BASE_URL}/project-requests/${id}`, {
      method: 'DELETE',
    });
    const data = await safeParseJson(res);
    if (res.status === 404) return false;
    if (!res.ok || data?.success === false) {
      const msg = data?.error?.message || data?.message || 'Delete failed';
      throw new Error(msg);
    }
    return true;
  },
};

export default projectRequestsService;


