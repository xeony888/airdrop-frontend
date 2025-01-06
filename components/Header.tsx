"use client";

import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "./Footer";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
export default function Header() {

  return (
    <div className="relative z-10 border-b border-[#CDA742] bg-[#161616] py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image
              src="/images/gotm-logo.png"
              alt="GOTM Labz Logo"
              height={77}
              width={91}
              priority
            />
          </Link>
          <div className="hidden space-x-6 md:flex">
            <Link
              href="#"
              className="font-semibold opacity-50 hover:opacity-100"
            >
              NFT Tools
            </Link>
            <Link
              href="#"
              className="font-semibold opacity-50 hover:opacity-100"
            >
              Token
            </Link>
            <Link
              href="#"
              className="font-semibold opacity-50 hover:opacity-100"
            >
              Wallet
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="https://wp.gangsofthemeta.io/"
              target="_blank"
              className="font-serif font-semibold opacity-50 hover:opacity-100"
            >
              WhitePaper
            </Link>
            <SocialIcons />
          </div>
          <WalletMultiButton />
        </div>
      </div>
    </div>
  );
}
