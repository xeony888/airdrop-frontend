import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative z-10 bg-[#161616]">
      <div className="border-b border-white/15 py-8">
        <div className="container mx-auto flex items-center justify-center px-6 md:justify-between">
          <Image
            src="/images/gotm-logo.png"
            alt="GOTM Labz Logo"
            height={77}
            width={91}
            priority
            className="hidden md:block"
          />
          <div className="flex items-center space-x-6 md:space-x-8">
            <p className="font-normal">Follow us</p>
            <SocialIcons />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-7">
        <p className="text-white/50">
          © 2024 GOTM Labz - All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export function SocialIcons() {
  return (
    <ul className="flex items-center space-x-4 md:space-x-6">
      <li>
        <Link
          href="https://twitter.com/gangsofthemeta"
          className="group"
          target="_blank"
        >
          <XIcon />
        </Link>
      </li>
      <li>
        <Link href="https://discord.gg/gotm" className="group" target="_blank">
          <DiscordIcon />
        </Link>
      </li>
    </ul>
  );
}

const XIcon = () => (
  <svg
    width="24"
    height="22"
    viewBox="0 0 24 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.901 0H22.581L14.541 9.19L24 21.693H16.594L10.794 14.109L4.156 21.693H0.474L9.074 11.863L0 0.00100005H7.594L12.837 6.933L18.901 0ZM17.61 19.491H19.649L6.486 2.087H4.298L17.61 19.491Z"
      className="fill-white/50 group-hover:fill-[#45BAD4CC]"
    />
    <defs>
      <linearGradient
        id="paint0_linear_6559_385"
        x1="0"
        y1="10.8465"
        x2="24"
        y2="10.8465"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1A5D82" />
        <stop offset="0.525" stopColor="#45BAD5" />
        <stop offset="1" stopColor="#1A5D82" />
      </linearGradient>
    </defs>
  </svg>
);

const DiscordIcon = () => (
  <svg
    width="27"
    height="21"
    viewBox="0 0 27 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.2102 2.50625C20.5477 1.73125 18.7477 1.16875 16.8727 0.84375C16.8397 0.84422 16.8083 0.857698 16.7852 0.88125C16.5602 1.29375 16.2977 1.83125 16.1227 2.24375C14.1339 1.94394 12.1115 1.94394 10.1227 2.24375C9.94771 1.81875 9.68521 1.29375 9.44771 0.88125C9.43521 0.85625 9.39771 0.84375 9.3602 0.84375C7.4852 1.16875 5.6977 1.73125 4.02271 2.50625C4.0102 2.50625 3.99771 2.51875 3.98521 2.53125C0.585205 7.61875 -0.352295 12.5687 0.110205 17.4688C0.110205 17.4937 0.122705 17.5188 0.147705 17.5312C2.39771 19.1812 4.56021 20.1812 6.69771 20.8438C6.73521 20.8563 6.77271 20.8438 6.7852 20.8187C7.2852 20.1312 7.73521 19.4062 8.12271 18.6437C8.14771 18.5938 8.12271 18.5437 8.07271 18.5312C7.36021 18.2563 6.68521 17.9313 6.02271 17.5563C5.97271 17.5313 5.97271 17.4563 6.01021 17.4188C6.14771 17.3188 6.2852 17.2063 6.42271 17.1063C6.44771 17.0813 6.48521 17.0812 6.51021 17.0938C10.8102 19.0562 15.4477 19.0562 19.6977 17.0938C19.7227 17.0812 19.7602 17.0813 19.7852 17.1063C19.9227 17.2188 20.0602 17.3188 20.1977 17.4313C20.2477 17.4688 20.2477 17.5437 20.1852 17.5687C19.5352 17.9562 18.8477 18.2687 18.1352 18.5438C18.0852 18.5562 18.0727 18.6187 18.0852 18.6562C18.4852 19.4188 18.9352 20.1437 19.4227 20.8312C19.4602 20.8438 19.4977 20.8563 19.5352 20.8438C21.6852 20.1812 23.8477 19.1812 26.0977 17.5312C26.1227 17.5188 26.1352 17.4937 26.1352 17.4688C26.6852 11.8062 25.2227 6.89375 22.2602 2.53125C22.2477 2.51875 22.2352 2.50625 22.2102 2.50625ZM8.77271 14.4812C7.48521 14.4812 6.41021 13.2937 6.41021 11.8313C6.41021 10.3687 7.46021 9.18125 8.77271 9.18125C10.0977 9.18125 11.1477 10.3813 11.1352 11.8313C11.1352 13.2937 10.0852 14.4812 8.77271 14.4812ZM17.4852 14.4812C16.1977 14.4812 15.1227 13.2937 15.1227 11.8313C15.1227 10.3687 16.1727 9.18125 17.4852 9.18125C18.8102 9.18125 19.8602 10.3813 19.8477 11.8313C19.8477 13.2937 18.8102 14.4812 17.4852 14.4812Z"
      className="fill-white/50 group-hover:fill-[#45BAD4CC]"
    />
    <defs>
      <linearGradient
        id="paint0_linear_6559_384"
        x1="0"
        y1="10.8463"
        x2="26.2493"
        y2="10.8463"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1A5D82" />
        <stop offset="0.525" stopColor="#45BAD5" />
        <stop offset="1" stopColor="#1A5D82" />
      </linearGradient>
    </defs>
  </svg>
);
