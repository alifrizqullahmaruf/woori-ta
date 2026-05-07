export type Segment = { pct: number; color: string; label: string };

export function SegmentedBar({ segments }: { segments: ReadonlyArray<Segment> }) {
  return (
    <>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full">
        {segments.map((s) => (
          <div key={s.label} className="h-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
        ))}
      </div>
      <div className="mt-1.5 flex justify-end gap-3">
        {segments.map((s) => (
          <span key={s.label} className="typo-micro flex items-center gap-1 text-gray-w700">
            <span className="inline-block size-2 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </>
  );
}
