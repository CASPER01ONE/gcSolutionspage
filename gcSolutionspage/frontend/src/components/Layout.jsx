import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />  {/* Aquí se renderizan las páginas hijas */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;