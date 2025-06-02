import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Estudiantina from './pages/estudiantina';
import Austria from './pages/austria';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estudiantina" element={<Estudiantina />} />
        <Route path="/austria" element={<Austria />} />

      </Routes>
    </Router>
  );
}

export default App;