import styles from "./box-input.module.scss";

interface Props {
  customStyles: string;
  name: string;
  lbl: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  value?: string | number | readonly string[] | undefined;
  checked?: boolean | undefined;
  change: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const BoxBaseInput: React.FC<Props> = (props) => {
  const { customStyles, name, type, lbl, value, checked, change } = props;

  return (
    <div className={`${styles.boxInput} ${customStyles || ""}`}>
      <label htmlFor={name}>{lbl}</label>
      <input
        type={type}
        checked={checked}
        placeholder={lbl}
        name={name}
        id={name}
        onChange={change}
        value={value}
      />
    </div>
  );
};
