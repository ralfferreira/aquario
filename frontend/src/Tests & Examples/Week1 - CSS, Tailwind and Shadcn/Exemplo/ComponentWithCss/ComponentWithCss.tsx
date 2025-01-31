import React from 'react';
import styles from "./ComponentWithCss.module.css"

const ComponentWithCss: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Component With CSS</h1>
      <p className={styles.description}>This component is styled using CSS modules.</p>
      <div className={styles.button}>Normal CSS button</div>
    </div>
  );
};

export default ComponentWithCss;
