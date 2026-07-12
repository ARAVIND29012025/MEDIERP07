import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  medicines: [],
  selectedMedicine: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    company: '',
  },
}

const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setMedicines: (state, action) => {
      state.medicines = action.payload
    },
    addMedicine: (state, action) => {
      state.medicines.push(action.payload)
    },
    updateMedicine: (state, action) => {
      const index = state.medicines.findIndex(m => m.id === action.payload.id)
      if (index !== -1) state.medicines[index] = action.payload
    },
    deleteMedicine: (state, action) => {
      state.medicines = state.medicines.filter(m => m.id !== action.payload)
    },
    setSelectedMedicine: (state, action) => {
      state.selectedMedicine = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
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
  setMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  setSelectedMedicine,
  setFilters,
  setError,
  clearError,
} = medicineSlice.actions

export default medicineSlice.reducer
