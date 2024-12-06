import styles from './index.module.scss';
import Checkbox from '@/components/ui/Checkbox';
import { type Fecture } from '@/types';
import { usePrefecturesApi } from '@/api';

interface PrefecturesProps {
  selected: Fecture[];
  onChange: (selected: Fecture[]) => void;
}

const Prefectures: React.FC<PrefecturesProps> = ({ selected, onChange }) => {
  const nameConst = 'prefecture';
  const { response: prefectures } = usePrefecturesApi();
  const handleCheckboxChange = (fecture: Fecture) => {
    const newSelected = selected.some((per) => per.prefCode === fecture.prefCode)
      ? selected.filter((per) => per.prefCode !== fecture.prefCode)
      : [...selected, fecture];
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
                checked: selected.some((select) => select.prefCode === per.prefCode),
                onChange: () =>
                  handleCheckboxChange({
                    prefCode: per.prefCode,
                    prefName: per.prefName,
                  }),
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
