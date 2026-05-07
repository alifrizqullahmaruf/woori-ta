import Image from "next/image";
import { BRAND } from "./data";

export function HeaderByLine() {
  return (
    <header className="flex items-center justify-end px-6 pt-5 pb-3">
      <div className="flex items-center gap-1 text-typo-micro text-gray-500">
        <span>by</span>
        <Image
          src={BRAND.headerLogo}
          alt="AdvisorLoren"
          width={97}
          height={21}
          unoptimized
          className="h-[21px] w-auto"
        />
      </div>
    </header>
  );
}
