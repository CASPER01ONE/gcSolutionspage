import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Quotes from './pages/Quotes';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>            
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* Páginas sin layout si quieres, ej. login/register sin header/footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;