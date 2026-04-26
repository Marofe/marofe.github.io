import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.info}>
            <h3>Prof. Dr. Marcos Rogério Fernandes</h3>
            <p>Assistant Professor at SEL - EESC - USP</p>
          </div>
          <div className={styles.links}>
            <a href="https://sel.eesc.usp.br/marcos-rogerio-fernandes/" target="_blank" rel="noopener noreferrer">Institutional Profile</a>
            <a href="http://lattes.cnpq.br/8922874435141893" target="_blank" rel="noopener noreferrer">Lattes CV</a>
            <a href="https://scholar.google.com/citations?user=LEF5gHMAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>
            <a href="https://orcid.org/0000-0002-4848-1398" target="_blank" rel="noopener noreferrer">ORCID</a>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Marcos Rogério Fernandes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
