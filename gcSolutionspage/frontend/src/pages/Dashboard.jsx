// src/pages/Dashboard.jsx - Panel para usuarios registrados
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';  // Named import

function Dashboard() {
  const [data, setData] = useState({ user: {}, quotes: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No estás autenticado. Por favor, inicia sesión.');
      return;
    }
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      setError('Sesión expirada. Inicia sesión nuevamente.');
      return;
    }

    axios.get('/api/dashboard', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setData(res.data))
      .catch(err => {
        console.error(err);
        setError('Error al cargar dashboard');
      });
  }, []);

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h1>Dashboard</h1>
      <p>Bienvenido, {data.user.username}</p>
      <h2>Tus Cotizaciones</h2>
      <ul>
        {data.quotes.map(quote => (
          <li key={quote._id}>{quote.message} - Servicio: {quote.serviceId.name}</li>
        ))}
      </ul>
    </Container>
  );
}

export default Dashboard;