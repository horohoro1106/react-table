import { FormInputFieldProps } from "../../lib/types";
import styles from "./FormInput.module.css";

export function FormInput({
  register,
  label,
  name,
  error,
  type,
}: FormInputFieldProps) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        {...register(name, { required: true })}
        placeholder={label}
        id={name}
        className={styles.input}
        aria-invalid={error ? "true" : "false"}
        type={type}
      />
      {error ? (
        <span className={styles.errorMsg}>{label} field is required</span>
      ) : null}
    </div>
  );
}
