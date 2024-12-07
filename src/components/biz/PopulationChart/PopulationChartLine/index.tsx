/**
 * 残念ながら、RechartsのLineなどのコンポーネントは、フックを使用する状況下では高階コンポーネントとしてカプセル化することができませんでした。この問題で長時間試行錯誤しましたが、最終的に諦めることになりました。詳細については、 [issue](https://github.com/recharts/recharts/issues/412)
 */
import { Line } from 'recharts';
import { LabelData, type Fecture } from '@/types';
import { type CheckDataType } from '../const';
import { usePerYearApi } from '@/api';

interface PopulationChartLineProps {
  color: string;
  checkedPopulationLabels: CheckDataType[];
  fecture: Fecture;
}

// const defaultColor = '#3498db';
const ChartLine: React.FC<PopulationChartLineProps> = ({ color, checkedPopulationLabels, fecture, ...props }) => {
  const { response } = usePerYearApi({
    data: { prefCode: fecture.prefCode },
  });

  const perYearLabelDatas = response?.data || [];

  const checkedLabelDatas =
    perYearLabelDatas.length === 0
      ? []
      : checkedPopulationLabels.map((per) => {
          const { index } = per;
          const cur = perYearLabelDatas[index] as LabelData & { key: string };
          cur.label = `${fecture.prefName}-${per.label}`;
          cur.key = `${fecture.prefCode}-${per.value}`;
          return cur;
        });

  return checkedLabelDatas.map((per) => (
    <Line {...props} data={per.data} name={per.label} key={per.key} stroke={color} />
  ));
};

const PopulationChartLine = (props: PopulationChartLineProps) => ChartLine(props);
PopulationChartLine.defaultProps = Line.defaultProps;
PopulationChartLine.displayName = Line.displayName;
PopulationChartLine.getComposedData = Line.getComposedData;
PopulationChartLine.repeat = Line.repeat;
PopulationChartLine.renderDotItem = Line.renderDotItem;
export default PopulationChartLine;
