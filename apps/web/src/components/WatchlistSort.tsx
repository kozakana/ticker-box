type SortKey = "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "ytd";

type Props = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "1d", label: "1D" },
  { value: "1w", label: "1W" },
  { value: "1m", label: "1M" },
  { value: "3m", label: "3M" },
  { value: "6m", label: "6M" },
  { value: "1y", label: "1Y" },
  { value: "ytd", label: "YTD" },
];

export default function WatchlistSort({ value, onChange }: Props) {
  return (
    <div style={styles.wrapper}>
      <label style={styles.label} htmlFor="watchlist-sort">
        Sort by
      </label>
      <select
        id="watchlist-sort"
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        style={styles.select}
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  label: {
    fontSize: "13px",
    color: "#6b7280",
  },
  select: {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    background: "white",
  },
};
