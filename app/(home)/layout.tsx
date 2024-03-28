import { Nav } from "@/components/home/NavBar";
import Footer from "@/components/home/Footer";
import GotoTop from "@/components/GoToTop";
import Theme from "@/components/Theme";


export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
      <Theme />
      <GotoTop />
      <Footer />
    </>
  );
}
