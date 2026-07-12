import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import masterReducer from './slices/masterSlice'
import medicineReducer from './slices/medicineSlice'
import purchaseReducer from './slices/purchaseSlice'
import salesReducer from './slices/salesSlice'
import dashboardReducer from './slices/dashboardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    master: masterReducer,
    medicine: medicineReducer,
    purchase: purchaseReducer,
    sales: salesReducer,
    dashboard: dashboardReducer,
  },
})

export default store
