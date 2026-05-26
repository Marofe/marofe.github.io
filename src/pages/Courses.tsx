import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Book, GraduationCap, BookOpen } from 'lucide-react';
import styles from './Courses.module.css';

interface Course {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

const Courses: React.FC = () => {
  const undergraduateCourses: Course[] = [
    {
      title: "Signals and Systems",
      description: "Fundamental concepts of continuous and discrete-time signals and systems, including Fourier, Laplace, and Z-transforms.",
      link: "https://marofe.github.io/sinais-sistemas/",
      tags: ["Signals", "Systems", "Undergraduate"]
    },
    {
      title: "Digital Signal Processing",
      description: "Analysis and representation of discrete-time signals and systems, DFT/FFT, and design and implementation of FIR and IIR digital filters.",
      link: "https://marofe.github.io/processamento-digital-sinais/",
      tags: ["DSP", "Digital Systems", "Signal Processing"]
    },
    {
      title: "Digital Control",
      description: "Design and analysis of digital control systems, discrete-time state-space representation, and implementation of digital controllers.",
      link: "https://marofe.github.io/controle-digital/",
      tags: ["Control Theory", "Digital Systems", "Engineering"]
    }
  ];

  const graduateCourses: Course[] = [
    {
      title: "Linear System Theory",
      description: "Graduate-level course covering state-space analysis, controllability, observability, stability, and state-feedback control of linear systems.",
      link: "https://marofe.github.io/linear-system-theory/",
      tags: ["Linear Systems", "State-Space", "Graduate"]
    }
  ];

  const renderCourseCard = (course: Course, index: number) => (
    <motion.div 
      key={course.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={styles.courseCard}
    >
      <div className={styles.courseIcon}>
        <Book size={24} />
      </div>
      <div className={styles.courseContent}>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className={styles.tags}>
          {course.tags.map((tag: string) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <a href={course.link} target="_blank" rel="noopener noreferrer" className={styles.courseLink}>
          Access Course Material <ExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  );

  return (
    <div className="container">
      <section className={styles.coursesSection}>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.title}
        >
          Courses & Teaching
        </motion.h1>
        <p className={styles.subtitle}>
          Teaching materials and course resources for students at EESC-USP.
        </p>

        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <BookOpen size={24} />
            <h2>Undergraduate Courses</h2>
          </div>
          <div className={styles.courseGrid}>
            {undergraduateCourses.map((course, index) => renderCourseCard(course, index))}
          </div>
        </div>

        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <GraduationCap size={28} />
            <h2>Graduate Courses</h2>
          </div>
          <div className={styles.courseGrid}>
            {graduateCourses.map((course, index) => renderCourseCard(course, index))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
