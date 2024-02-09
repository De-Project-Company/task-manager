export default function SkeletonNavbar() {
  return (
    <div className="w-full flex justify-between items-center gap-x-2 h-[56px] px-2 sm:px-4 sm:py-6 py-4">
      <div className="animate-pulse [animation-delay:0.4s] bg-black/20 h-full w-full max-w-[100px] rounded-md" />

      <div className="hidden lg:flex items-center gap-x-2 md:gap-x-6 w-full max-w-[500px] justify-center h-full">
        <div className="animate-pulse [animation-delay:0.5s] bg-black/20 h-full w-full rounded-full" />
        <div className="animate-pulse [animation-delay:0.4s] bg-black/20 h-full w-full rounded-full" />
        <div className="animate-pulse [animation-delay:0.3s] bg-black/20 h-full w-full rounded-full" />
        <div className="animate-pulse [animation-delay:0.2s] bg-black/20 h-full w-full rounded-full" />
      </div>

      <div className="animate-pulse [animation-delay:0.1s] bg-black/20 h-full w-full max-w-[70px] lg:max-w-[200px] rounded-md lg:rounded-full" />
    </div>
  );
}
