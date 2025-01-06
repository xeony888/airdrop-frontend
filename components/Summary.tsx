import React from "react";

interface SummaryProps {
  walletCount: number;
  selectedToken: string;
  solFee: number;
}

const Summary: React.FC<SummaryProps> = ({
  walletCount,
  selectedToken,
  solFee,
}) => {
  return (
    <div className="bg-[#2D2D2D] p-4 rounded border border-gray-600 w-full flex flex-col items-center justify-center">
      <p className="mb-1">
        <span className="font-medium">Number of wallets:</span> {walletCount || "-"}
      </p>
      <p className="mb-1">
        <span className="font-medium">TOKEN to Distribute:</span>{" "}
        {selectedToken || "-"}
      </p>
      <p>
        <span className="font-medium">SOL Fee to send:</span> {solFee || "-"}
      </p>
    </div>
  );
};

export default Summary;