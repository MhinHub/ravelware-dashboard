"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, FileDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { createFuelTransactions } from "@/db/faker";
import { DateRange } from "react-day-picker";
import { useStore } from "@/store/useStore";

const FuelTransactionPage = () => {
  // const { rangeDate, setRangeDate } = useStore();
  const [rangeDate, setRangeDate] = React.useState<DateRange | undefined>();

  console.log("rangeDate?.from?.getTime()", rangeDate?.from?.getTime());

  return (
    <div className="flex flex-col h-full">
      <h1 className="font-semibold text-xl p-5">
        Report / Fuel Transaction History
      </h1>
      <div className="bg-primary/10 grow p-5 flex flex-col gap-5 h-screen overflow-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl p-4">Fuel Transaction History</h1>
          <div className="flex items-center gap-5">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-fit justify-start text-left font-normal",
                    !rangeDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {rangeDate?.from ? (
                    rangeDate.to ? (
                      <p>
                        {format(rangeDate.from, "PPP")} -{" "}
                        {format(rangeDate.to, "PPP")}
                      </p>
                    ) : (
                      <p>{format(rangeDate.from, "PPP")}</p>
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3 bg-foreground text-background">
                <div className="flex">
                  <div className="flex flex-col">
                    <p className="p-3 hover:bg-background/5 cursor-pointer">
                      Today
                    </p>
                    <p className="p-3 hover:bg-background/5 cursor-pointer">
                      Yesterday
                    </p>
                    <p className="p-3 hover:bg-background/5 cursor-pointer">
                      This Week
                    </p>
                    <p className="p-3 hover:bg-background/5 cursor-pointer">
                      Last Week
                    </p>
                    <p className="p-3 hover:bg-background/5 cursor-pointer">
                      This Month
                    </p>
                    <p className="p-3 hover:bg-background/5 cursor-pointer">
                      Last Month
                    </p>
                    <p className="p-3 hover:bg-background/5 cursor-pointer">
                      This Year
                    </p>
                    <p className="p-3 hover:bg-background/5 cursor-pointer">
                      Last Year
                    </p>
                    <p className="p-3 hover:bg-background/5 cursor-pointer">
                      All Time
                    </p>
                  </div>
                  <Calendar
                    mode="range"
                    defaultMonth={new Date()}
                    numberOfMonths={2}
                    min={2}
                    selected={rangeDate}
                    onSelect={setRangeDate}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="outline" className="flex items-center gap-2">
              <FileDown className="w-5 h-5" />
              <p>Export</p>
            </Button>
          </div>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-7">ID</TableHead>
                <TableHead>Time/Date</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Fuel</TableHead>
                <TableHead>Fuel Usage (L)</TableHead>
                <TableHead>Left Over (L)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {createFuelTransactions({
                from: rangeDate?.from?.getTime() as number,
                to: rangeDate?.to
                  ? (rangeDate?.to?.getTime() as number)
                  : (rangeDate?.from?.getTime() as number),
              }).map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    {new Date(item.date).toLocaleString("id-ID", {
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell>{item.station}</TableCell>
                  <TableCell>{item.driver}</TableCell>
                  <TableCell>{item.license}</TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.fuel}</TableCell>
                  <TableCell>{item.usage}</TableCell>
                  <TableCell>{item.left}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default FuelTransactionPage;
