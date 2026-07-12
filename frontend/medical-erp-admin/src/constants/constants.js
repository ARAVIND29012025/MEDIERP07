export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  
  // Masters
  COMPANY: '/company',
  CATEGORY: '/category',
  MANUFACTURER: '/manufacturer',
  GENERIC: '/generic',
  UNIT: '/unit',
  RACK: '/rack',
  WAREHOUSE: '/warehouse',
  SUPPLIER: '/supplier',
  CUSTOMER: '/customer',
  DOCTOR: '/doctor',
  
  // Medicine
  MEDICINE: '/medicine',
  
  // Purchase
  PURCHASE: '/purchase',
  
  // Sales
  SALES: '/sales',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  
  // Reports
  REPORTS: '/reports',
}

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]
export const DEFAULT_PAGE_SIZE = 10

export const STATUS_OPTIONS = [
  { value: 1, label: 'Active' },
  { value: 0, label: 'Inactive' },
]

export const PAYMENT_MODES = [
  { value: 'CASH', label: 'Cash' },
  { value: 'UPI', label: 'UPI' },
  { value: 'CARD', label: 'Card' },
  { value: 'CREDIT', label: 'Credit' },
  { value: 'CHEQUE', label: 'Cheque' },
]

export const PACKING_TYPES = [
  'Tablet',
  'Strip',
  'Box',
  'Carton',
  'Bottle',
  'Vial',
  'Capsule',
  'Injection',
]

export const SCHEDULE_OPTIONS = [
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'H7',
  'H8',
  'H9',
  'H10',
]
