import React from 'react'
import {
  Autocomplete,
  TextField,
} from '@mui/material'

const MasterAutocomplete = ({
  label,
  options,
  value,
  onChange,
  loading = false,
  error = false,
  helperText = '',
  required = false,
  disabled = false,
  getOptionLabel = (option) => option.name || option.label || '',
  ...props
}) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue)
      }}
      getOptionLabel={getOptionLabel}
      loading={loading}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          error={error}
          helperText={helperText}
          variant="outlined"
          size="small"
        />
      )}
      {...props}
    />
  )
}

export default MasterAutocomplete
