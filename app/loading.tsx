import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="flex flex-col space-y-4 gap-4 w-full h-screen p-10">
      <Skeleton className="w-full h-4/5" />
      <div className="flex space-x-4 gap-3 h-1/5">
        <Skeleton className="w-1/2 h-full" />
        <Skeleton className="w-1/2 h-full" />
      </div>
    </div>
  );
}
