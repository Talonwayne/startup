import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './Home';
import Scores from './pages/Scores';
import Play from './pages/Play';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/play" element={<Play />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;