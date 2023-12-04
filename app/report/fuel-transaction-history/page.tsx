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

const FuelTransactionPage = () => {
  const [date1, setDate1] = React.useState<Date>();
  const [date2, setDate2] = React.useState<Date>();
  return (
    <div className="flex flex-col h-full">
      <h1 className="font-semibold text-xl p-5">
        Report / Fuel Transaction History
      </h1>
      <div className="bg-primary/10 grow p-5 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl p-4">Fuel Transaction History</h1>
          <div className="flex items-center gap-5">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-fit justify-start text-left font-normal",
                    !date1 && !date2 && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date1 && date2 ? (
                    format(date1, "PPP") + " - " + format(date2, "PPP")
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
                    mode="single"
                    selected={date1}
                    onSelect={setDate1}
                    initialFocus
                  />
                  <Calendar
                    mode="single"
                    selected={date2}
                    onSelect={setDate2}
                    initialFocus
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
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Time/Date</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Fuel</TableHead>
                <TableHead>Fuel Usage (L)</TableHead>
                <TableHead>Left Over (L)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <React.Suspense fallback={<Skeleton className="w-full h-14" />}>
                  <TableRow key={index}>
                    <TableCell>1</TableCell>
                    <TableCell>2023-10-18 15:13:17</TableCell>
                    <TableCell>Station 2</TableCell>
                    <TableCell>andrew</TableCell>
                    <TableCell>B 1234 K</TableCell>
                    <TableCell>12345</TableCell>
                    <TableCell>pertalite</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                </React.Suspense>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default FuelTransactionPage;
