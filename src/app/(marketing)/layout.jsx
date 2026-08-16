import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function MarketingLayout({ children }) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
