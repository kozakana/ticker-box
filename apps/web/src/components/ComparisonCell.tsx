type Props = {
  value: number | null;
};

export default function ComparisonCell({ value }: Props) {
  if (value === null || Number.isNaN(value)) {
    return <span style={styles.na}>N/A</span>;
  }

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  const isPositive = value > 0;
  const isNegative = value < 0;

  return (
    <span
      style={{
        ...styles.value,
        color: isPositive ? "#059669" : isNegative ? "#dc2626" : "#111827",
      }}
    >
      {isPositive ? "+" : ""}
      {formatted}%
    </span>
  );
}

const styles: Record<string, React.CSSProperties> = {
  value: {
    fontWeight: 600,
  },
  na: {
    color: "#9ca3af",
    fontStyle: "italic",
  },
};
