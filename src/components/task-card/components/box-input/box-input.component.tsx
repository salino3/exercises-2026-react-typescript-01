import styles from "./box-input.module.scss";

interface Props {
  customStyles: string;
  name: string;
  lbl: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  value?: string | number | readonly string[] | undefined;
  checked?: boolean | undefined;
  change: React.ChangeEventHandler<HTMLInputElement> | undefined;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  ariaDescribedBy?: string;
}

export const BoxBaseInput: React.FC<Props> = (props) => {
  const {
    customStyles,
    name,
    type,
    lbl,
    value,
    checked,
    change,
    required = false,
    error,
    disabled = false,
    ariaDescribedBy,
  } = props;

  const errorId = error ? `${name}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div
      style={{
        paddingBottom: error ? "0px" : "24px",
      }}
      className={`${styles.boxInput} ${customStyles || ""}`}
    >
      <label htmlFor={name}>
        {lbl}
        {required && <span aria-label="required"> *</span>}
      </label>
      <input
        type={type}
        checked={checked}
        placeholder={lbl}
        name={name}
        id={name}
        onChange={change}
        value={value}
        required={required}
        disabled={disabled}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        aria-disabled={disabled}
      />
      {error && (
        <span
          id={errorId}
          className={styles.errorMessage}
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
};
