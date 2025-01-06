import { createContext, useContext, useState } from "react";
import { Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

type TransactionSendProps = {
    sendTransaction: (t: Transaction) => Promise<void>
}
const TransactionSendContext = createContext<TransactionSendProps>({} as TransactionSendProps);
export function TransactionSendProvider({ children }: { children: React.ReactNode }) {
    const { connection } = useConnection();
    const { publicKey, signTransaction } = useWallet();
    const [transactionError, setTransactionError] = useState<boolean>(false);
    const [transactionSuccess, setTransactionSuccess] = useState<boolean>(false);
    const [sendingTransaction, setSendingTransaction] = useState<boolean>(false);
    const [sig, setSig] = useState<string>("");
    const sendTransaction = async (t: Transaction) => {
        if (!publicKey || !signTransaction) return;
        let sig: string = "";
        try {
            setSendingTransaction(true);
            const blockhash = await connection.getLatestBlockhash();
            t.recentBlockhash = blockhash.blockhash;
            t.feePayer = publicKey
            const signed = await signTransaction(t);
            sig = await connection.sendRawTransaction(signed.serialize());
            await connection.confirmTransaction({
                blockhash: blockhash.blockhash,
                lastValidBlockHeight: blockhash.lastValidBlockHeight,
                signature: sig
            });
            setTransactionSuccess(true);
        } catch (e) {
            console.error(e);
            setTransactionError(true);
        } finally {
            setSig(sig);
            setTimeout(() => {
                setTransactionError(false);
                setTransactionSuccess(false);
                setSendingTransaction(false);
            }, 3000);
        }
    }
    return (
        <TransactionSendContext.Provider value={{ sendTransaction }}>
            <div className="w-screen h-screen relative">
                {children}
                {sendingTransaction &&
                    <div className="absolute bottom-0 left-0 m-4 border-2 border-[#CFA74A] rounded-lg w-36 h-24 flex flex-row justify-center items-center">
                        {!transactionError && !transactionSuccess ?
                            <>
                                <Spinner />
                                <p>Sending Transaction...</p>
                            </>
                            :
                            <>
                                {transactionError ?
                                    <p>❌</p>
                                    :
                                    <p>✅</p>
                                }
                                <p>Signature: {sig}</p>
                            </>
                        }
                    </div>
                }
            </div>
        </TransactionSendContext.Provider>
    )
}

interface SpinnerProps {
    size?: number; // Size of the spinner in pixels
}
const Spinner: React.FC<SpinnerProps> = ({ size = 40 }) => {
    return (
        <div
            className="border-4 border-t-transparent border-solid rounded-full animate-spin"
            style={{
                width: size,
                height: size,
                borderWidth: size / 10, // Adjust the border width relative to the size
            }}
        ></div>
    );
};

export function useTransactionSend() {
    const context = useContext(TransactionSendContext);
    if (!context) {
        throw new Error("Context not found");
    }
    return context
}