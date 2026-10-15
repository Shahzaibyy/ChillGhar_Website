import { useId } from 'react';

export function Field({ label, hint, error, children, className = '' }) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>{label}</label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? 'true' : undefined })}
      {hint && <span className="hint" id={`${id}-hint`}>{hint}</span>}
      {error && <span className="error" id={`${id}-err`} role="alert">{error}</span>}
    </div>
  );
}

export function TextField({ label, hint, error, className, ...props }) {
  return (
    <Field label={label} hint={hint} error={error} className={className}>
      {(a11y) => <input className="input" {...a11y} {...props} />}
    </Field>
  );
}

export function SelectField({ label, hint, error, className, options, ...props }) {
  return (
    <Field label={label} hint={hint} error={error} className={className}>
      {(a11y) => (
        <select className="select" {...a11y} {...props}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )}
    </Field>
  );
}

export function TextAreaField({ label, hint, error, className, ...props }) {
  return (
    <Field label={label} hint={hint} error={error} className={className}>
      {(a11y) => <textarea className="textarea" {...a11y} {...props} />}
    </Field>
  );
}
