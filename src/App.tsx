import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Estudiantina from './pages/estudiantina';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estudiantina" element={<Estudiantina />} />
      </Routes>
    </Router>
  );
}

export default App;