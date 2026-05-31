import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <h2><span className="logo-icon">🌐</span> InfoSphere</h2>
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}
          end
        >
          News
        </NavLink>
        <NavLink 
          to="/weather" 
          className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}
        >
          Weather
        </NavLink>
        <NavLink 
          to="/countries" 
          className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}
        >
          Countries
        </NavLink>
        <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}
