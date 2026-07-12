import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  kpis: {
    todaySales: 0,
    todayPurchase: 0,
    lowStock: 0,
    nearExpiry: 0,
    expiredMedicines: 0,
    totalCustomers: 0,
    totalSuppliers: 0,
    totalMedicines: 0,
  },
  charts: {
    monthlySales: [],
    monthlyPurchase: [],
    topSellingMedicines: [],
  },
  loading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setKPIs: (state, action) => {
      state.kpis = { ...state.kpis, ...action.payload }
    },
    setCharts: (state, action) => {
      state.charts = { ...state.charts, ...action.payload }
    },
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
  setKPIs,
  setCharts,
  setError,
  clearError,
} = dashboardSlice.actions

export default dashboardSlice.reducer
