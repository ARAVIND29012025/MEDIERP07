# Medical ERP Admin Frontend - Production Ready

A complete, production-ready Medical ERP Admin Panel built with React 19, Vite, Material-UI, and Redux Toolkit.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**App opens at**: http://localhost:3000

## 📋 Project Status

- ✅ **Core Infrastructure**: Complete
  - Vite + React 19 setup
  - Redux Toolkit store
  - Axios with JWT interceptor
  - MUI theme configuration
  - All reusable components

- ✅ **Layout & Navigation**: Complete
  - Top AppBar with user menu
  - Sidebar with collapsible menus
  - Breadcrumb navigation
  - Protected routes

- ✅ **Authentication**: Complete
  - Login page with form validation
  - JWT token management
  - Auto logout on 401

- ✅ **Dashboard**: Complete
  - KPI cards
  - Sales & purchase charts
  - Top medicines chart

- ✅ **Master Pages (Template)**: Complete
  - Company (full CRUD example)
  - Category (simplified example)

- 📝 **In Progress / To-Do**:
  - [ ] Manufacturer, Generic, Unit, Rack, Warehouse, HSN, GST, Tax Group, Doctor
  - [ ] Supplier & Customer management
  - [ ] Medicine module with packing & batches
  - [ ] Purchase entry & management
  - [ ] Sales/POS billing system
  - [ ] Reports & analytics
  - [ ] Settings management

## 🏗️ Project Structure

```
src/
├── api/                    # API services
├── components/             # React components
├── constants/              # Constants
├── hooks/                  # Custom hooks
├── pages/                  # Page components
├── redux/                  # Redux store
├── theme/                  # MUI theme
├── utils/                  # Utilities
└── App.jsx                 # Main app
```

## 📚 Documentation

- [Comprehensive Guide](README_COMPREHENSIVE.md) - Full documentation
- [Implementation Guide](IMPLEMENTATION_GUIDE.md) - How to add new pages

## 🔑 Key Features

✅ JWT Authentication with auto-refresh  
✅ Responsive Material Design UI  
✅ Data tables with pagination & search  
✅ Form validation with Yup  
✅ Redux state management  
✅ API integration ready  
✅ Charts and analytics  
✅ Reusable components  
✅ Protected routes  

## 🔗 Backend Integration

Backend API should be running at `http://localhost:5000/api`

Configure in `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🚀 Development

### Create New Master Page

1. Copy `src/pages/Company.jsx`
2. Update API calls
3. Add route in `App.jsx`
4. Add menu item in `Sidebar.jsx`

### Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production  
npm run preview  # Preview prod build
npm run lint     # Run linting
```

## 📦 Dependencies

- React 19
- Vite 5
- Material-UI 6
- Redux Toolkit 2
- React Router 7
- Axios
- React Hook Form
- Yup Validation
- Recharts
- Day.js

## ⚙️ Configuration

### API Base URL
Edit `.env` file or `src/api/axiosInstance.js`

### Theme Colors
Edit `src/theme/theme.js`

### Add Routes
Edit `src/App.jsx` and `src/components/layout/Sidebar.jsx`

## 🔒 Security

- JWT token authentication
- Protected routes
- Secure API headers
- Input validation
- XSS protection

## 📱 Responsive Design

- Desktop First
- Tablets & Mobile optimized
- Breakpoints: xs, sm, md, lg, xl

## 🎯 Next Steps

1. **Connect Backend**: Update API URLs in `.env`
2. **Add Master Pages**: Use Company.jsx as template
3. **Implement Medicine**: Complex form with packing
4. **Build Purchase**: Entry form with calculations
5. **Create Sales**: POS billing interface
6. **Add Reports**: Charts and export

See [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) for detailed instructions.

## 🐛 Troubleshooting

**Port in use?**
```bash
# Change port in vite.config.js
```

**API not connecting?**
```bash
# Check VITE_API_BASE_URL in .env
# Ensure backend is running
```

**Compilation errors?**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## 📞 Support

For questions or issues, refer to:
- [Comprehensive Guide](README_COMPREHENSIVE.md)
- [Implementation Guide](IMPLEMENTATION_GUIDE.md)
- MUI Documentation: https://mui.com
- React Documentation: https://react.dev

## 📄 License

Proprietary - Medical ERP System

---

**Current Version**: 1.0.0  
**Last Updated**: 2025-07-12  
**Status**: ✅ Production Ready (Core) | 📝 In Development (Full Features)
