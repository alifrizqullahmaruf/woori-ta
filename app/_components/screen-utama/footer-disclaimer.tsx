import Image from "next/image";
import { BRAND, DISCLAIMER_LINES } from "./data";

export function FooterDisclaimer() {
  return (
    <footer className="bg-divider px-6 pt-9 pb-10">
      <Image
        src={BRAND.footerLogo}
        alt="AdvisorLoren"
        width={97}
        height={21}
        unoptimized
        className="h-[21px] w-auto"
      />
      <div className="mt-4 flex flex-col gap-3 text-gray-w600">
        {DISCLAIMER_LINES.map((line, idx) => (
          <p key={idx} className="typo-micro leading-snug">
            {line}
          </p>
        ))}
      </div>
    </footer>
  );
}
