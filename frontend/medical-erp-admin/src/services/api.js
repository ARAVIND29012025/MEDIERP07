const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authorization token if it exists (except for login/register endpoints)
  if (!path.includes('/auth/login') && !path.includes('/auth/register')) {
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...options,
  });

  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    } catch (err) {
      throw new Error('API request failed');
    }
  }

  return response.json();
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export default { request, getToken, getUser, logout };
