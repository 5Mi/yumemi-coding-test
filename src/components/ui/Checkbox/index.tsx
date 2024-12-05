import styles from './index.module.scss';

interface CheckboxProps {
  children?: React.ReactNode;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
}

const Checkbox: React.FC<CheckboxProps> = ({ inputProps, labelProps, children }) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={styles.uiCheckbox} {...labelProps}>
    <input type="checkbox" className={styles.checkbox} {...inputProps} />
    <div className={styles.check} />
    <span className={styles.checkLabel}>{children}</span>
  </label>
);

export default Checkbox;
