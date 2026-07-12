# Medical ERP Frontend - Backend API Integration Guide

## 🔗 Connection Summary

### Architecture
```
Frontend (Vite + React 19)  ←→  Backend (Express.js)
http://localhost:3002            http://localhost:5000
```

### API Configuration

**Frontend API Base URL**: `http://localhost:5000/api`

**Request Flow**:
1. Frontend makes API call via Axios
2. Axios adds JWT Bearer token to Authorization header
3. Request sent to backend `/api/*` endpoints
4. Backend validates token and processes request
5. Response returned to frontend
6. Redux store updated with response data

---

## 🔐 Authentication Flow

### Login Process
1. User enters `username` (not email) and `password`
2. Frontend sends POST to `/api/auth/login`
3. Backend verifies credentials against MySQL users table
4. Backend returns JWT token + user object
5. Frontend stores token in localStorage
6. Axios interceptor automatically adds token to future requests

### Demo Credentials
```
Username: admin
Password: admin123
```

### Token Storage
```javascript
localStorage.getItem('token')      // JWT token
localStorage.getItem('user')       // User object JSON
```

---

## 📦 API Service Modules

All API services are in `src/api/apiServices.js`:

### 1. Authentication
```javascript
authAPI.login(username, password)
authAPI.logout()
authAPI.refreshToken()
```

### 2. Company Master
```javascript
companyAPI.getAll(page, limit)
companyAPI.getById(id)
companyAPI.create(data)
companyAPI.update(id, data)
companyAPI.delete(id)
```

### 3. Category Master
```javascript
categoryAPI.getAll(page, limit, search)
categoryAPI.getById(id)
categoryAPI.create(data)
categoryAPI.update(id, data)
categoryAPI.delete(id)
```

### 4. Other Masters
- `manufacturerAPI`
- `genericAPI`
- `unitAPI`
- `rackAPI`
- `warehouseAPI`
- `hsnAPI`
- `gstAPI`
- `taxAPI`
- `supplierAPI`
- `customerAPI`
- `doctorAPI`
- `medicineAPI`

### 5. Complex Modules
- `purchaseAPI` - Purchase orders with line items
- `salesAPI` - Sales/POS billing
- `medicinePackingAPI` - Medicine packing levels

---

## 📡 API Endpoint Mapping

### Backend Routes (app.js)
```javascript
app.use("/api/auth", authRoutes)
app.use("/api/company", companyRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/manufacturer", manufacturerRoutes)
app.use("/api/generic", genericRoutes)
app.use("/api/unit", unitRoutes)
app.use("/api/rack", rackRoutes)
app.use("/api/warehouse", warehouseRoutes)
app.use("/api/hsn", hsnRoutes)
app.use("/api/gst", gstRoutes)
app.use("/api/tax", taxRoutes)
app.use("/api/supplier", supplierRoutes)
app.use("/api/customer", customerRoutes)
app.use("/api/doctor", doctorRoutes)
app.use("/api/medicine", medicineRoutes)
app.use("/api/medicine-packing", medicinePackingRoutes)
app.use("/api/purchase", purchaseRoutes)
app.use("/api/sales", salesRoutes)
```

### Example API Calls

**Login:**
```
POST http://localhost:5000/api/auth/login
Body: { username: "admin", password: "admin123" }
Response: { success: true, token: "...", user: { id, username, full_name, role_id } }
```

**Get Companies:**
```
GET http://localhost:5000/api/company?page=1&limit=10
Headers: { Authorization: "Bearer <token>" }
Response: { success: true, total: 50, page: 1, limit: 10, data: [...] }
```

**Create Company:**
```
POST http://localhost:5000/api/company
Headers: { Authorization: "Bearer <token>" }
Body: { name: "ABC Corp", email: "...", phone: "...", address: "...", gst: "..." }
Response: { success: true, message: "Created", data: { id, ...} }
```

---

## 🛠️ Testing the Connection

### Test 1: Login
1. Open http://localhost:3002/
2. Enter username: `admin`
3. Enter password: `admin123`
4. Click Login
5. **Expected**: Redirect to Dashboard, user data in Redux

### Test 2: Fetch Company List
1. After login, click "Company" in sidebar
2. **Expected**: Table shows list of companies from backend
3. Check Network tab (DevTools) for GET /api/company request

### Test 3: Create Company
1. In Company page, click "+ Add Company"
2. Fill form: Name, Email, Phone, Address, GST
3. Click "Save"
4. **Expected**: Toast notification "Added successfully", new row appears in table

### Test 4: Update Company
1. In Company page, click edit icon on a row
2. Modify any field
3. Click "Update"
4. **Expected**: Toast notification "Updated successfully", row updated in table

### Test 5: Delete Company
1. In Company page, click delete icon on a row
2. Confirm in dialog
3. **Expected**: Toast notification "Deleted successfully", row removed from table

---

## 🔄 Redux State Management

### Auth Slice (`redux/slices/authSlice.js`)
```javascript
state.user            // { id, username, full_name, role_id }
state.token           // JWT token
state.isAuthenticated // boolean
state.loading         // boolean (during API call)
state.error           // error message or null
```

### Master Slice (`redux/slices/masterSlice.js`)
```javascript
state.companies       // { data: [], total: 0, page: 1 }
state.categories      // { data: [], total: 0, page: 1 }
state.manufacturers   // { data: [], total: 0, page: 1 }
// ... other masters
```

### Data Flow
1. **Fetch**: API call → Response → dispatch setCompanies() → Redux updated
2. **Create**: Form submit → API call → Response → dispatch addCompany() → Table re-renders
3. **Update**: Edit submit → API call → Response → dispatch updateCompany() → Row updates
4. **Delete**: Confirm → API call → Response → dispatch deleteCompany() → Row removed

---

## 🔍 Debugging

### Check Network Requests
1. Open browser DevTools (F12)
2. Go to Network tab
3. Perform an action (login, fetch, create)
4. See the API call details

### Check Console Errors
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any error messages from failed API calls

### Check Redux State
1. Install Redux DevTools Extension
2. Use it to inspect state changes on each action
3. Verify data is stored correctly

### Check Axios Interceptor
In `src/api/axiosInstance.js`:
- Request interceptor adds token to headers
- Response interceptor handles 401 errors (auto-logout)

### Backend Logs
Monitor terminal where backend is running for:
- Database connection status
- API request logs
- Error messages

---

## ⚙️ Configuration Files

### Frontend Environment (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Vite Config (vite.config.js)
```javascript
server: {
  port: 3002,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

### Backend Config
- Database: MySQL (configured in .env)
- Port: 5000 (from environment or default)
- CORS: Enabled for all origins

---

## 🚀 Running the System

### Start Backend
```bash
cd d:\MEDICALERPPROJECT\backend
npm start
# Server running on http://localhost:5000
```

### Start Frontend
```bash
cd d:\MEDICALERPPROJECT\frontend\medical-erp-admin
npm run dev
# Frontend running on http://localhost:3002
```

### Access
- Frontend: http://localhost:3002
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000 (returns API info)

---

## 📋 Checklist

- [x] Frontend configured with correct API base URL
- [x] Axios instance with JWT interceptor
- [x] Auth endpoint updated to use username (not email)
- [x] Login page updated with username field
- [x] Redux store with auth slice
- [x] API service layer for all modules
- [x] Backend running with all routes mounted
- [ ] Login API call tested and working
- [ ] Company CRUD operations tested
- [ ] All master pages tested
- [ ] Error handling and validation tested
- [ ] Token refresh mechanism tested

---

## 🐛 Common Issues

### Issue: "Invalid Username" error
- **Cause**: Username doesn't exist in database
- **Solution**: Check users table, create test user, or use `admin`

### Issue: "Invalid Password" error
- **Cause**: Password hash doesn't match
- **Solution**: Verify password is correct (case-sensitive), check bcrypt hash

### Issue: Token not added to requests
- **Cause**: Token not in localStorage
- **Solution**: Check if login was successful, verify token stored

### Issue: CORS errors
- **Cause**: Backend CORS not configured
- **Solution**: Backend already has `cors()` enabled

### Issue: API returns 404
- **Cause**: Wrong endpoint path
- **Solution**: Verify endpoint matches routes in app.js

---

## 📚 Next Steps

1. **Test all API calls** - Run through the testing checklist
2. **Build missing pages** - Medicine, Purchase, Sales, Reports, Settings
3. **Add form validation** - Server-side validation already exists, add client-side
4. **Implement error handling** - Toast notifications for errors (already done)
5. **Add loading states** - Show spinners during API calls (already done)
6. **Implement search/filter** - Backend supports search parameters
7. **Add pagination** - Already implemented in table components
8. **Add role-based access** - Use role_id from user object

