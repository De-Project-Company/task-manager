export default function CardSkelon() {
  return (
    <div className="w-full flex flex-col border border-gray-200  pl-4 pt-6 max-w-[454px] h-[261px] rounded-xl sm:rounded-2xl">
      <div className="space-y-4  w-full ">
        <div className="bg-black/20 h-10 w-10 rounded-md animate-pulse [animation-delay:0.1s]" />
        <div className="flex w-[100% space-x-1">
          <div className="w-full space-y-2">
            <div className="animate-pulse [animation-delay:0.2s] bg-black/20 h-6 w-[90%] rounded-full" />
            <div className="animate-pulse [animation-delay:0.3s] bg-black/20 h-6 w-[80%] rounded-full" />
            <div className="animate-pulse [animation-delay:0.3s] bg-black/20 h-6 w-[80%] rounded-full" />
            <div className="animate-pulse [animation-delay:0.3s] bg-black/20 h-6 w-[80%] rounded-full" />
            <div className="animate-pulse [animation-delay:0.3s] bg-black/20 h-8  w-[40%] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
