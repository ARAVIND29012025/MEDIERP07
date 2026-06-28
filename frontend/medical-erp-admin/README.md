# Medical ERP Admin Frontend

Professional medical ERP administration panel built with React. Includes secure login, dashboard, and management modules for hospitals and medical facilities.

## Features

- **Secure Authentication**: JWT-based login with token management
- **Protected Routes**: Authenticated users only
- **Professional UI**: Medical-themed design inspired by ERP9
- **Responsive Design**: Works on desktop and mobile devices
- **API Integration**: RESTful API integration with Express backend

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd medical-erp-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in the root directory (if not present):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the Application

Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.js        # Route protection wrapper
├── pages/
│   ├── Login/
│   │   ├── index.js             # Login page component
│   │   └── Login.css            # Login page styles
│   ├── Dashboard/
│   ├── Company/
│   ├── Category/
│   ├── Supplier/
│   ├── Customer/
│   ├── Medicine/
│   ├── Purchase/
│   ├── Sales/
│   ├── Reports/
│   └── Settings/
├── services/
│   └── api.js                   # API service with token management
├── App.js                       # Main app component with routes
├── index.js                     # React entry point
├── index.css                    # Global styles
└── pages/

public/
└── index.html                   # HTML template
```

## Login Credentials

Use the credentials from your backend:
- **Username**: KaviMithra
- **Password**: JAN012025

## API Integration

The app communicates with the backend API at `http://localhost:5000/api`. The login endpoint:

**POST** `/api/auth/login`
```json
{
  "username": "KaviMithra",
  "password": "JAN012025"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "KaviMithra",
    "full_name": "Kavi Mithra",
    "role_id": 1
  }
}
```

## Token Management

- JWT token is stored in `localStorage` after successful login
- Token is automatically included in all API requests (except login)
- Token is removed on logout

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - Medical ERP System

## Support

For issues or questions, contact the development team.
