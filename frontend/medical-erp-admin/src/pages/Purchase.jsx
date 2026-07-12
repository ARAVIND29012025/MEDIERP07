import React from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import BreadcrumbNav from '../components/layout/BreadcrumbNav'

const PurchasePage = () => (
  <Box>
    <BreadcrumbNav />
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Purchase</Typography>
      <Typography>Purchase entry with medicine auto search and rate calculation</Typography>
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        TODO: Implement purchase list, purchase entry form with medicine autocomplete, batch selection, rate calculation (PTS/PTR), GST calculation
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} disabled>
        New Purchase
      </Button>
    </Paper>
  </Box>
)

export default PurchasePage
