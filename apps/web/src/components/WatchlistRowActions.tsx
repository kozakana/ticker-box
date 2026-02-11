type Props = {
  symbol: string;
  onRemove: (symbol: string) => void;
};

export default function WatchlistRowActions({ symbol, onRemove }: Props) {
  return (
    <button
      type="button"
      onClick={() => onRemove(symbol)}
      style={styles.button}
    >
      Remove
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  button: {
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid #e5e7eb",
    background: "white",
    color: "#dc2626",
    fontWeight: 600,
    cursor: "pointer",
  },
};
