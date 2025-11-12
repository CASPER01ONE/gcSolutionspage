import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <Container>
        <p>&copy; 2025 GC Solutions. Todos los derechos reservados.</p>
        <div className="social-links">
          <a href="https://facebook.com/tupagina" target="_blank" rel="noopener noreferrer" className="mx-2">
            <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>  {/* Icono de Facebook */}
          </a>
          <a href="https://twitter.com/tupagina" target="_blank" rel="noopener noreferrer" className="mx-2">
            <i className="bi bi-twitter" style={{ fontSize: '1.5rem' }}></i>  {/* Icono de Twitter */}
          </a>
          <a href="https://instagram.com/tupagina" target="_blank" rel="noopener noreferrer" className="mx-2">
            <i className="bi bi-instagram" style={{ fontSize: '1.5rem' }}></i>  {/* Icono de Instagram */}
          </a>
          <a href="https://linkedin.com/tupagina" target="_blank" rel="noopener noreferrer" className="mx-2">
            <i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>  {/* Icono de LinkedIn */}
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;