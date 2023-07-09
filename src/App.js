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


function App() {
  
  return (
    <Router>
    <div className="App">
      <header className="">
<AppHeader />
      </header>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/photo/edit" element={<PhotoEdit />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery/:category?" element={<GalleryPage />} />
      <Route path="/photo/:id" element={<PhotoDetails />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<LoginForm />} />
      </Routes>
     <Footer />
    </div>
    </Router>
  );
}

export default App;
