import Image from "next/image";
import { THEMES } from "./data";

export function ThemesSection() {
  return (
    <section className="px-6 pt-10">
      <h2 className="text-typo-large font-bold leading-7">
        몰려든 테마, 결과는 달랐을지도?
      </h2>

      <ul className="mt-5 flex flex-col gap-2">
        {THEMES.map((theme) => (
          <li
            key={theme.nameKo}
            className="flex items-center gap-3 rounded-xl bg-gray-100 px-3 py-3"
          >
            <Image
              src={theme.icon}
              alt=""
              width={36}
              height={36}
              unoptimized
              className="size-9 shrink-0 rounded-full object-contain"
            />
            <span className="flex-1 text-typo-small font-medium">
              {theme.nameKo}
            </span>
            <span className="shrink-0 text-typo-small font-semibold text-error-100">
              {theme.delta}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
