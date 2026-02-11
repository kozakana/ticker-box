import { fetchWatchlist } from "../services/watchlistApi";
import WatchlistEmptyState from "../components/WatchlistEmptyState";
import WatchlistTable from "../components/WatchlistTable";

export default async function HomePage() {
  const watchlist = await fetchWatchlist();

  if (!watchlist || watchlist.items.length === 0) {
    return (
      <main style={styles.main}>
        <WatchlistEmptyState />
      </main>
    );
  }

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <h1 style={styles.title}>{watchlist.name}</h1>
        <p style={styles.subtitle}>
          Multi-period performance snapshot across your watchlist.
        </p>
      </header>
      <WatchlistTable items={watchlist.items} />
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    padding: "40px 24px",
    background: "#f5f6f8",
    color: "#1b1f24",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
  },
  header: {
    maxWidth: "960px",
    margin: "0 auto 24px",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
  },
  subtitle: {
    margin: "8px 0 0",
    color: "#4b5563",
  },
};
