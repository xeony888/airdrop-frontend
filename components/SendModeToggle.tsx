import React, { useState } from "react";

interface SendModeToggleProps {
  sendMode: "SAME" | "DIFFERENT";
  onChange: (mode: "SAME" | "DIFFERENT") => void;
  onChangeValue: (value: string) => void;
}

const SendModeToggle: React.FC<SendModeToggleProps> = ({
  sendMode,
  onChange,
  onChangeValue
}) => {
  // local state to hold the single-amount value
  const [amount, setAmount] = useState("");

  return (
    <div className="flex items-center gap-2">
      {/* Toggle Buttons */}
      <button
        onClick={() => onChange("SAME")}
        className={`px-4 py-2 rounded font-semibold transition-colors
          ${sendMode === "SAME"
            ? "bg-[#CFA74A] text-white"
            : "bg-[#2D2D2D] text-white"
          }
        `}
      >
        SAME AMOUNT
      </button>
      {/* <button
        onClick={() => onChange("DIFFERENT")}
        className={`px-4 py-2 rounded font-semibold transition-colors
          ${sendMode === "DIFFERENT"
            ? "bg-[#CFA74A] text-white"
            : "bg-[#2D2D2D] text-white"
          }
        `}
      >
        DIFFERENT AMOUNT
      </button> */}

      {/* Conditionally show input when the mode is SAME */}
      {sendMode === "SAME" && (
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            onChangeValue(e.target.value);
          }}
          className="ml-4 w-32 rounded bg-[#2D2D2D] text-white 
                     border border-[#9E9E9E] px-2 py-1 focus:outline-none 
                     focus:ring focus:ring-[#CFA74A] focus:ring-opacity-50"
        />
      )}
    </div>
  );
};

export default SendModeToggle;