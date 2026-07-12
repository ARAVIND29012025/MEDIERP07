import React from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import BreadcrumbNav from '../components/layout/BreadcrumbNav'

const MedicinePage = () => (
  <Box>
    <BreadcrumbNav />
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Medicines</Typography>
      <Typography>Medicine list with packing, batches, and images</Typography>
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        TODO: Implement medicine list, add/edit form with packing levels, batch management, image upload, barcode generation
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} disabled>
        Add Medicine
      </Button>
    </Paper>
  </Box>
)

export default MedicinePage
