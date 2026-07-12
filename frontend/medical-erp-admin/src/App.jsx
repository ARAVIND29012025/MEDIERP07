import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import store from './redux/store'
import theme from './theme/theme'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/layout/MainLayout'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Company from './pages/Company'
import Category from './pages/Category'
import Supplier from './pages/Supplier'
import Customer from './pages/Customer'
import Medicine from './pages/Medicine'
import Purchase from './pages/Purchase'
import Sales from './pages/Sales'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/company"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Company />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/category"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Category />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/supplier"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Supplier />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Customer />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/medicine"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Medicine />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchase"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Purchase />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Sales />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Reports />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </Provider>
  )
}

export default App
