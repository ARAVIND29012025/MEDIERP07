import React from 'react'
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Grid,
} from '@mui/material'
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FileDownload as ExportIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material'

const DataTableToolbar = ({
  onSearch,
  onRefresh,
  onExport,
  onAdd,
  searchPlaceholder = 'Search...',
  showSearch = true,
  showRefresh = true,
  showExport = true,
  showAdd = true,
  addButtonText = 'Add New',
  searchValue = '',
}) => {
  return (
    <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {showSearch && (
        <TextField
          size="small"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => onSearch('')}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}

      <Box sx={{ flexGrow: 1 }} />

      {showRefresh && (
        <IconButton size="small" onClick={onRefresh} title="Refresh">
          <RefreshIcon />
        </IconButton>
      )}

      {showExport && (
        <IconButton size="small" onClick={onExport} title="Export">
          <ExportIcon />
        </IconButton>
      )}

      {showAdd && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onAdd}
        >
          {addButtonText}
        </Button>
      )}
    </Box>
  )
}

export default DataTableToolbar
