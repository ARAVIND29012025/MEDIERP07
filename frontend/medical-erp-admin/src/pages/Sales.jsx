import React from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import BreadcrumbNav from '../components/layout/BreadcrumbNav'

const SalesPage = () => (
  <Box>
    <BreadcrumbNav />
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Sales / POS Billing</Typography>
      <Typography>POS style billing with barcode scan and customer selection</Typography>
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        TODO: Implement POS billing screen with medicine search, barcode scan, customer/doctor selection, rate calculation, payment mode selection
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} disabled>
        New Bill
      </Button>
    </Paper>
  </Box>
)

export default SalesPage
