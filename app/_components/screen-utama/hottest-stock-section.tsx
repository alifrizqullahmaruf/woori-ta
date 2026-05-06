import Image from "next/image";
import { HOTTEST_STOCK_TAGS, ICONS, MENTION_TAGS } from "./data";

export function HottestStockSection() {
  return (
    <section className="px-6 pt-4">
      <header className="mb-1.5 flex items-start justify-between gap-3">
        <h2 className="text-typo-large font-bold leading-7">
          The hottest stock these days
          <br />
          there&rsquo;s a reason for it
        </h2>
        <Image
          src={ICONS.aiBadge}
          alt="AI"
          width={21}
          height={21}
          className="mt-1 size-[21px] shrink-0"
        />
      </header>

      <p className="text-typo-small text-gray-700">
        I&rsquo;ll show you at a glance why the whole world has gathered here.
      </p>

      <div className="mt-6 rounded-2xl bg-primary-100/30 px-5 py-6">
        <p className="text-center text-typo-small text-gray-800">
          It was the hottest thing on social media for the past 5 days.
        </p>

        <p className="mt-3 text-center text-2xl font-bold text-primary-600">
          Mentioned 927 times!
        </p>

        <ul className="mt-5 flex justify-center gap-6 text-typo-micro text-gray-700">
          {MENTION_TAGS.map((tag) => (
            <li key={tag.count} className="flex items-center gap-1">
              <Image
                src={tag.flag}
                alt=""
                width={16}
                height={16}
                className="size-4 object-contain"
              />
              <span>{tag.count}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-typo-tiny leading-tight text-gray-700">
          NVDA is drawing attention as its data center revenue surged 209% amid
          the strength of the AI semiconductor sector, but concerns over
          valuation and controversy over its slower growth rate compared to
          other semiconductor stocks coexist.
        </p>

        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {HOTTEST_STOCK_TAGS.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white px-3 py-1 text-typo-micro text-primary-700"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
