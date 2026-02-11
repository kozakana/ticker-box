type Props = {
  onAdd: (input: { symbol: string; name: string; type: "stock" | "index" }) => void;
};

export default function WatchlistAddForm({ onAdd }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const symbol = String(formData.get("symbol") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const type = String(formData.get("type") || "stock");

    if (!symbol || !name || (type !== "stock" && type !== "index")) {
      return;
    }

    onAdd({ symbol, name, type });
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input name="symbol" placeholder="Symbol" style={styles.input} />
      <input name="name" placeholder="Name" style={styles.input} />
      <select name="type" defaultValue="stock" style={styles.select}>
        <option value="stock">Stock</option>
        <option value="index">Index</option>
      </select>
      <button type="submit" style={styles.button}>
        Add
      </button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
  },
  select: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#111827",
    color: "white",
    fontWeight: 600,
  },
};
