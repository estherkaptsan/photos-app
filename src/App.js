import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import main from './Style/main.scss'
import Footer from './cpm/Footer';
import AppHeader from './cpm/AppHeader';
import About from './cpm/About';
import GalleryPage from './pages/GalleryPage';
import ContactUs from './cpm/ContactUs';
import PhotoEdit from './pages/PhotoEdit';
import LoginForm from './pages/LogIn';
import { PhotoDetails } from './pages/PhotoDetail';
import ResetPassword from './pages/ResetPassword';
import PasswordResetPage from './pages/PasswordResetPage';



function Header() {
  const location = useLocation();
  const showHeader = !(location.pathname.includes('/photo/') && !location.pathname.includes('/photo/edit'));

  return showHeader ? <AppHeader /> : null;
}


function App() {

  return (
    <Router>
      <div className="App">
        <header className="">
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photo/edit" element={<PhotoEdit />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery/:category?" element={<GalleryPage />} />
          <Route path="/photo/:id" element={<PhotoDetails />} />
          {/* <Route path="/contact" element={<ContactUs />} /> */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/reset/password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<PasswordResetPage />} />
        </Routes>
      </div>
      <Footer />
    </Router> 
  );
}

export default App;
