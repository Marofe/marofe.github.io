import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  return (
    <div className="container">
      <section className={styles.contactSection}>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.title}
        >
          Contact Information
        </motion.h1>
        
        <div className={styles.contactGrid}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.contactInfo}
          >
            <div className={styles.contactItem}>
              <div className={styles.iconBox}><Mail /></div>
              <div>
                <h3>Email</h3>
                <p><a href="mailto:marofe@usp.br">marofe@usp.br</a></p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.iconBox}><Phone /></div>
              <div>
                <h3>Telephone</h3>
                <p>+55 (16) 3373-9339</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.iconBox}><MapPin /></div>
              <div>
                <h3>Location</h3>
                <p>
                  Department of Electrical and Computer Engineering (SEL)<br />
                  São Carlos School of Engineering (EESC)<br />
                  University of São Paulo (USP) - Area 1<br />
                  São Carlos, SP, Brazil
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.externalLinks}
          >
            <h3>Professional Profiles</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="http://lattes.cnpq.br/8922874435141893" target="_blank" rel="noopener noreferrer">
                  Lattes CV <ExternalLink size={16} />
                </a>
              </li>
              <li>
                <a href="https://scholar.google.com/citations?user=LEF5gHMAAAAJ" target="_blank" rel="noopener noreferrer">
                  Google Scholar <ExternalLink size={16} />
                </a>
              </li>
              <li>
                <a href="https://orcid.org/0000-0002-4848-1398" target="_blank" rel="noopener noreferrer">
                  ORCID <ExternalLink size={16} />
                </a>
              </li>
              <li>
                <a href="https://sel.eesc.usp.br/marcos-rogerio-fernandes/" target="_blank" rel="noopener noreferrer">
                  Institutional Page <ExternalLink size={16} />
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
