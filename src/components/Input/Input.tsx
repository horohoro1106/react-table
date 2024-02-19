import { InputFieldProps } from "../../lib/types";
import styles from "./Input.module.css";

export function Input({ register, label, name, error, type }: InputFieldProps) {
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
