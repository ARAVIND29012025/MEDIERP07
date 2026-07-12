import axiosInstance from './axiosInstance'

// Authentication APIs
export const authAPI = {
  login: (username, password) => 
    axiosInstance.post('/auth/login', { username, password }),
  logout: () => 
    axiosInstance.post('/auth/logout'),
  refreshToken: () => 
    axiosInstance.post('/auth/refresh'),
}

// Company APIs
export const companyAPI = {
  getAll: (page = 1, limit = 10) => 
    axiosInstance.get('/company', { params: { page, limit } }),
  getById: (id) => 
    axiosInstance.get(`/company/${id}`),
  create: (data) => 
    axiosInstance.post('/company', data),
  update: (id, data) => 
    axiosInstance.put(`/company/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/company/${id}`),
}

// Category APIs
export const categoryAPI = {
  getAll: (page = 1, limit = 10, search = '') => 
    axiosInstance.get('/category', { params: { page, limit, search } }),
  getById: (id) => 
    axiosInstance.get(`/category/${id}`),
  create: (data) => 
    axiosInstance.post('/category', data),
  update: (id, data) => 
    axiosInstance.put(`/category/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/category/${id}`),
}

// Manufacturer APIs
export const manufacturerAPI = {
  getAll: (page = 1, limit = 10, search = '') => 
    axiosInstance.get('/manufacturer', { params: { page, limit, search } }),
  getById: (id) => 
    axiosInstance.get(`/manufacturer/${id}`),
  create: (data) => 
    axiosInstance.post('/manufacturer', data),
  update: (id, data) => 
    axiosInstance.put(`/manufacturer/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/manufacturer/${id}`),
}

// Generic APIs
export const genericAPI = {
  getAll: (page = 1, limit = 10, search = '') => 
    axiosInstance.get('/generic', { params: { page, limit, search } }),
  getById: (id) => 
    axiosInstance.get(`/generic/${id}`),
  create: (data) => 
    axiosInstance.post('/generic', data),
  update: (id, data) => 
    axiosInstance.put(`/generic/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/generic/${id}`),
}

// Unit APIs
export const unitAPI = {
  getAll: () => 
    axiosInstance.get('/unit'),
  getById: (id) => 
    axiosInstance.get(`/unit/${id}`),
  create: (data) => 
    axiosInstance.post('/unit', data),
  update: (id, data) => 
    axiosInstance.put(`/unit/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/unit/${id}`),
}

// Rack APIs
export const rackAPI = {
  getAll: () => 
    axiosInstance.get('/rack'),
  getById: (id) => 
    axiosInstance.get(`/rack/${id}`),
  create: (data) => 
    axiosInstance.post('/rack', data),
  update: (id, data) => 
    axiosInstance.put(`/rack/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/rack/${id}`),
}

// Warehouse APIs
export const warehouseAPI = {
  getAll: () => 
    axiosInstance.get('/warehouse'),
  getById: (id) => 
    axiosInstance.get(`/warehouse/${id}`),
  create: (data) => 
    axiosInstance.post('/warehouse', data),
  update: (id, data) => 
    axiosInstance.put(`/warehouse/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/warehouse/${id}`),
}

// Supplier APIs
export const supplierAPI = {
  getAll: (page = 1, limit = 10, search = '') => 
    axiosInstance.get('/supplier', { params: { page, limit, search } }),
  getById: (id) => 
    axiosInstance.get(`/supplier/${id}`),
  create: (data) => 
    axiosInstance.post('/supplier', data),
  update: (id, data) => 
    axiosInstance.put(`/supplier/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/supplier/${id}`),
}

// Customer APIs
export const customerAPI = {
  getAll: (page = 1, limit = 10, search = '') => 
    axiosInstance.get('/customer', { params: { page, limit, search } }),
  getById: (id) => 
    axiosInstance.get(`/customer/${id}`),
  create: (data) => 
    axiosInstance.post('/customer', data),
  update: (id, data) => 
    axiosInstance.put(`/customer/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/customer/${id}`),
}

// Medicine APIs
export const medicineAPI = {
  getAll: (page = 1, limit = 10, filters = {}) => 
    axiosInstance.get('/medicine', { params: { page, limit, ...filters } }),
  getById: (id) => 
    axiosInstance.get(`/medicine/${id}`),
  create: (data) => 
    axiosInstance.post('/medicine', data),
  update: (id, data) => 
    axiosInstance.put(`/medicine/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/medicine/${id}`),
  search: (query) => 
    axiosInstance.get('/medicine/search', { params: { q: query } }),
}

// Purchase APIs
export const purchaseAPI = {
  getAll: (page = 1, limit = 10) => 
    axiosInstance.get('/purchase', { params: { page, limit } }),
  getById: (id) => 
    axiosInstance.get(`/purchase/${id}`),
  create: (data) => 
    axiosInstance.post('/purchase', data),
  update: (id, data) => 
    axiosInstance.put(`/purchase/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/purchase/${id}`),
}

// Sales APIs
export const salesAPI = {
  getAll: (page = 1, limit = 10) => 
    axiosInstance.get('/sales', { params: { page, limit } }),
  getById: (id) => 
    axiosInstance.get(`/sales/${id}`),
  create: (data) => 
    axiosInstance.post('/sales', data),
  update: (id, data) => 
    axiosInstance.put(`/sales/${id}`, data),
  delete: (id) => 
    axiosInstance.delete(`/sales/${id}`),
}

// Dashboard APIs
export const dashboardAPI = {
  getKPIs: () => 
    axiosInstance.get('/dashboard/kpis'),
  getCharts: (period = 'monthly') => 
    axiosInstance.get('/dashboard/charts', { params: { period } }),
}

// Reports APIs
export const reportsAPI = {
  salesReport: (filters) => 
    axiosInstance.post('/reports/sales', filters),
  purchaseReport: (filters) => 
    axiosInstance.post('/reports/purchase', filters),
  stockReport: (filters) => 
    axiosInstance.post('/reports/stock', filters),
  lowStockReport: () => 
    axiosInstance.get('/reports/low-stock'),
  nearExpiryReport: () => 
    axiosInstance.get('/reports/near-expiry'),
}

// Settings APIs
export const settingsAPI = {
  getSettings: () => 
    axiosInstance.get('/settings'),
  updateSettings: (data) => 
    axiosInstance.put('/settings', data),
  backup: () => 
    axiosInstance.post('/settings/backup'),
  restore: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return axiosInstance.post('/settings/restore', formData)
  },
}
