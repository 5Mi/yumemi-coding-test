// https://github.com/recharts/recharts/issues/2174#issuecomment-1997275689
// 効果があまりなさそうだ😂
import type {
  LineChart as TLineChart,
  Line as TLine,
  XAxis as TXAxis,
  YAxis as TYAxis,
  Legend as TLegend,
  Tooltip as TTooltip,
  ResponsiveContainer as TResponsiveContainer,
  Customized as TCustomized,
  Text as TText,
} from 'recharts';

import { LineChart as LineChartImpl } from 'recharts/es6/chart/LineChart';
import { Line as LineImpl } from 'recharts/es6/cartesian/Line';
import { ResponsiveContainer as ResponsiveContainerImpl } from 'recharts/es6/component/ResponsiveContainer';
import { XAxis as XAxisImpl } from 'recharts/es6/cartesian/XAxis';
import { YAxis as YAxisImpl } from 'recharts/es6/cartesian/YAxis';
import { Legend as LegendImpl } from 'recharts/es6/component/Legend';
import { Tooltip as TooltipImpl } from 'recharts/es6/component/Tooltip';
import { Customized as CustomizedImpl } from 'recharts/es6/component/Customized';
import { Text as TextImpl } from 'recharts/es6/component/Text';

export const LineChart = LineChartImpl as typeof TLineChart;
export const Line = LineImpl as typeof TLine;
export const XAxis = XAxisImpl as typeof TXAxis;
export const YAxis = YAxisImpl as typeof TYAxis;
export const Legend = LegendImpl as typeof TLegend;
export const Tooltip = TooltipImpl as typeof TTooltip;
export const Customized = CustomizedImpl as typeof TCustomized;
export const ResponsiveContainer = ResponsiveContainerImpl as typeof TResponsiveContainer;
export const Text = TextImpl as typeof TText;
