
interface TokenSelectorProps {
    selectedAirdrop: any;
    availableAirdrops: any[];
    onSelectAirdrop: (airdrop: any) => void;
}

const AirdropSelector: React.FC<TokenSelectorProps> = ({
    selectedAirdrop,
    availableAirdrops,
    onSelectAirdrop,
}) => {
    return (
        <select
            value={selectedAirdrop?.pubkey || ""}
            onChange={(e) => onSelectAirdrop(availableAirdrops.find((airdrop) => airdrop.pubkey === e.target.value)!)}
            className="w-full bg-[#2D2D2D] text-white border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-gray-500"
        >
            <option key="1" value="">Select an AIRDROP</option>
            {availableAirdrops.map((airdrop) => (
                <option key={airdrop.pubkey} value={airdrop.pubkey}>{airdrop.pubkey}</option>
            ))}
            {/* Add more token options as needed */}
        </select>
    );
};

export default AirdropSelector;