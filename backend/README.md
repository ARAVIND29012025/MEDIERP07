# medical-erp-api

A backend API scaffold for a medical ERP application using Node.js, Express, and MySQL.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`.

3. Start the server:
   ```bash
   npm run dev
   ```

## Structure

- `src/config`: database and JWT configuration
- `src/middleware`: authentication, file upload, and error handling
- `src/modules/auth`: authentication controller, service, and routes
- `src/utils`: mail, OTP, and WhatsApp helper functions
- `uploads`: file upload storage
