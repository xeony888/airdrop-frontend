import React from "react";

interface WalletInputAreaProps {
  value: string;
  onChange: (val: string) => void;
}

const WalletInputArea: React.FC<WalletInputAreaProps> = ({
  value,
  onChange,
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-32 bg-[#2D2D2D] text-white border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-gray-500"
      placeholder="WalletAddress1, WalletAddress2, WalletAddress3..."
    />
  );
};

export default WalletInputArea;