import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import BreadcrumbNav from '../components/layout/BreadcrumbNav'

const SettingsPage = () => (
  <Box>
    <BreadcrumbNav />
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Settings</Typography>
      <Typography>Company settings, financial year, GST, invoice prefix, backup/restore</Typography>
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        TODO: Implement company settings, financial year selection, GST settings, invoice prefix, barcode settings, backup, restore
      </Typography>
    </Paper>
  </Box>
)

export default SettingsPage
