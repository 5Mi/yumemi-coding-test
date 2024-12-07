import { SpeedInsights } from '@vercel/speed-insights/react';
import AppRoutes from './routes';
import styles from './App.module.scss';

const App: React.FC = () => (
  <div className={styles.App}>
    <AppRoutes />
    <SpeedInsights />
  </div>
);

export default App;
