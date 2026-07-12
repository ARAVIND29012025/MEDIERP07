import React, { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginSuccess, loginFailure, setLoading } from '../redux/slices/authSlice'
import { authAPI } from '../api/apiServices'
import { toast } from 'react-toastify'

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector(state => state.auth)
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: '', password: '' },
  })

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard')
    return null
  }

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true))
      const response = await authAPI.login(data.email, data.password)
      
      dispatch(loginSuccess({
        user: response.data.user,
        token: response.data.token,
      }))
      
      toast.success('Login successful')
      navigate('/dashboard')
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      dispatch(loginFailure(message))
      toast.error(message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 700, color: '#667eea' }}>
            Medical ERP
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary' }}>
            Admin Login
          </Typography>

          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={loading}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={loading}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', textAlign: 'center' }}>
            Demo Credentials:
            <br />
            Email: admin@medicalepr.com
            <br />
            Password: password123
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login
