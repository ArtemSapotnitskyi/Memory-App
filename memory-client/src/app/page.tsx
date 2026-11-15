import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col h-full w-full pt-4">
      <div className="flex-1 flex items-center justify-center bg-[#E5E5E5] dark:bg-[#1A1A1E] rounded-[40px] mb-6 shadow-inner">
        <span className="text-3xl font-extrabold text-white dark:text-[#2c2c2e]">
          Not Card yet
        </span>
      </div>

      <BottomNav />
    </div>
  );
}
