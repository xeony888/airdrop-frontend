import { useEffect, useMemo, useState } from "react";
import SendModeToggle from "./SendModeToggle";
import Summary from "./Summary";
import TokenSelector from "./TokenSelector";
import WalletInputArea from "./WalletInputArea";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createAssociatedTokenAccountInstruction, createTransferInstruction, getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWalletSignIn } from "./hooks/UserWalletSignIn";
import BasicButton from "./BasicButton";
import { PublicKey, Transaction } from "@solana/web3.js";
import AirdropSelector from "./AirdropSelector";
import { useTransactionSend } from "./hooks/TransactionSend";

export type Token = {
  mint: string,
  owner: string,
  amount: number,
  decimals: number,
  tokenAccountPubkey: string
}
export default function HomeForm() {
  const { connection } = useConnection();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [sendMode, setSendMode] = useState<"SAME" | "DIFFERENT">("SAME");
  const [walletsText, setWalletsText] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [userAirdrops, setUserAirdrops] = useState<any[]>([]);
  const [selectedAirdrop, setSelectedAirdrop] = useState<any>();
  const [airdropPublicKeyBalance, setAirdropPublicKeyBalance] = useState<number>(0);

  const { publicKey, signTransaction } = useWallet();
  const { sig, message } = useWalletSignIn();
  const { sendTransaction } = useTransactionSend();
  const [airdropQueuePosition, setAirdropQueuePosition] = useState<number>(0);
  const [airdropPercentage, setAirdropPercentage] = useState<number>(0);
  const [airdropSuccess, setAirdropSuccess] = useState<boolean>(false);
  const [airdropFailure, setAirdropFailure] = useState<boolean>(false);
  const [airdropId, setAirdropId] = useState<string>("");

  useEffect(() => {
    if (!publicKey) return;
    try {
      (async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${publicKey.toString()}/airdrops`);
        const json = await response.json();
        setUserAirdrops(json);
      })()
    } catch (e) {
      console.error(e);
    }
  }, [publicKey])
  useEffect(() => {
    if (!publicKey) return;
    (async () => {
      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { programId: TOKEN_PROGRAM_ID }
        );

        // Convert raw token accounts into something more readable
        setTokens(tokenAccounts.value.map(({ pubkey, account }) => ({
          mint: account.data.parsed.info.mint.toString(),
          owner: account.data.parsed.info.owner.toString(),
          amount: account.data.parsed.info.tokenAmount.uiAmount,
          decimals: account.data.parsed.info.tokenAmount.decimals,
          tokenAccountPubkey: pubkey.toString(),
        })));
      } catch (error) {
        console.error('Error fetching token accounts', error);
        return [];
      }
    })();
  }, [publicKey]);

  const walletCount = walletsText
    ? walletsText.split(",").filter((line: string) => line.trim() !== "").length
    : 0;

  const handleSend = async () => {
    // Implement your send logic
    if (!publicKey) return;
    console.log({ airdropId })
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/airdrop`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sig,
            message,
            pubkey: publicKey.toString(),
            targetAddresses: walletsText.split(","),
            amount,
            id: airdropId
          })
        }
      )
      if (response.status === 200) {
        const { id } = await response.json();
        while (true) {
          console.log(airdropId);
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/poll/${airdropId}`);
          const { queuePosition, percentage } = await response.json();
          console.log(queuePosition, percentage);
          setAirdropQueuePosition(Number(queuePosition));
          setAirdropPercentage(Number(percentage));
          if (percentage >= 100) {
            setAirdropSuccess(true);
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (e) {
      console.error(e);
      setAirdropFailure(true);
    }
  };
  const createNewAirdrop = async () => {
    if (!sig || !publicKey || !selectedToken) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/airdrop/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pubkey: publicKey.toString(),
            sig,
            message,
            mintAddress: selectedToken.mint
          })
        }
      );
      const { id, publicKey: pubkey } = await response.json();
      console.log(id, pubkey);
      setSelectedAirdrop({ id, pubkey })
      setAirdropId(id);
    } catch (e) {
      console.error(e);
    }
  }
  const sendRequiredTokenAmount = async () => {
    if (!selectedToken || !publicKey || !signTransaction) {
      console.log(selectedToken, publicKey, signTransaction);
      return;
    }
    try {
      const requiredTokenAmount = BigInt(amount) * BigInt(walletCount) * (BigInt(10) ** BigInt(selectedToken.decimals));
      console.log(requiredTokenAmount);
      const mint = new PublicKey(selectedToken.mint);
      const associatedToken = getAssociatedTokenAddressSync(mint, publicKey);
      const destination = new PublicKey(selectedAirdrop.pubkey);
      const destinationTokenAccount = getAssociatedTokenAddressSync(mint, destination)
      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          publicKey,
          destinationTokenAccount,
          destination,
          mint
        ),
        createTransferInstruction(
          associatedToken,
          destinationTokenAccount,
          publicKey,
          requiredTokenAmount
        )
      );
      await sendTransaction(transaction);
      // const blockhash = await connection.getLatestBlockhash();
      // transaction.feePayer = publicKey;
      // transaction.recentBlockhash = blockhash.blockhash;
      // const sig = await connection.sendRawTransaction(transaction.serialize());
      // await connection.confirmTransaction({
      //   blockhash: blockhash.blockhash,
      //   lastValidBlockHeight: blockhash.lastValidBlockHeight,
      //   signature: sig
      // });
      // console.log(sig);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="flex flex-col justify-center items-start w-full">
      {/* {!selectedAirdrop ?
        <div className="flex flex-col justify-center items-center w-full gap-2">
          <AirdropSelector availableAirdrops={userAirdrops} selectedAirdrop={selectedAirdrop} onSelectAirdrop={setSelectedAirdrop} />
          
        </div>
        :
        <> */}
      <h1 className="text-3xl font-bold mb-6 text-center w-full">Airdrop</h1>
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select TOKEN to airdrop</label>
        <TokenSelector
          selectedToken={selectedToken}
          availableTokens={tokens}
          onSelectToken={setSelectedToken}
        />
      </div>

      {/* Toggle: SAME/DIFFERENT */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Choose how to send</label>
        <SendModeToggle sendMode={sendMode} onChange={setSendMode} onChangeValue={setAmount} />
      </div>

      {/* Wallet Input Area */}
      <div className="mb-6 w-full">
        <label className="block mb-2 font-medium">
          Paste Wallet Addresses in correct format
        </label>
        <WalletInputArea
          value={walletsText}
          onChange={setWalletsText}
        />
      </div>
      {selectedAirdrop ?
        <div className="flex flex-col justify-center items-center w-full">
          <p>Your public key: {selectedAirdrop?.pubkey}</p>
          <p>Your public key balance: {airdropPublicKeyBalance}</p>
          <BasicButton onClick={sendRequiredTokenAmount} text="Send Required Token Amount" disabled={amount === "0" || walletCount === 0} />
        </div>
        :
        <div className="flex flex-col justify-center items-center w-full">
          <BasicButton onClick={createNewAirdrop} text="Create new Airdrop" disabled={!selectedToken} />
        </div>
      }
      {/* Summary */}
      <div className="flex flex-col justify-center items-center w-full mt-6">
        <Summary
          walletCount={walletCount}
          selectedToken={selectedToken?.mint || ""}
          solFee={0} // Insert your logic
        />

        {/* Send Button */}
        <div className="mt-6">
          {!airdropFailure && !airdropSuccess ?
            <BasicButton onClick={handleSend} text="Send" />
            :
            <div className="p-6 bg-gray-100 rounded shadow-md w-96">
              <h2 className="text-lg font-bold mb-4 text-center">Airdrop Status</h2>

              <div className="mb-4">
                <span className="font-semibold">Queue Position:</span>{" "}
                <span>{airdropQueuePosition}</span>
              </div>

              {airdropQueuePosition === 0 && !airdropSuccess && !airdropFailure && (
                <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all"
                    style={{ width: `${airdropPercentage}%` }}
                  ></div>
                </div>
              )}

              {airdropSuccess && (
                <div className="text-green-500 font-semibold text-center">
                  🎉 Airdrop Successful!
                </div>
              )}

              {airdropFailure && (
                <div className="text-red-500 font-semibold text-center">
                  ❌ Airdrop Failed. Please try again.
                </div>
              )}
            </div>
          }
        </div>
      </div>
    </div >
  )
}