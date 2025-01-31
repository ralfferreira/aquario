import React from 'react';
import styles from "./UserCardIan.module.css";

const UserCardIan: React.FC = () => {
  return (
    <div className={styles.outerbox}>
        <div className={styles.image}>
            <img className={styles.imag} src="/aquario/src/Tests & Examples/img/IMG_0515 (1).jpeg" alt="profile picture" />
        </div>
        <div className={styles.name}>
            <div className={styles.upperbox}>
                <h2>Ian Rocha Bittencourt</h2>
                <p>PES</p>
            </div>
            <div className={styles.lowerbox}>
                <p>Ciência da Computação</p>
            </div>
        </div>
        <div className={styles.button}>
            <button>Site</button>
        </div>
    </div>
  );
};

export default UserCardIan;