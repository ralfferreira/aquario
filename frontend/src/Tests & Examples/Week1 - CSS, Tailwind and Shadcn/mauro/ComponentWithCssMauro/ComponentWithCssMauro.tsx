import React from 'react';
import styles from "./ComponentWithCssMauro.module.css"

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const ComponentWithCssMauro: React.FC = () => {
  return (
    <div className={styles.gridWrapper}>
      <div className={styles.gridContainer}>
        <div className={styles.flexContainer}>
          <img src="/images/settings.svg" className={styles.image}></img>
          <h2 className={`${inter.className} ${styles.title}`}>Engenharia da Computação</h2>
        </div>
        <div className={styles.flexContainer}>
          <img src="/images/file-text.svg" width="30px"></img>
          <h2 className={`${inter.className} ${styles.title}`}>Documentação</h2>
          <p className={`${inter.className} ${styles.subTitle}`}>Veja guias, perguntas prequentes e documentos importantes acerca do curso.</p>
        </div>
        <div className={styles.flexContainer}>
          <img src="/images/monitor.svg" className={styles.image}></img>
          <h2 className={`${inter.className} ${styles.title}`}>Ciência da Computação</h2>
        </div>
        <div className={styles.flexContainer}>
          <img src="/images/grid-2x2-check.svg" className={styles.image}></img>
          <h2 className={`${inter.className} ${styles.title}`}>Seletor de Cadeiras</h2>
          <p className={`${inter.className} ${styles.subTitle}`}>O seletor de cadeiras utiliza de grafos para permitir uma melhor visualização das suas cadeiras, os pré-requisito e a ementa do curso.</p>
        </div>
        <div className={styles.flexContainer}>
          <img src="/images/zap.svg" className={styles.image}></img>
          <h2 className={`${inter.className} ${styles.title}`}>Ciência de Dados e Inteligência Artificial</h2>
        </div>
      </div>
    </div>
  );
};

export default ComponentWithCssMauro;
