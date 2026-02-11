export default function WatchlistEmptyState() {
  return (
    <section style={styles.wrapper}>
      <h1 style={styles.title}>Watchlist is empty</h1>
      <p style={styles.body}>
        Add your first stock or index to start tracking multi-period performance.
      </p>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: "560px",
    margin: "120px auto",
    padding: "40px",
    textAlign: "center",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
  },
  title: {
    margin: 0,
    fontSize: "26px",
  },
  body: {
    marginTop: "12px",
    color: "#6b7280",
  },
};
