import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
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
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import BreadcrumbNav from '../components/layout/BreadcrumbNav'
import DataTableToolbar from '../components/common/DataTableToolbar'
import ConfirmDialog from '../components/common/ConfirmDialog'
import LoadingOverlay from '../components/common/LoadingOverlay'
import { categoryAPI } from '../api/apiServices'
import {
  setCategories,
  addCategory,
  updateCategory,
  setLoading,
} from '../redux/slices/masterSlice'
import { toast } from 'react-toastify'

const validationSchema = yup.object({
  name: yup.string().required('Category name is required'),
  description: yup.string(),
})

const Category = () => {
  const dispatch = useDispatch()
  const { categories, loading } = useSelector(state => state.master)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalRecords, setTotalRecords] = useState(0)
  const [search, setSearch] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { name: '', description: '' },
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(setLoading(true))
        const response = await categoryAPI.getAll(page + 1, pageSize, search)
        dispatch(setCategories(response.data.data))
        setTotalRecords(response.data.total)
      } catch (error) {
        toast.error('Failed to fetch categories')
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchCategories()
  }, [dispatch, page, pageSize, search])

  const handleOpenDialog = (category = null) => {
    if (category) {
      setEditingId(category.id)
      reset(category)
    } else {
      setEditingId(null)
      reset()
    }
    setOpenDialog(true)
  }

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true))
      if (editingId) {
        await categoryAPI.update(editingId, data)
        dispatch(updateCategory({ id: editingId, ...data }))
        toast.success('Category updated')
      } else {
        const response = await categoryAPI.create(data)
        dispatch(addCategory(response.data))
        toast.success('Category added')
      }
      setOpenDialog(false)
      reset()
    } catch (error) {
      toast.error('Failed to save category')
    } finally {
      dispatch(setLoading(false))
    }
  }

  const confirmDelete = async () => {
    try {
      dispatch(setLoading(true))
      await categoryAPI.delete(deleteId)
      dispatch(setCategories(categories.filter(c => c.id !== deleteId)))
      toast.success('Category deleted')
      setDeleteConfirm(false)
    } catch (error) {
      toast.error('Failed to delete category')
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <Box>
      <BreadcrumbNav />
      <h1>Categories</h1>

      <DataTableToolbar
        searchValue={search}
        onSearch={setSearch}
        onAdd={() => handleOpenDialog()}
        searchPlaceholder="Search categories..."
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.description}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => handleOpenDialog(cat)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => {
                    setDeleteId(cat.id)
                    setDeleteConfirm(true)
                  }}>
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                margin="normal"
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={3}
                margin="normal"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {editingId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={deleteConfirm}
        title="Delete"
        message="Are you sure?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm(false)}
        severity="error"
      />

      <LoadingOverlay open={loading} />
    </Box>
  )
}

export default Category
