import React from 'react'
import {
  Box,
  TablePagination,
  Paper,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const DataTable = ({
  columns,
  rows,
  loading = false,
  page = 0,
  pageSize = 10,
  totalRecords = 0,
  onPageChange,
  onPageSizeChange,
  disableSelectionOnClick = true,
}) => {
  return (
    <Paper sx={{ overflow: 'auto' }}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pagination
          paginationModel={{ pageSize, page }}
          onPaginationModelChange={(newPaginationModel) => {
            onPageChange(newPaginationModel.page)
            onPageSizeChange(newPaginationModel.pageSize)
          }}
          pageSizeOptions={[10, 25, 50]}
          rowCount={totalRecords}
          paginationMode="server"
          disableSelectionOnClick={disableSelectionOnClick}
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        />
      </Box>
    </Paper>
  )
}

export default DataTable
