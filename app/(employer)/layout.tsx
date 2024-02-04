import EmployerSidebar from "@/components/sidebars/EmpoyerSidebar";

export default function EmployersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmployerSidebar />
      <section className="w-full relative  md:pl-[96px] min-[1140px]:pl-[270px]">
        <div className="flex w-full flex-col h-full relative max-container pt-12 md:pt-0">
          {children}
        </div>
      </section>
    </>
  );
}
