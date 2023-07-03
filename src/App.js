import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import main from './Style/main.scss'
import Footer from './cpm/Footer';
import AppHeader from './cpm/AppHeader';
import About from './cpm/About';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="">
<AppHeader />
      </header>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      </Routes>
     <Footer />
    </div>
    </Router>
  );
}

export default App;
