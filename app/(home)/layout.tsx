import { Nav } from "@/components/home/NavBar";
import Footer from "@/components/home/Footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
