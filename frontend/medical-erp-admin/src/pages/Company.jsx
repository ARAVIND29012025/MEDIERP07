import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import BreadcrumbNav from '../components/layout/BreadcrumbNav'
import DataTableToolbar from '../components/common/DataTableToolbar'
import ConfirmDialog from '../components/common/ConfirmDialog'
import LoadingOverlay from '../components/common/LoadingOverlay'
import { companyAPI } from '../api/apiServices'
import {
  setCompanies,
  addCompany,
  updateCompany,
  setLoading,
  setError,
} from '../redux/slices/masterSlice'
import { toast } from 'react-toastify'

const validationSchema = yup.object({
  name: yup.string().required('Company name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  gst: yup.string(),
})

const Company = () => {
  const dispatch = useDispatch()
  const { companies, loading } = useSelector(state => state.master)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalRecords, setTotalRecords] = useState(0)
  const [search, setSearch] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      gst: '',
      status: 1,
    },
  })

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        dispatch(setLoading(true))
        const response = await companyAPI.getAll(page + 1, pageSize, search)
        dispatch(setCompanies(response.data.data))
        setTotalRecords(response.data.total)
      } catch (error) {
        toast.error('Failed to fetch companies')
        dispatch(setError(error.message))
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchCompanies()
  }, [dispatch, page, pageSize, search])

  const handleOpenDialog = (company = null) => {
    if (company) {
      setEditingId(company.id)
      reset(company)
    } else {
      setEditingId(null)
      reset()
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    reset()
  }

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true))
      if (editingId) {
        await companyAPI.update(editingId, data)
        dispatch(updateCompany({ id: editingId, ...data }))
        toast.success('Company updated successfully')
      } else {
        const response = await companyAPI.create(data)
        dispatch(addCompany(response.data))
        toast.success('Company added successfully')
      }
      handleCloseDialog()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save company')
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleDelete = (id) => {
    setDeleteId(id)
    setDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    try {
      dispatch(setLoading(true))
      await companyAPI.delete(deleteId)
      dispatch(setCompanies(companies.filter(c => c.id !== deleteId)))
      toast.success('Company deleted successfully')
      setDeleteConfirm(false)
    } catch (error) {
      toast.error('Failed to delete company')
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleExport = () => {
    // TODO: Implement export to CSV/Excel
    toast.info('Export feature coming soon')
  }

  return (
    <Box>
      <BreadcrumbNav />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <h1>Companies</h1>
      </Box>

      <DataTableToolbar
        searchValue={search}
        onSearch={setSearch}
        onRefresh={() => setPage(0)}
        onExport={handleExport}
        onAdd={() => handleOpenDialog()}
        searchPlaceholder="Search companies..."
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>GST</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>{company.gst}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(company)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(company.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalRecords}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value, 10))}
      />

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Company' : 'Add New Company'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  multiline
                  rows={3}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="gst"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="GST Number"
                  fullWidth
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value === 1} />}
                  label="Active"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            disabled={loading}
          >
            {editingId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteConfirm}
        title="Delete Company"
        message="Are you sure you want to delete this company?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm(false)}
        loading={loading}
        severity="error"
      />

      <LoadingOverlay open={loading} message="Processing..." />
    </Box>
  )
}

export default Company
