import React from "react";
import { Token } from "./HomeForm";

interface TokenSelectorProps {
  selectedToken?: Token;
  availableTokens: Token[];
  onSelectToken: (token: Token) => void;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  availableTokens,
  onSelectToken,
}) => {
  return (
    <select
      value={selectedToken?.mint || ""}
      onChange={(e) => onSelectToken(availableTokens.find((token) => token.mint === e.target.value)!)}
      className="w-full bg-[#2D2D2D] text-white border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-gray-500"
    >
      <option key="1" value="">Select a TOKEN</option>
      {availableTokens.map((token) => (
        <option key={token.mint} value={token.mint}>{token.mint}</option>
      ))}
      {/* Add more token options as needed */}
    </select>
  );
};

export default TokenSelector;