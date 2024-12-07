import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const NotFound: React.FC = () => (
  <div className={`page-box ${styles.pageNotFound}`}>
    <main className={styles.container}>
      <h1 className={styles.title}>Not Found - 404</h1>
      <p>An error has occurred, to continue:</p>
      <p>
        Return to our <Link to="/">homepage</Link>.
      </p>
    </main>
  </div>
);

export default NotFound;
