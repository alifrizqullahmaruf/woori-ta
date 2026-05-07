export function QuestionBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-5 items-center justify-center rounded-full bg-[#3F4050] text-[11px] text-white"
    >
      ?
    </button>
  );
}
