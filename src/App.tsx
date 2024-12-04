import { useState } from 'react';
import styles from './App.module.scss';
import { usePrefecturesApi, usePerYearApi } from '@/api';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const { response: prefectures } = usePrefecturesApi();
  const { response: perYear } = usePerYearApi({ runWhenCall: prefectures?.length > 0, data: { prefCode: 1 } });
  return (
    <div className={styles.App}>
      Hello world
      <button type="button" onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
      <div>prefectures: {JSON.stringify(prefectures)}</div>
      <div>perYear: {JSON.stringify(perYear)}</div>
    </div>
  );
};

export default App;
