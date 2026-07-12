# Medical ERP - Quick Implementation Guide

## Remaining Master Pages to Implement

All master pages follow the same pattern as `Company.jsx`. Use it as a template.

### Master Pages to Create

1. **Manufacturer** - [manufacturerAPI](src/api/apiServices.js#L50)
2. **Generic** - [genericAPI](src/api/apiServices.js#L70)
3. **Unit** - [unitAPI](src/api/apiServices.js#L90)
4. **Rack** - [rackAPI](src/api/apiServices.js#L110)
5. **Warehouse** - [warehouseAPI](src/api/apiServices.js#L130)
6. **HSN** - Custom page (similar to Category)
7. **GST** - Custom page (with tax rate settings)
8. **Tax Group** - Custom page
9. **Doctor** - Similar to Supplier/Customer

### Step-by-Step: Create New Master Page

#### 1. Create Redux Slice (if needed)
Add to `src/redux/slices/` (most can reuse masterSlice.js)

#### 2. Create Page Component
```jsx
// Example: src/pages/Manufacturer.jsx
import React, { useState, useEffect } from 'react'
import { ... } from '@mui/material'
import BreadcrumbNav from '../components/layout/BreadcrumbNav'
import DataTableToolbar from '../components/common/DataTableToolbar'
// ... (copy from Company.jsx and customize)
```

#### 3. Add Route
```jsx
// In src/App.jsx
<Route path="/manufacturer" element={<ProtectedRoute><MainLayout><Manufacturer /></MainLayout></ProtectedRoute>} />
```

#### 4. Add Navigation
```jsx
// In src/components/layout/Sidebar.jsx
{ label: 'Manufacturer', icon: <FactoryIcon />, path: '/manufacturer' },
```

## Complex Pages (Medicine, Purchase, Sales)

These require more customization:

### Medicine Page
- Grid of medicine cards with images
- Edit inline packing levels (Tablet/Strip/Box/Carton)
- Add/Edit form with file upload for images
- Barcode preview/generation
- Batch management
- Stock level display

### Purchase Page
- List of purchase orders with status
- Entry form with:
  - Supplier autocomplete
  - Medicine search autocomplete
  - Batch number & expiry selection
  - Auto-calculation of rates (call backend)
  - GST calculation
  - Total amount
  - Payment terms

### Sales/POS Page
- Real-time billing screen
- Medicine barcode scanner input
- Customer/Doctor dropdown
- Auto-populate rates from master
- Discount & GST calculation
- Payment mode selection
- Print invoice
- Save bill

## API Response Format Expected

All list endpoints should return:
```json
{
  "success": true,
  "data": [...],
  "total": 100,
  "page": 1
}
```

Single item endpoints:
```json
{
  "success": true,
  "data": {...}
}
```

## Common Issues & Solutions

### Table not showing data
- Check API endpoint in apiServices.js
- Verify Redux dispatch in useEffect
- Check console for errors

### Form validation not working
- Ensure yup schema is correct
- Check React Hook Form Controller wrapper
- Verify helperText displays errors

### Loading spinner not showing
- Ensure setLoading(true) is called
- Check LoadingOverlay component visibility
- Verify Redux dispatch

### Pagination not working
- Check totalRecords is being set
- Verify page and pageSize state updates
- Check API call includes pagination params

## Testing the Application

1. **Without Backend**: Use mock data in API services
2. **With Backend**: Configure .env API_BASE_URL
3. **Login**: Use test credentials from Login page

## Performance Tips

- Use React.memo() for list item components
- Implement virtual scrolling for large lists
- Lazy load page routes
- Cache API responses with Redux
- Use useCallback for expensive operations

## Styling Guidelines

- Use MUI sx prop for styling
- Keep colors in theme.js
- Use spacing scale (8px base): 1, 2, 3, 4 units
- Responsive: xs, sm, md, lg, xl breakpoints

## Common Component Usage

### Search & Filter
```jsx
const [search, setSearch] = useState('')
const [filters, setFilters] = useState({})

// In API call
const response = await companyAPI.getAll(page, limit, search, filters)
```

### Add/Edit Dialog
```jsx
const [openDialog, setOpenDialog] = useState(false)
const [editingId, setEditingId] = useState(null)

const handleOpenDialog = (item = null) => {
  if (item) {
    setEditingId(item.id)
    reset(item)
  }
  setOpenDialog(true)
}
```

### Confirmation Dialog
```jsx
const [deleteConfirm, setDeleteConfirm] = useState(false)
const [deleteId, setDeleteId] = useState(null)

const handleDelete = (id) => {
  setDeleteId(id)
  setDeleteConfirm(true)
}
```

## Useful URLs

- Redux DevTools: Install extension to inspect state
- MUI Documentation: https://mui.com
- React Hook Form: https://react-hook-form.com
- Yup Validation: https://github.com/jquense/yup
- Vite Documentation: https://vitejs.dev

## Git Workflow

1. Create branch: `git checkout -b feature/master-pages`
2. Implement pages
3. Test thoroughly
4. Commit: `git commit -m "feat: Add manufacturer and generic master pages"`
5. Push: `git push origin feature/master-pages`
6. Create Pull Request

## Deployment

1. Build: `npm run build`
2. Output in `dist/` folder
3. Deploy to web server (Nginx, Apache, Vercel, etc.)
4. Configure API_BASE_URL for production

---

For detailed implementation examples, refer to `Company.jsx` and `Category.jsx`
