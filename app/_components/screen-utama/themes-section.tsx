import Image from "next/image";
import { CardFrame } from "./card-frame";
import { THEMES } from "./data";

const CIRCLE_COLORS = [
  { bg: "#2684FF33", text: "#2962FF" },
  { bg: "#A56EFF33", text: "#A56EFF" },
  { bg: "#60C86433", text: "#60C864" },
  { bg: "#FA8C1633", text: "#FA8C16" },
  { bg: "#E3485033", text: "#E34850" },
];

export function ThemesSection() {
  return (
    <section className="px-6">
      <h2 className="typo-large font-bold">
        Trending themes — but the results may differ.
      </h2>

      <ul className="mt-[18px] flex flex-col gap-[9px]">
        {THEMES.map((theme, idx) => {
          const color = CIRCLE_COLORS[idx % CIRCLE_COLORS.length];
          const isPositive = !theme.delta.startsWith("-");
          return (
            <li key={theme.name}>
              <CardFrame className="flex items-center gap-3 px-3 py-[9px]">
                <div
                  className="relative mr-[9px] flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full"
                  style={{ backgroundColor: color.bg }}
                >
                  <Image
                    src={theme.icon}
                    alt=""
                    fill
                    sizes="36px"
                    unoptimized
                    className="object-contain p-0.5"
                  />
                </div>
                <span className="typo-small flex-1 font-medium text-gray-w900">
                  {theme.name}
                </span>
                <span
                  className="font-numbers typo-small font-bold"
                  style={{ color: isPositive ? "#e34850" : "#4590ff" }}
                >
                  {isPositive ? "+" : ""}{theme.delta.replace("+", "")}
                </span>
              </CardFrame>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
