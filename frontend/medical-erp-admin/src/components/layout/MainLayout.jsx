import React from 'react'
import { Box } from '@mui/material'
import TopAppBar from './TopAppBar'
import Sidebar from './Sidebar'

const MainLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <TopAppBar onDrawerToggle={handleDrawerToggle} />
      <Sidebar open={drawerOpen} onClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          marginTop: '64px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default MainLayout
