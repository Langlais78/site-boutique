import { LabelHTMLAttributes } from 'react';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={
                `block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)] ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
