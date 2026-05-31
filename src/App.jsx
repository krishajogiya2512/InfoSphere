import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './pages/News';
import Weather from './pages/Weather';
import Countries from './pages/Countries';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/countries" element={<Countries />} />
      </Routes>
    </>
  );
}
