

export default function BasicButton({
    text,
    onClick,
    disabled
}: {
    text: string,
    onClick: () => void,
    disabled?: boolean
}) {
    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`${disabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#CFA74A] hover:bg-[#b88b3b]"
                } text-white font-semibold py-2 px-5 rounded transition-colors w-full sm:w-auto`}
        >
            {text}
        </button>
    );
}