type CardFrameProps = {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export function CardFrame({ className = "", children, style }: CardFrameProps) {
  return (
    <div
      className={`rounded-xl ${className}`}
      style={{
        boxShadow: "3px 4px 15px 0px #85A5D940",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
