import RightSection from "@/components/auth/Right";
import OTPModal from "@/components/modals/VerifyModal";
// import

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid lg:grid-cols-2 h-screen grid-cols-1 lg:p-2 bg-greed-700 lg:bg-[#ffffff] ">
        <div className="overflow-y-auto overflow-x-hidden hide-scroll">
          {children}
        </div>
        <div className="caption_image hidden md:block lg:h-screen relative">
          <RightSection />
        </div>
      </div>
      <OTPModal />
    </>
  );
}
