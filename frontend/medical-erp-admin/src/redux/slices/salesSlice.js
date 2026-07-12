import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sales: [],
  selectedSale: null,
  loading: false,
  error: null,
}

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setSales: (state, action) => {
      state.sales = action.payload
    },
    addSale: (state, action) => {
      state.sales.push(action.payload)
    },
    updateSale: (state, action) => {
      const index = state.sales.findIndex(s => s.id === action.payload.id)
      if (index !== -1) state.sales[index] = action.payload
    },
    setSelectedSale: (state, action) => {
      state.selectedSale = action.payload
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
  setSales,
  addSale,
  updateSale,
  setSelectedSale,
  setError,
  clearError,
} = salesSlice.actions

export default salesSlice.reducer
