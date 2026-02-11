type Props = {
  loading: boolean;
  error?: string | null;
};

export default function WatchlistStatus({ loading, error }: Props) {
  if (loading) {
    return <div style={styles.notice}>Loading watchlist...</div>;
  }

  if (error) {
    return <div style={{ ...styles.notice, color: "#dc2626" }}>{error}</div>;
  }

  return null;
}

const styles: Record<string, React.CSSProperties> = {
  notice: {
    padding: "12px 16px",
    background: "#f3f4f6",
    borderRadius: "10px",
    color: "#374151",
    fontSize: "14px",
  },
};
