export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-full border border-transparent bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)] shadow-[0_16px_40px_rgba(38,244,208,0.2)] transition duration-150 ease-in-out hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 active:translate-y-0 ${disabled && "opacity-25"} ` +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
