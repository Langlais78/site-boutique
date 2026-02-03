import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);
    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));
    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);
    return (
        <input
            {...props}
            type={type}
            className={
                "rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--ink)] shadow-[0_10px_30px_rgba(5,10,20,0.35)] backdrop-blur-sm focus:border-[var(--accent)] focus:ring-[var(--accent)] " +
                className
            }
            ref={localRef}
        />
    );
});
