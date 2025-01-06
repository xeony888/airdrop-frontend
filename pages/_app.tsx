import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@solana/wallet-adapter-react-ui/styles.css";
import "@/styles/globals.css";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { CoinbaseWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import type { AppProps } from "next/app";
import { Noto_Sans, Titillium_Web } from "next/font/google";
import { useMemo } from "react";
import { UserWalletSignInProvider } from "@/components/hooks/UserWalletSignIn";
import { TransactionSendProvider } from "@/components/hooks/TransactionSend";

const noto = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});
const titillium = Titillium_Web({
  display: "optional",
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const wallets = useMemo(
    () => [new CoinbaseWalletAdapter(), new TorusWalletAdapter()],
    [],
  );
  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_RPC_URL!}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          <TransactionSendProvider>
            <UserWalletSignInProvider>
              <div
                lang="en"
                className={`${noto.variable} ${titillium.variable} font-serif antialiased`}
              >
                <div className="min-h-screen bg-[#161616] text-white">
                  <Header />
                  <Component {...pageProps} />
                  <Footer />
                </div>
              </div>
            </UserWalletSignInProvider>
          </TransactionSendProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
