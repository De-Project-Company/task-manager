import RightSection from "@/components/auth/Right";
// import 

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid lg:grid-cols-2 h-screen grid-cols-1 lg:p-2 bg-greed-700 lg:bg-[#ffffff] ">
        {children}
        <div className="caption_image hidden md:block lg:h-full relative">
          <RightSection />
        </div>
      </div>
    </>
  );
}
