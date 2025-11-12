// src/pages/Login.jsx - Similar a Register
import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container, Alert, Row, Col } from 'react-bootstrap';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/auth/login', formData)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        setSuccess(true);
        // Redirigir a dashboard después de login
        window.location.href = '/dashboard';
      })
      .catch(err => {
        console.error(err);
        setError(err?.response?.data?.message || 'Credenciales inválidas o error en login');
      });
  };

  return (
    <Container fluid className="register-container"> {/* Reusa estilos de register */}
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="register-card">
            <Card.Body>
              <div className="text-center mb-4">
                <img src="/assets/logo.png" alt="GC Solutions" className="login-logo" />
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">¡Login exitoso!</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 register-button">
                  Iniciar Sesión
                </Button>
              </Form>
              <p className="register-link">
                ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;