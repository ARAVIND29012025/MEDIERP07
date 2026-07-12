import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material'

const FormDialog = ({
  open,
  title,
  onClose,
  onSubmit,
  children,
  submitText = 'Save',
  cancelText = 'Cancel',
  loading = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
