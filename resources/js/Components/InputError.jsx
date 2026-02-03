export default function InputError({ message, className = "", ...props }) {
    return message ? (
        <p {...props} className={"text-sm text-[#ff6b6b] " + className}>
            {message}
        </p>
    ) : null;
}
