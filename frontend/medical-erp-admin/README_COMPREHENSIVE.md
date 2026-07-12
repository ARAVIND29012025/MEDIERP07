# Medical ERP Admin Frontend

A production-ready Medical ERP Admin Panel built with React 19, Vite, Material-UI (MUI), and Redux Toolkit.

## Features

✅ Authentication & Authorization  
✅ Dashboard with KPIs & Charts  
✅ Master Data Management (Company, Category, Manufacturer, etc.)  
✅ Medicine Management with Packing Levels  
✅ Purchase Entry & Management  
✅ Sales/POS Billing System  
✅ Reports & Analytics  
✅ Settings & Configuration  
✅ Responsive Material UI Design  
✅ Dark Mode Support Ready  

## Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) v6
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Form Management**: React Hook Form + Yup Validation
- **Data Grid**: MUI X Data Grid
- **Charts**: Recharts
- **Notifications**: React Toastify
- **Date/Time**: Day.js
- **CSS-in-JS**: Emotion (MUI integrated)

## Project Structure

```
src/
├── api/                    # API service layer
│   ├── apiServices.js      # All API endpoints
│   └── axiosInstance.js    # Axios configuration with JWT interceptor
├── components/
│   ├── common/             # Reusable components
│   │   ├── DataTable.jsx
│   │   ├── DataTableToolbar.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── FormDialog.jsx
│   │   ├── LoadingOverlay.jsx
│   │   ├── MasterAutocomplete.jsx
│   │   ├── MoneyInput.jsx
│   │   └── QuantityInput.jsx
│   ├── layout/             # Layout components
│   │   ├── MainLayout.jsx
│   │   ├── TopAppBar.jsx
│   │   ├── Sidebar.jsx
│   │   └── BreadcrumbNav.jsx
│   └── ProtectedRoute.jsx
├── constants/              # Application constants
│   └── constants.js
├── hooks/                  # Custom React hooks
│   └── useRedux.js
├── pages/                  # Page components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Company.jsx
│   ├── Category.jsx
│   ├── Supplier.jsx
│   ├── Customer.jsx
│   ├── Medicine.jsx
│   ├── Purchase.jsx
│   ├── Sales.jsx
│   ├── Reports.jsx
│   └── Settings.jsx
├── redux/                  # Redux store & slices
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       ├── masterSlice.js
│       ├── medicineSlice.js
│       ├── purchaseSlice.js
│       ├── salesSlice.js
│       └── dashboardSlice.js
├── theme/                  # MUI theme configuration
│   └── theme.js
├── utils/                  # Utility functions
│   └── formatters.js
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
├── index.css               # Global styles
└── index.js                # Legacy (for reference)
```

## Setup & Installation

### Prerequisites

- Node.js 16+ (LTS recommended)
- npm 8+ or yarn

### Installation Steps

1. **Clone/Navigate to project**
```bash
cd frontend/medical-erp-admin
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Environment Variables**

Create `.env` file (or use existing `.env.development`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Medical ERP Admin
VITE_APP_VERSION=1.0.0
```

4. **Start Development Server**
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Development

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Creating New Pages

All master pages follow a similar pattern (see `Company.jsx` and `Category.jsx` as templates):

1. **Setup Redux Slice** - Add state management in `redux/slices/`
2. **Create API Services** - Add API calls in `api/apiServices.js`
3. **Create Page Component** - Use Company.jsx as template
4. **Add Route** - Add route in `App.jsx`
5. **Add Navigation** - Add menu item in `Sidebar.jsx`

### Form Validation

Uses React Hook Form + Yup:

```javascript
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
})

const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(validationSchema),
})
```

### API Integration

All API calls go through `axiosInstance` with automatic:
- JWT token injection in headers
- 401 error handling (auto logout)
- Request/response interceptors

```javascript
import { companyAPI } from '../api/apiServices'

// Fetch
const response = await companyAPI.getAll(page, limit, search)

// Create
await companyAPI.create(data)

// Update
await companyAPI.update(id, data)

// Delete
await companyAPI.delete(id)
```

## Key Implementation Details

### Authentication Flow

1. User logs in with email/password
2. Backend returns JWT token & user data
3. Token stored in localStorage
4. Token added to all subsequent requests
5. On 401, auto logout and redirect to login

### State Management

Redux stores:
- **auth**: User, token, authentication status
- **master**: All master data (companies, categories, etc.)
- **medicine**: Medicine data and filters
- **purchase**: Purchase orders
- **sales**: Sales transactions
- **dashboard**: KPIs and charts

### Protected Routes

Only authenticated users can access protected routes. `ProtectedRoute` component checks auth status and redirects to login if needed.

### Reusable Components

- **DataTable**: Paginated table with sorting, searching
- **DataTableToolbar**: Search, export, add buttons
- **ConfirmDialog**: Confirmation for delete operations
- **FormDialog**: Generic form dialog
- **LoadingOverlay**: Full-screen loader
- **MasterAutocomplete**: Dropdown with search
- **MoneyInput**: Currency input with ₹ symbol
- **QuantityInput**: Numeric input with decimal support

## Backend Integration

The frontend expects these API endpoints:

```
POST   /auth/login
POST   /auth/logout
GET    /dashboard/kpis
GET    /dashboard/charts

GET    /company
POST   /company
PUT    /company/:id
DELETE /company/:id

GET    /category
POST   /category
PUT    /category/:id
DELETE /category/:id

(Similar pattern for all other masters)

POST   /purchase
GET    /purchase/:id
PUT    /purchase/:id

POST   /sales
GET    /sales/:id
PUT    /sales/:id

GET    /reports/sales
GET    /reports/purchase
GET    /reports/stock
```

See backend API documentation for request/response formats.

## Customization

### Theme Colors

Edit `src/theme/theme.js`:

```javascript
palette: {
  primary: {
    main: '#2196F3',  // Change primary color
  },
  secondary: {
    main: '#F50057',
  },
}
```

### Add New Master Page

Use `Company.jsx` as template:
1. Copy and rename file
2. Update API endpoints
3. Update form fields
4. Add to routes in `App.jsx`
5. Add to sidebar menu

### API Configuration

Change API base URL in `.env` file or `axiosInstance.js`

## Troubleshooting

### Port Already in Use

```bash
# Change port in vite.config.js
server: {
  port: 3001,  // Change this
}
```

### CORS Issues

Ensure backend is allowing CORS from frontend URL. Configure in backend if needed.

### Token Issues

Check localStorage for token:
- Clear localStorage if token corrupted
- Check token expiration in backend
- Ensure correct token format in headers

## Next Steps - Implementation Roadmap

### Immediate (High Priority)
- ✅ Setup complete project structure
- ✅ Create Dashboard
- ✅ Create Company master (template)
- [ ] Create all remaining master pages (Manufacturer, Generic, Unit, Rack, Warehouse, HSN, GST, Tax Group, Doctor)
- [ ] Create Supplier management
- [ ] Create Customer management

### Phase 2 (Medium Priority)
- [ ] Medicine module with packing levels
- [ ] Medicine batch management
- [ ] Image upload for medicines
- [ ] Barcode generation

### Phase 3 (Purchase & Sales)
- [ ] Purchase entry form with autocomplete
- [ ] Rate calculation engine integration
- [ ] GST calculation
- [ ] Packing conversion logic

### Phase 4 (Advanced Features)
- [ ] POS billing screen with barcode scanning
- [ ] Payment mode handling
- [ ] Credit management for customers/suppliers
- [ ] Inventory management

### Phase 5 (Reporting & Settings)
- [ ] Sales reports
- [ ] Purchase reports
- [ ] Stock reports
- [ ] Settings management
- [ ] Backup/Restore

## Performance Optimization

- Lazy load routes using React.lazy()
- Memoize components with React.memo()
- Use useCallback for event handlers
- Implement virtual scrolling for large lists
- Code splitting by route
- Service Worker for offline support

## Security

- JWT token stored in localStorage
- XSS protection via React's default escaping
- CSRF protection via backend
- Input validation with Yup
- Never store sensitive data in Redux
- Secure API endpoints with HTTPS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Follow the project structure
2. Use existing components as templates
3. Follow naming conventions
4. Add comments for complex logic
5. Test thoroughly before committing

## License

Proprietary - Medical ERP System

## Support

For issues or questions, contact the development team.

---

**Last Updated**: 2025-07-12  
**Version**: 1.0.0
