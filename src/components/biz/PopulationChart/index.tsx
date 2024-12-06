import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { type Fecture, type LabelData } from '@/types';
import { pCheckboxData, type CheckDataType } from './const';
import { requestPerYear } from '@/api';
import Checkbox from '@/components/ui/Checkbox';
// import PopulationChartLine from './PopulationChartLine';
import styles from './index.module.scss';

type PopulationChartProps = {
  selectFectures: Fecture[];
};

type HandleYearDataType = LabelData & { key: string; color: string };

const PopulationChart: React.FC<PopulationChartProps> = ({ selectFectures }) => {
  const [chartData, setChartData] = useState<HandleYearDataType[]>([]);

  const [checkedLabels, setCheckedLabels] = useState<CheckDataType[]>([]);
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
    const fetchData = async () => {
      const chartDatas = await Promise.all(selectFectures.map(async (fecture) => requestPerYear(fecture.prefCode)));

      // get handled data
      const newChartDatas: LabelData[] = [];
      chartDatas.forEach((data, fectureIndex) => {
        checkedLabels.forEach((per) => {
          const { index } = per;
          const curFecture = selectFectures[fectureIndex];
          const cur = data[index] as HandleYearDataType;
          cur.label = `${curFecture.prefName}-${per.label}`;
          cur.key = `${curFecture.prefCode}-${per.value}`;
          cur.color = 'red';
          newChartDatas.push(cur);
        });
      });

      setChartData(newChartDatas as any);
    };
    fetchData();
  }, [selectFectures, checkedLabels]);

  return (
    <div className={styles.box}>
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
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="year" label="年" type="category" allowDuplicatedCategory={false} />
          <YAxis dataKey="value" label="人口数" />
          <Tooltip />
          <Legend />
          {chartData.map((perData) => (
            <Line dataKey="value" data={perData.data} name={perData.label} key={perData.key} stroke="#3498db" />
          ))}
          {/* {selectFectures.map((fecture) => (
            <PopulationChartLine
              key={fecture.prefCode}
              fecture={fecture}
              checkedPopulationLabels={checkedLabels}
              color="red"
            />
          ))} */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationChart;
