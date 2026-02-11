import ComparisonCell from "./ComparisonCell";
import type { WatchlistItem } from "../services/watchlistComparisons";

type Props = {
  items: WatchlistItem[];
};

const PERIOD_LABELS: Record<string, string> = {
  "1d": "1D",
  "1w": "1W",
  "1m": "1M",
  "3m": "3M",
  "6m": "6M",
  "1y": "1Y",
  ytd: "YTD",
};

export default function WatchlistTable({ items }: Props) {
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, textAlign: "left" }}>Instrument</th>
            {Object.entries(PERIOD_LABELS).map(([period, label]) => (
              <th key={period} style={styles.th}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.instrument.id} style={styles.row}>
              <td style={styles.instrument}>
                <div style={styles.symbol}>{item.instrument.symbol}</div>
                <div style={styles.name}>{item.instrument.name}</div>
              </td>
              {Object.keys(PERIOD_LABELS).map((period) => {
                const comparison = item.comparisons.find(
                  (entry) => entry.period === period
                );
                return (
                  <td key={period} style={styles.td}>
                    <ComparisonCell value={comparison?.percent_change ?? null} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: "960px",
    margin: "0 auto",
    background: "white",
    borderRadius: "16px",
    padding: "8px 16px 16px",
    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    padding: "12px 8px",
    color: "#6b7280",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  td: {
    padding: "12px 8px",
    textAlign: "center",
    borderTop: "1px solid #e5e7eb",
  },
  row: {
    borderBottom: "1px solid #e5e7eb",
  },
  instrument: {
    padding: "12px 8px",
    textAlign: "left",
    borderTop: "1px solid #e5e7eb",
  },
  symbol: {
    fontWeight: 700,
    fontSize: "15px",
  },
  name: {
    color: "#6b7280",
    fontSize: "12px",
  },
};
