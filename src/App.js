import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import main from './Style/main.scss'
import Footer from './cpm/Footer';
import AppHeader from './cpm/AppHeader';
import About from './cpm/About';
import GalleryPage from './pages/GalleryPage';
import ContactUs from './cpm/ContactUs';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="">
<AppHeader />
      </header>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edit" element={<PhotoEdit />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<LoginForm />} />
      </Routes>
     <Footer />
    </div>
    </Router>
  );
}

export default App;
