import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Customized,
  Text,
} from '@/utils/recharts';
import { type Fecture, type LabelData } from '@/types';
import { pCheckboxData, type CheckDataType } from './const';
import { requestPerYear } from '@/api';
import getColorRandom from '@/utils/randomColorGenerator';
import Checkbox from '@/components/ui/Checkbox';
import styles from './index.module.scss';

type PopulationChartProps = {
  selectFectures: Fecture[];
};

type HandleYearDataType = LabelData & { key: string; color?: string };

const PopulationChart: React.FC<PopulationChartProps> = ({ selectFectures }) => {
  const [chartData, setChartData] = useState<HandleYearDataType[]>([]);
  const [checkedLabels, setCheckedLabels] = useState<CheckDataType[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCheckedLabels([pCheckboxData[0]]);
  }, []);
  const isChecked = (checked: CheckDataType) => checkedLabels.some((per) => per.value === checked.value);

  const handleCheckboxChange = (checked: CheckDataType) => {
    const newCheckedLabels = isChecked(checked)
      ? checkedLabels.filter((per) => per.value !== checked.value)
      : [...checkedLabels, checked];
    setCheckedLabels(newCheckedLabels);
  };

  useEffect(() => {
    // avoid Race Condition
    let isSubscribed = true;
    const fetchData = async () => {
      if (selectFectures.length > 0) {
        setLoading(true);
      }
      const chartDatas = await Promise.all(selectFectures.map(async (fecture) => requestPerYear(fecture.prefCode)));
      if (!isSubscribed) return;

      // get handled data
      const newChartDatas: HandleYearDataType[] = [];
      const colors = getColorRandom(chartDatas.length);
      chartDatas.forEach((data, fectureIndex) => {
        // add same color for fecture
        data.forEach((_, perindex) => {
          const per = data[perindex] as HandleYearDataType;
          per.color = per.color || colors[fectureIndex];
        });
        checkedLabels.forEach((per) => {
          const { index } = per;
          const curFecture = selectFectures[fectureIndex];
          const cur = data[index] as HandleYearDataType;
          cur.label = `${curFecture.prefName}-${per.label}`;
          cur.key = `${curFecture.prefCode}-${per.value}`;

          cur.color = cur.color || colors[fectureIndex];
          newChartDatas.push(cur);
        });
      });
      setChartData(newChartDatas);
      setLoading(false);
    };
    fetchData();
    return () => {
      isSubscribed = false;
    };
  }, [selectFectures, checkedLabels]);

  const renderNodata = () =>
    chartData.length === 0 ? (
      <Text
        className={styles.noDataText}
        fill="#acacac"
        scaleToFit
        x={0}
        y={-10}
        textAnchor="middle"
        verticalAnchor="middle"
      >
        {loading ? 'データ読み込み中…' : '利用可能なデータがありません'}
      </Text>
    ) : null;

  return (
    <div className={styles.box}>
      <span className={styles.checkBoxTitle}>人口構成を選びください</span>
      <div className={styles.checkboxGroup}>
        {pCheckboxData.map((item) => (
          <Checkbox
            key={item.value}
            labelProps={{ htmlFor: `population-${item.value}` }}
            inputProps={{
              id: `population-${item.value}`,
              checked: isChecked(item),
              onChange: () => handleCheckboxChange(item),
            }}
          >
            {item.label}
          </Checkbox>
        ))}
      </div>
      <div className={chartData.length === 0 ? `${styles.chartContainer} ${styles.noData}` : styles.chartContainer}>
        <ResponsiveContainer>
          <LineChart
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="year"
              padding={{ right: 35 }}
              label={{ value: '年', position: 'insideBottomRight' }}
              type="category"
              allowDuplicatedCategory={false}
            />
            <YAxis dataKey="value" padding={{ top: 30 }} label={{ value: '人口', position: 'insideTopLeft' }} />
            <Tooltip />
            <Legend />
            {chartData.map((perData) => (
              <Line dataKey="value" data={perData.data} name={perData.label} key={perData.key} stroke={perData.color} />
            ))}
            <Customized component={renderNodata} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PopulationChart;
