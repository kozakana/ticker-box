export const metadata = {
  title: "Watchlist Performance",
  description: "Multi-period watchlist snapshot",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
