import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <NavLink to="/" className={styles.logo}>
          Prof. Dr. Marcos R. Fernandes
        </NavLink>

        <div className={styles.mobileMenuIcon} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/research" className={({ isActive }) => isActive ? styles.activeLink : ''}>
              Research
            </NavLink>
          </li>
          <li>
            <NavLink to="/cv" className={({ isActive }) => isActive ? styles.activeLink : ''}>
              CV
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses" className={({ isActive }) => isActive ? styles.activeLink : ''}>
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? styles.activeLink : ''}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
