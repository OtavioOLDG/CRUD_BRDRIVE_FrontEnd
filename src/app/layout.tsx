import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, overflowX: "hidden" }} // 🔒 evita scroll lateral
      >
        <header
          style={{
            backgroundColor: "#4CAF50",
            padding: "10px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1>Bem-vindo ao Zoológico</h1>
          <p>Explore o mundo dos animais!</p>
        </header>

        {children}
      </body>
    </html>
  );
}
