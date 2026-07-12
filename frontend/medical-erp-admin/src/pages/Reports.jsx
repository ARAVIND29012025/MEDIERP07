import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import BreadcrumbNav from '../components/layout/BreadcrumbNav'

const ReportsPage = () => (
  <Box>
    <BreadcrumbNav />
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Reports</Typography>
      <Typography>Various reports - Sales, Purchase, Stock, Expiry, etc.</Typography>
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        TODO: Implement sales report, purchase report, stock report, low stock, near expiry, customer ledger, supplier ledger
      </Typography>
    </Paper>
  </Box>
)

export default ReportsPage
