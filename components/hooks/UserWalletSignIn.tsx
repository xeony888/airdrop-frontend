import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, useContext, useEffect, useState } from "react"
import bs58 from "bs58";

type UserWalletSignInProps = {
    message: string;
    sig?: string;
    publicKey?: string
}

const message = "Sign this message to sign in";
const UserWalletSignInContext = createContext<UserWalletSignInProps>({} as UserWalletSignInProps);

export function UserWalletSignInProvider({ children }: { children: React.ReactNode }) {
    const { publicKey, signMessage } = useWallet();
    const [sig, setSig] = useState<string>();
    useEffect(() => {
        if (!publicKey || !signMessage) return;
        (async () => {
            const m = new TextEncoder().encode(message);
            while (true) {
                try {
                    const signature = await signMessage(m);
                    const sig = bs58.encode(signature);
                    setSig(sig);
                    break;
                } catch (e) {
                    console.error(e);
                }
            }
        })();
    }, [publicKey, signMessage]);
    return (
        <UserWalletSignInContext.Provider
            value={{
                message,
                sig,
                publicKey: publicKey?.toString()
            }}
        >
            {children}
        </UserWalletSignInContext.Provider>
    )
}


export function useWalletSignIn() {
    const context = useContext(UserWalletSignInContext);
    if (!context) {
        throw new Error("Context must be used within context provider");
    }
    return context
}