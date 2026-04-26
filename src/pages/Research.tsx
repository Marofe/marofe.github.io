import React from 'react';
import { motion } from 'framer-motion';
import styles from './Research.module.css';

const Research: React.FC = () => {
  const focusAreas = [
    {
      title: "Stochastic Filtering",
      description: "Development and analysis of recursive estimation algorithms for stochastic systems, focusing on performance under varying noise conditions."
    },
    {
      title: "Kalman Filtering",
      description: "Application and optimization of Kalman filter variants (EKF, UKF) for real-time state estimation in engineering systems."
    },
    {
      title: "Non-linear Filtering",
      description: "Theoretical and practical approaches to filtering in non-linear systems, exploring particle filters and other numerical methods."
    },
    {
      title: "GNSS/INS Navigation",
      description: "Integrated navigation systems combining Global Navigation Satellite Systems with Inertial Navigation Systems."
    },
    {
      title: "Lie Group Theory",
      description: "Utilizing Lie groups for robust estimation and control in robotics and aerospace navigation systems."
    },
    {
      title: "Radar Tracking Systems",
      description: "Development of advanced algorithms for target detection, classification, and trajectory estimation in complex radar environments."
    }
  ];

  return (
    <div className="container">
      <section className={styles.section}>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.title}
        >
          Research Interests
        </motion.h1>
        <p className={styles.subtitle}>
          My research focuses on the intersection of stochastic processes, estimation theory, and navigation systems.
        </p>

        <div className={styles.focusGrid}>
          {focusAreas.map((area, index) => (
            <motion.div 
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={styles.focusCard}
            >
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Selected Publications</h2>
        <p className={styles.placeholder}>
          For a full list of publications, please refer to my 
          <a href="http://lattes.cnpq.br/8922874435141893" target="_blank" rel="noopener noreferrer"> Lattes CV</a>, 
          <a href="https://scholar.google.com/citations?user=LEF5gHMAAAAJ" target="_blank" rel="noopener noreferrer"> Google Scholar</a> or 
          <a href="https://orcid.org/0000-0002-4848-1398" target="_blank" rel="noopener noreferrer"> ORCID</a> profile.
        </p>
      </section>
    </div>
  );
};

export default Research;
