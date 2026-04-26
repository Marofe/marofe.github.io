import React from 'react';
import { motion } from 'framer-motion';
import styles from './CV.module.css';

const CV: React.FC = () => {
  const education = [
    {
      degree: "Doctorate in Automation",
      institution: "Unicamp (FEEC)",
      year: "2023",
      details: "Faculty of Electrical and Computer Engineering"
    },
    {
      degree: "Master's in Automation",
      institution: "Unicamp (FEEC)",
      year: "2019",
      details: "Faculty of Electrical and Computer Engineering"
    },
    {
      degree: "B.S. in Control and Automation Engineering",
      institution: "UTFPR",
      year: "2017",
      details: "Federal Technological University of Paraná"
    }
  ];

  const experience = [
    {
      role: "Assistant Professor",
      company: "Department of Electrical and Computer Engineering (SEL), EESC-USP",
      period: "June 2024 – Present",
      description: "Faculty member in the area of Control and Applications."
    },
    {
      role: "Electronic Engineer",
      company: "Angra Nuclear Power Plant (Eletronuclear)",
      period: "Nov 2022 – May 2024",
      description: "Engineering and maintenance operations in the nuclear sector."
    }
  ];

  return (
    <div className="container">
      <div className={styles.cvWrapper}>
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.timeline}>
            {experience.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.period}>{item.period}</div>
                <div className={styles.content}>
                  <h3>{item.role}</h3>
                  <h4>{item.company}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.timeline}>
            {education.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.period}>{item.year}</div>
                <div className={styles.content}>
                  <h3>{item.degree}</h3>
                  <h4>{item.institution}</h4>
                  <p>{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CV;
