import React from 'react'
import { TextField } from '@mui/material'

const QuantityInput = ({
  label,
  value,
  onChange,
  error = false,
  helperText = '',
  required = false,
  disabled = false,
  allowDecimals = true,
  ...props
}) => {
  const handleChange = (e) => {
    let inputValue = e.target.value
    
    if (allowDecimals) {
      inputValue = inputValue.replace(/[^\d.]/g, '')
      const parts = inputValue.split('.')
      if (parts.length > 2) return
    } else {
      inputValue = inputValue.replace(/[^\d]/g, '')
    }
    
    onChange(inputValue ? parseFloat(inputValue) : 0)
  }

  return (
    <TextField
      label={label}
      type="text"
      value={value || ''}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      size="small"
      variant="outlined"
      inputProps={{
        step: allowDecimals ? '0.01' : '1',
      }}
      {...props}
    />
  )
}

export default QuantityInput
