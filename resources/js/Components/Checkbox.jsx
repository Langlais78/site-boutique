export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-white/20 bg-white/5 text-[var(--accent)] shadow-sm focus:ring-[var(--accent)] " +
                className
            }
        />
    );
}
