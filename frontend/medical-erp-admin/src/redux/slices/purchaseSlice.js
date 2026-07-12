import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  purchases: [],
  selectedPurchase: null,
  loading: false,
  error: null,
}

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setPurchases: (state, action) => {
      state.purchases = action.payload
    },
    addPurchase: (state, action) => {
      state.purchases.push(action.payload)
    },
    updatePurchase: (state, action) => {
      const index = state.purchases.findIndex(p => p.id === action.payload.id)
      if (index !== -1) state.purchases[index] = action.payload
    },
    setSelectedPurchase: (state, action) => {
      state.selectedPurchase = action.payload
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
  setPurchases,
  addPurchase,
  updatePurchase,
  setSelectedPurchase,
  setError,
  clearError,
} = purchaseSlice.actions

export default purchaseSlice.reducer
