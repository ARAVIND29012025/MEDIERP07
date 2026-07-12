export const formatCurrency = (value, decimals = 2) => {
  if (!value) return '₹0.00'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export const formatDate = (date, format = 'DD/MM/YYYY') => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  
  if (format === 'DD/MM/YYYY') return `${day}/${month}/${year}`
  if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`
  return date.toString()
}

export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `+91-${cleaned.substring(0, 5)}-${cleaned.substring(5)}`
  }
  return phone
}

export const formatGST = (gst) => {
  if (!gst || gst.length < 15) return gst
  return `${gst.substring(0, 5)}-${gst.substring(5, 10)}-${gst.substring(10, 15)}`
}

export const capitalizeWords = (str) => {
  if (!str) return ''
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
}

export const truncateText = (text, length = 50) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export const generateBarcode = (medicineId, batchNo) => {
  // Simple barcode generation - can be replaced with actual library
  return `${medicineId}-${batchNo}-${Date.now()}`
}
