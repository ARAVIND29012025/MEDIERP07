import React from 'react'
import { Breadcrumbs, Link, Typography, Box } from '@mui/material'
import { useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'

const BreadcrumbNav = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          href="/dashboard"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1
          
          return isLast ? (
            <Typography
              color="textPrimary"
              key={pathname}
              sx={{ textTransform: 'capitalize' }}
            >
              {pathname.replace('-', ' ')}
            </Typography>
          ) : (
            <Link
              underline="hover"
              color="inherit"
              href={routeTo}
              key={pathname}
              sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
            >
              {pathname.replace('-', ' ')}
            </Link>
          )
        })}
      </Breadcrumbs>
    </Box>
  )
}

export default BreadcrumbNav
