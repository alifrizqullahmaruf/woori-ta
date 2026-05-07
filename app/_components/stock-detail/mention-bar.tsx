export function MentionBar({ count, max }: { count: number; max: number }) {
  const pct = Math.round((count / max) * 100);
  return (
    <div className="flex-1 h-3 overflow-hidden rounded-full bg-gray-w200">
      <div className="h-full rounded-full bg-gray-w600" style={{ width: `${pct}%` }} />
    </div>
  );
}
