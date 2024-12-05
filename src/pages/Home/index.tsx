import { useState } from 'react';
import Prefectures from '@/components/biz/Prefectures';

const Home: React.FC = () => {
  const [prefCodes, setPrefCodes] = useState<number[]>([]);
  // const { response: perYear } = usePerYearApi({
  //   runWhenCall: prefectures && prefectures.length > 0,
  //   data: { prefCode: 1 },
  // });
  function handlePrefectuersChange(selected: number[]) {
    // console.log(selected);
    setPrefCodes(selected);
  }
  return (
    <div>
      <Prefectures selected={prefCodes} onChange={handlePrefectuersChange} />
    </div>
  );
};

export default Home;
