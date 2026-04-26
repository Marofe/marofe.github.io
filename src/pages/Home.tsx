import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, GraduationCap, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import profileImg from '../assets/profile.jpg';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroFlex}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={styles.heroContent}
            >
              <h1 className={styles.name}>Prof. Dr. Marcos Rogério Fernandes</h1>
              <h2 className={styles.title}>Assistant Professor</h2>
              <p className={styles.department}>
                Department of Electrical and Computer Engineering (SEL)<br />
                São Carlos School of Engineering (EESC)<br />
                University of São Paulo (USP)
              </p>
              <div className={styles.ctaButtons}>
                <Link to="/research" className={styles.primaryBtn}>
                  Research Interests <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className={styles.secondaryBtn}>
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className={styles.heroImage}
            >
              <img src={profileImg} alt="Marcos Rogério Fernandes" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={styles.overview}>
        <div className="container">
          <div className={styles.grid}>
            <motion.div 
              whileHover={{ y: -5 }}
              className={styles.card}
            >
              <div className={styles.iconWrapper}><BookOpen /></div>
              <h3>Research</h3>
              <p>Specializing in stochastic filtering, Kalman filtering, and non-linear filtering for GNSS/INS navigation.</p>
              <Link to="/research" className={styles.cardLink}>Learn more</Link>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className={styles.card}
            >
              <div className={styles.iconWrapper}><GraduationCap /></div>
              <h3>Experience</h3>
              <p>Professor at USP and former Electronic Engineer at Angra Nuclear Power Plant.</p>
              <Link to="/cv" className={styles.cardLink}>View CV</Link>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className={styles.card}
            >
              <div className={styles.iconWrapper}><Mail /></div>
              <h3>Contact</h3>
              <p>Available for academic collaboration and professional inquiries at EESC-USP.</p>
              <Link to="/contact" className={styles.cardLink}>Contact info</Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
