import styles from './index.module.scss';
import Checkbox from '@/components/ui/Checkbox';
import { usePrefecturesApi } from '@/api';

interface PrefecturesProps {
  selected: number[];
  onChange: (selected: number[]) => void;
}

const Prefectures: React.FC<PrefecturesProps> = ({ selected, onChange }) => {
  const nameConst = 'prefecture';
  const { response: prefectures } = usePrefecturesApi();
  const handleCheckboxChange = (prefCode: number) => {
    const newSelected = selected.includes(prefCode)
      ? selected.filter((code) => code !== prefCode)
      : [...selected, prefCode];
    onChange(newSelected);
  };

  return (
    <div className={styles.box}>
      <h2>都道府県</h2>
      <div className={styles.checkboxGroup}>
        {prefectures &&
          prefectures.map((per) => (
            <Checkbox
              key={per.prefCode}
              labelProps={{ htmlFor: `${nameConst}-${per.prefCode}` }}
              inputProps={{
                id: `${nameConst}-${per.prefCode}`,
                checked: selected.includes(per.prefCode),
                onChange: () => handleCheckboxChange(per.prefCode),
              }}
            >
              {per.prefName}
            </Checkbox>
          ))}
      </div>
    </div>
  );
};

export default Prefectures;
