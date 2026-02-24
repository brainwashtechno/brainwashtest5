import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BackgroundVideo from "@/components/background-video";

export const metadata = {
  title: "Brainwash",
  description: "Brainwash Techno — Atlanta underground.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BackgroundVideo />
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          <SiteHeader />
          <main style={{ paddingTop: 92, paddingBottom: 70 }}>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}