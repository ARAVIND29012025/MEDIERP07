import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Company from './pages/Company';
import Category from './pages/Category';
import Supplier from './pages/Supplier';
import Customer from './pages/Customer';
import Medicine from './pages/Medicine';
import Purchase from './pages/Purchase';
import Sales from './pages/Sales';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<Company />} />
        <Route path="/category" element={<Category />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
