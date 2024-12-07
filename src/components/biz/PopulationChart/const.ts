export const pCheckboxData = [
  {
    value: 'total',
    label: '総人口',
    index: 0,
  },
  {
    value: 'child',
    label: '年少人口',
    index: 1,
  },
  {
    value: 'workingAge',
    label: '生産年齢人口',
    index: 2,
  },
  {
    value: 'elderly',
    label: '老年人口',
    index: 3,
  },
];

export type CheckDataType = (typeof pCheckboxData)[number];
