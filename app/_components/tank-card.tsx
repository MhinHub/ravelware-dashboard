import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { Fuel } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TankCardProps {
  name: string;
  current: number;
  max: number;
  status: string;
  updated: Date;
}

const TankCard = ({ name, current, max, status, updated }: TankCardProps) => {
  const percent = (current / max) * 100;
  if (!current) {
    return <Skeleton className="min-w-[500px] min-h-[180px] border p-5" />;
  }
  return (
    <div
      className={cn(
        "min-w-[500px] min-h-[180px] rounded-lg border p-5",
        percent >= 60 && "bg-green-600",
        20 <= percent && percent < 60 && "bg-yellow-600",
        percent < 20 && "bg-red-900"
      )}
    >
      <div className="flex gap-4 items-center h-full w-full">
        <div className="bg-background p-3 h-full w-[35%] rounded-lg flex items-center justify-between">
          <div className="relative overflow-hidden flex items-end w-6 h-20 bg-muted-foreground rounded-lg">
            <div className="absolute w-full top-1 flex flex-col items-center text-xs text-background font-semibold text-center">
              <p>{percent}</p>
              <p>%</p>
            </div>
            <div
              style={{
                height: `${percent}%`,
                width: "100%",
              }}
              className={cn(
                percent >= 60 && "bg-green-600",
                20 <= percent && percent < 60 && "bg-yellow-600",
                percent < 20 && "bg-red-900"
              )}
            ></div>
          </div>
          <Fuel className="h-full w-[75%]" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col justify-between h-full grow">
          <div>
            <h1 className="font-bold text-2xl">{name}</h1>
            <p className="font-semibold text-base">
              {current} / {max} L
            </p>
          </div>
          <p className="font-semibold text-xl">Status: {status}</p>
        </div>
        <div className="flex items-start text-xs max-w-[15%] h-full">
          <p className="flex text-end align-top items-start self-start">
            Last transaction{" "}
            {formatDistance(new Date(updated), new Date(), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TankCard;
