import Image from "next/image";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-1 text-lg leading-9 font-normal">
      <Image
        src="/empty-box.png"
        width={400}
        height={300}
        alt="image of an empty box"
      />
      <p>No Notifications</p>
    </div>
  );
};

export default EmptyState;
