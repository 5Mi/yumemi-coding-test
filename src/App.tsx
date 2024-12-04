import { useState } from 'react';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.App}>
      Hello world
      <button type="button" onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
    </div>
  );
};

export default App;
