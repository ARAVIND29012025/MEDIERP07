import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  companies: [],
  categories: [],
  manufacturers: [],
  generics: [],
  units: [],
  racks: [],
  warehouses: [],
  hsns: [],
  gstConfigs: [],
  taxGroups: [],
  suppliers: [],
  customers: [],
  doctors: [],
  loading: false,
  error: null,
}

const masterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    // Company
    setCompanies: (state, action) => {
      state.companies = action.payload
    },
    addCompany: (state, action) => {
      state.companies.push(action.payload)
    },
    updateCompany: (state, action) => {
      const index = state.companies.findIndex(c => c.id === action.payload.id)
      if (index !== -1) state.companies[index] = action.payload
    },
    // Category
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(c => c.id === action.payload.id)
      if (index !== -1) state.categories[index] = action.payload
    },
    // Add similar actions for other masters...
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setLoading,
  setCompanies,
  addCompany,
  updateCompany,
  setCategories,
  addCategory,
  updateCategory,
  setError,
  clearError,
} = masterSlice.actions

export default masterSlice.reducer
