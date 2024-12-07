import { SpeedInsights } from '@vercel/speed-insights/react';
import AppRoutes from './routes';
import styles from './App.module.scss';

const App: React.FC = () => (
  <div className={styles.App}>
    <AppRoutes />
    {import.meta.env.MODE === 'production' && <SpeedInsights />}
  </div>
);

export default App;
