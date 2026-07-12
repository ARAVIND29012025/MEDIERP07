import React from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import BreadcrumbNav from '../components/layout/BreadcrumbNav'

const SupplierPage = () => (
  <Box>
    <BreadcrumbNav />
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Suppliers</Typography>
      <Typography>Supplier management page - similar to Company page</Typography>
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        TODO: Implement supplier list, add, edit, delete, address management
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} disabled>
        Add Supplier
      </Button>
    </Paper>
  </Box>
)

export default SupplierPage
