import RightSection from "@/components/auth/Right";
import OTPModal from "@/components/modals/VerifyModal";
import Theme from "@/components/Theme";
import { GoBack } from "./GoBack";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="grid lg:grid-cols-2 grid-cols-1 lg:p-2 bg-greed-700 lg:bg-[#ffffff] dark:bg-primary 
      transition-colors duration-500"
      >
        <div className="overflow-y-auto overflow-x-hidden no-scroll flex flex-col h-screen">
          <GoBack />
          {children}
        </div>
        <div className="caption_image hidden md:block lg:h-screen relative">
          <RightSection />
        </div>
      </div>
      <Theme />
      <OTPModal />
    </>
  );
}
