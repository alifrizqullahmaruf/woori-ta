import Image from "next/image";
import { ICONS, ISSUES } from "./data";

export function IssuesSection() {
  return (
    <section className="px-6 pt-10 pb-12">
      <header className="mb-1.5 flex items-center justify-between gap-3">
        <h2 className="text-typo-large font-bold leading-7">
          오늘 투자자들,
          <br />이 이슈가 중심이에요
        </h2>
        <Image
          src={ICONS.chevronRight}
          alt=""
          width={21}
          height={21}
          className="size-[21px] shrink-0"
        />
      </header>

      <ul className="mt-5 flex flex-col gap-4">
        {ISSUES.map((issue) => (
          <li
            key={issue.titleKo}
            className="flex flex-col gap-3 rounded-xl bg-gray-100 p-5"
          >
            <header className="flex items-start justify-between gap-3">
              <h3 className="flex-1 text-typo-small font-semibold leading-snug">
                {issue.titleKo}
              </h3>
              <Image
                src={ICONS.externalLink}
                alt=""
                width={15}
                height={15}
                unoptimized
                className="mt-1 size-[15px] shrink-0"
              />
            </header>

            <p className="text-typo-tiny leading-snug text-gray-700">
              {issue.bodyKo}
            </p>

            <div className="relative aspect-[630/350] w-full overflow-hidden rounded-lg bg-white">
              <Image
                src={issue.hero}
                alt=""
                fill
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-contain"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
