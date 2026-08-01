import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// import About from './pages/About';      // TODO: enable later
// import Services from './pages/Services'; // TODO: enable later
// import Contact from './pages/Contact';   // TODO: enable later
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/services" element={<Services />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
