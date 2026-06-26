export default function Button({text, type, onClick}) {
    return (
        <button type={type} onClick={onClick}>
            {text}
        </button>
    );
}