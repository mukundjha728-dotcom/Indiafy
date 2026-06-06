export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-3 border border-zinc-100 animate-pulse">
      <div className="w-full aspect-square bg-zinc-100 rounded-xl mb-2.5" />
      <div className="w-4/5 h-3 bg-zinc-100 rounded-md mb-1.5" />
      <div className="w-1/2 h-2.5 bg-zinc-100 rounded-md mb-3" />
      <div className="flex justify-between items-end">
        <div className="w-12 h-4 bg-zinc-100 rounded-md" />
        <div className="w-14 h-8 bg-zinc-100 rounded-xl" />
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 animate-pulse">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-100 rounded-2xl" />
      <div className="w-12 h-2.5 bg-zinc-100 rounded-md" />
    </div>
  );
}

export function BuyAgainSkeleton() {
  return (
    <div className="shrink-0 w-[130px] bg-white rounded-2xl p-3 border border-zinc-100 animate-pulse">
      <div className="w-full aspect-square bg-zinc-100 rounded-xl mb-2" />
      <div className="w-3/4 h-3 bg-zinc-100 rounded-md mb-1.5" />
      <div className="flex justify-between items-center">
        <div className="w-10 h-3.5 bg-zinc-100 rounded-md" />
        <div className="w-8 h-7 bg-zinc-100 rounded-lg" />
      </div>
    </div>
  );
}

export function FlashDealSkeleton() {
  return (
    <div className="shrink-0 w-[200px] bg-white rounded-2xl p-3 border border-zinc-100 animate-pulse">
      <div className="w-full h-24 bg-zinc-100 rounded-xl mb-2.5" />
      <div className="w-3/4 h-3.5 bg-zinc-100 rounded-md mb-1.5" />
      <div className="w-1/2 h-3 bg-zinc-100 rounded-md mb-2" />
      <div className="flex justify-between">
        <div className="w-14 h-4 bg-zinc-100 rounded-md" />
        <div className="w-16 h-3 bg-zinc-100 rounded-md" />
      </div>
    </div>
  );
}
