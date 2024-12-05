export type YearData = {
  year: number;
  value: number;
  rate?: number;
};

export type LabelData = {
  label: string;
  data: YearData[];
};

export type PopulationData = {
  boundaryYear: number;
  data: LabelData[];
};

export type Fecture = {
  prefCode: number;
  prefName: string;
};
