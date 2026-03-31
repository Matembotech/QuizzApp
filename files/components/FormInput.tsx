import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

/* ── FormInput ── */
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
export function FormInput({ label, error, id, ...rest }: FormInputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        className={`form-input ${error ? "error" : ""}`}
        {...rest}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

/* ── FormTextarea ── */
interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}
export function FormTextarea({ label, error, id, ...rest }: FormTextareaProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={inputId}>{label}</label>
      <textarea
        id={inputId}
        className={`form-textarea ${error ? "error" : ""}`}
        {...rest}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

/* ── SelectDropdown ── */
interface SelectOption { value: string; label: string }
interface SelectDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}
export function SelectDropdown({ label, options, error, placeholder, id, ...rest }: SelectDropdownProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={inputId}>{label}</label>
      <select id={inputId} className={`form-select ${error ? "error" : ""}`} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
