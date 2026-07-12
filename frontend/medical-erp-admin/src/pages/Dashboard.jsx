import React, { useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  LocalPharmacy,
  Warning,
  People,
} from '@mui/icons-material'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import BreadcrumbNav from '../components/layout/BreadcrumbNav'
import { dashboardAPI } from '../api/apiServices'
import { setKPIs, setCharts, setLoading } from '../redux/slices/dashboardSlice'
import { formatCurrency } from '../utils/formatters'

const KPICard = ({ title, value, icon: Icon, trend, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>
            {typeof value === 'number' ? formatCurrency(value) : value}
          </Typography>
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: trend > 0 ? 'green' : 'red' }}>
              {trend > 0 ? <TrendingUp /> : <TrendingDown />}
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {Math.abs(trend)}%
              </Typography>
            </Box>
          )}
        </Box>
        <Icon sx={{ fontSize: 40, color, opacity: 0.7 }} />
      </Box>
    </CardContent>
  </Card>
)

const Dashboard = () => {
  const dispatch = useDispatch()
  const { kpis, charts, loading } = useSelector(state => state.dashboard)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        dispatch(setLoading(true))
        
        // Fetch KPIs
        const kpisResponse = await dashboardAPI.getKPIs()
        dispatch(setKPIs(kpisResponse.data))

        // Fetch Charts
        const chartsResponse = await dashboardAPI.getCharts()
        dispatch(setCharts(chartsResponse.data))
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchDashboardData()
  }, [dispatch])

  return (
    <Box>
      <BreadcrumbNav />
      
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <KPICard
            title="Today's Sales"
            value={kpis.todaySales}
            icon={ShoppingCart}
            trend={12}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KPICard
            title="Today's Purchase"
            value={kpis.todayPurchase}
            icon={LocalPharmacy}
            trend={8}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KPICard
            title="Total Medicines"
            value={kpis.totalMedicines}
            icon={LocalPharmacy}
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KPICard
            title="Total Customers"
            value={kpis.totalCustomers}
            icon={People}
            color="#9C27B0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KPICard
            title="Total Suppliers"
            value={kpis.totalSuppliers}
            icon={People}
            color="#F44336"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <KPICard
            title="Low Stock"
            value={kpis.lowStock}
            icon={Warning}
            color="#FF5722"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Monthly Sales
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={charts.monthlySales || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#2196F3" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Monthly Purchase
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={charts.monthlyPurchase || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="purchase" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Top Selling Medicines
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={charts.topSellingMedicines || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#FF9800" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
