import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  LocalPharmacy as MedicineIcon,
  Store as SupplierIcon,
  Person as CustomerIcon,
  ShoppingCart as PurchaseIcon,
  Receipt as SalesIcon,
  BarChart as ReportsIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Sidebar = ({ open, onClose }) => {
  const [expandedMenus, setExpandedMenus] = React.useState({})

  const toggleSubmenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }))
  }

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    {
      label: 'Masters',
      icon: <InventoryIcon />,
      submenu: [
        { label: 'Company', path: '/company' },
        { label: 'Category', path: '/category' },
        { label: 'Manufacturer', path: '/manufacturer' },
        { label: 'Generic', path: '/generic' },
        { label: 'Unit', path: '/unit' },
        { label: 'Rack', path: '/rack' },
        { label: 'Warehouse', path: '/warehouse' },
        { label: 'HSN', path: '/hsn' },
        { label: 'GST', path: '/gst' },
        { label: 'Tax Group', path: '/tax-group' },
      ],
    },
    { label: 'Supplier', icon: <SupplierIcon />, path: '/supplier' },
    { label: 'Customer', icon: <CustomerIcon />, path: '/customer' },
    { label: 'Doctor', icon: <CustomerIcon />, path: '/doctor' },
    { label: 'Medicine', icon: <MedicineIcon />, path: '/medicine' },
    { label: 'Purchase', icon: <PurchaseIcon />, path: '/purchase' },
    { label: 'Sales', icon: <SalesIcon />, path: '/sales' },
    { label: 'Reports', icon: <ReportsIcon />, path: '/reports' },
    { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ]

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          marginTop: '64px',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.submenu ? (
                <>
                  <ListItem
                    button
                    onClick={() => toggleSubmenu(item.label)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                    {expandedMenus[item.label] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={expandedMenus[item.label]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.submenu.map((subitem, subindex) => (
                        <ListItem
                          button
                          key={subindex}
                          component={Link}
                          to={subitem.path}
                          sx={{ pl: 4 }}
                          onClick={onClose}
                        >
                          <ListItemText primary={subitem.label} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  onClick={onClose}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              )}
              {index === 0 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
