import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Typography,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material'
import { useAuth } from '../../hooks/useRedux'
import { logout } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const TopAppBar = ({ onDrawerToggle }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Medical ERP Admin
          </Typography>

          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Avatar
              sx={{ cursor: 'pointer', bgcolor: 'secondary.main' }}
              onClick={handleMenuOpen}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" sx={{ ml: 1, cursor: 'pointer' }} onClick={handleMenuOpen}>
              {user?.name}
            </Typography>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <SettingsIcon sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Add spacing */}
    </>
  )
}

export default TopAppBar
