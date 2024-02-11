import { Nav } from "@/components/home/NavBar";
import Footer from "@/components/home/Footer";
import GotoTop from "@/components/GoToTop";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
      <GotoTop />
      <Footer />
    </>
  );
}
