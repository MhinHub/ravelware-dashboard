import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <Skeleton className="flex flex-col space-y-4 gap-4 w-full h-screen p-10">
      <Skeleton className="w-full h-14 bg-slate-700" />
      <Skeleton className="w-full h-14 bg-slate-700" />
      <Skeleton className="w-full h-14 bg-slate-700" />
      <Skeleton className="w-full h-14 bg-slate-700" />
      <Skeleton className="w-full h-14 bg-slate-700" />
      <Skeleton className="w-full h-14 bg-slate-700" />
      <Skeleton className="w-full h-14 bg-slate-700" />
    </Skeleton>
  );
}
