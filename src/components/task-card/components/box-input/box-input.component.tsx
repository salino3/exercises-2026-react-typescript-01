import styles from "./box-input.module.scss";

interface Props {
  customStyles: string;
  name: string;
  lbl: string;
  value: string | number | readonly string[] | undefined;
  change: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const BoxBaseInput: React.FC<Props> = (props) => {
  const { customStyles, name, lbl, value, change } = props;

  return (
    <div className={`${styles.boxInput} ${customStyles}`}>
      <label htmlFor={name}>{lbl}</label>
      <input
        type="text"
        name={name}
        id="name"
        onChange={change}
        value={value}
      />
    </div>
  );
};
