import "./globals.css";

export const metadata = {
  title: "Nova Pay | Streams",
  description: "Continuous micropayments on Soroban.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen p-6 max-w-5xl mx-auto font-sans">
        {children}
      </body>
    </html>
  );
}