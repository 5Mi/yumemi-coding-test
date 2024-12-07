import { useState } from 'react';
import Prefectures from '@/components/biz/Prefectures';
import PopulationChart from '@/components/biz/PopulationChart';
import { type Fecture } from '@/types';

const Home: React.FC = () => {
  const [selectFectures, setSelectFectures] = useState<Fecture[]>([]);
  function handlePrefectuersChange(selected: Fecture[]) {
    setSelectFectures(selected);
  }
  return (
    <div className="page-box">
      <Prefectures selected={selectFectures} onChange={handlePrefectuersChange} />
      <PopulationChart selectFectures={selectFectures} />
    </div>
  );
};

export default Home;
