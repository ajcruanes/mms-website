import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import BMC from './pages/BMC';
import OpenClimbs from './pages/OpenClimbs';
import ClimbDetail from './pages/ClimbDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyClimbs from './pages/MyClimbs';
import Admin from './pages/Admin';

function Layout({ children, hideFooter }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/bmc" element={<Layout><BMC /></Layout>} />
          <Route path="/open-climbs" element={<Layout><OpenClimbs /></Layout>} />
          <Route path="/climb/:id" element={<Layout><ClimbDetail /></Layout>} />
          <Route path="/my-climbs" element={<Layout><MyClimbs /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
