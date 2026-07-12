import React from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import BreadcrumbNav from '../components/layout/BreadcrumbNav'

const CustomerPage = () => (
  <Box>
    <BreadcrumbNav />
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Customers</Typography>
      <Typography>Customer management page - similar to Company page</Typography>
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        TODO: Implement customer list, add, edit, delete, credit management
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} disabled>
        Add Customer
      </Button>
    </Paper>
  </Box>
)

export default CustomerPage
