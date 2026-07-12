import React from 'react'
import { TextField } from '@mui/material'

const MoneyInput = ({
  label,
  value,
  onChange,
  error = false,
  helperText = '',
  required = false,
  disabled = false,
  precision = 2,
  ...props
}) => {
  const handleChange = (e) => {
    const inputValue = e.target.value
    // Remove non-numeric characters except decimal point
    const numericValue = inputValue.replace(/[^\d.]/g, '')
    const parts = numericValue.split('.')
    
    // Ensure only one decimal point
    if (parts.length > 2) return
    
    // Ensure precision
    if (parts[1] && parts[1].length > precision) {
      return
    }
    
    onChange(parseFloat(numericValue) || 0)
  }

  const displayValue = value ? value.toFixed(precision) : ''

  return (
    <TextField
      label={label}
      type="text"
      value={displayValue}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      InputProps={{
        startAdornment: '₹ ',
      }}
      size="small"
      variant="outlined"
      {...props}
    />
  )
}

export default MoneyInput
