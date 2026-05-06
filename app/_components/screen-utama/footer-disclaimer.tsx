import Image from "next/image";
import { BRAND, DISCLAIMER_LINES } from "./data";

export function FooterDisclaimer() {
  return (
    <footer className="bg-border px-6 pt-9 pb-10">
      <Image
        src={BRAND.footerLogo}
        alt="어드바이저로렌"
        width={97}
        height={21}
        className="h-[21px] w-auto"
      />
      <div className="mt-4 flex flex-col gap-3 text-typo-micro leading-snug text-gray-700">
        {DISCLAIMER_LINES.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </footer>
  );
}
