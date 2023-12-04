"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const [reportExpand, setReportExpand] = useState(false);
  const pathname = usePathname();

  const handleReportExpand = () => {
    setReportExpand((prev) => !prev);
  };

  return (
    <div className="inset-y-0 overflow-hidden">
      <div className="bg-primary/10 w-full">
        <div className="p-5 h-24 w-full flex items-center gap-1.5">
          <Image src="/ravel.png" width={40} height={40} alt="logo" />
          <p className="text-3xl font-bold">AVELWARE</p>
        </div>
      </div>
      <div className="flex flex-col text-xl font-semibold">
        <Link
          href="/"
          className={cn(
            "relative w-full hover:bg-primary/5 py-3 flex items-center",
            pathname === "/" ? "opacity-100" : "opacity-50"
          )}
        >
          <div
            className={cn(
              "w-2 h-10 rounded-r-xl mr-7",
              pathname === "/" ? "bg-primary" : "bg-none"
            )}
          />
          <p>Dashboard</p>
        </Link>
        <div
          className={cn(
            "relative w-full hover:bg-primary/5 py-3 flex items-center justify-between cursor-pointer",
            pathname.match("/report") ? "opacity-100" : "opacity-50"
          )}
          onClick={handleReportExpand}
        >
          <div className="flex items-center">
            <div
              className={cn(
                "w-2 h-10 rounded-r-xl mr-7",
                pathname.match("/report") ? "bg-primary" : "bg-none"
              )}
            />
            <p>Report</p>
          </div>
          {reportExpand ? (
            <ChevronDown className="w-6 h-6 mr-3" />
          ) : (
            <ChevronRight className="w-6 h-6 mr-3" />
          )}
        </div>
        {reportExpand && (
          <div className="relative font-normal text-base animate-in fade-in-50 slide-in-from-top-5 transition-all duration-200 ease-in-out">
            <Link
              href="/report/fuel-transaction-history"
              className={cn(
                "relative w-full hover:bg-primary/5 py-3 flex items-center",
                pathname === "/report/fuel-transaction-history"
                  ? "opacity-100"
                  : "opacity-50"
              )}
            >
              <p className="ml-12">Fuel Transaction History</p>
            </Link>
            <Link
              href="/report/machine-usage"
              className={cn(
                "relative w-full hover:bg-primary/5 py-3 flex items-center",
                pathname === "/report/machine-usage"
                  ? "opacity-100"
                  : "opacity-50"
              )}
            >
              <p className="ml-12">Machine Usage</p>
            </Link>
            <Link
              href="/report/manpower-usage"
              className={cn(
                "relative w-full hover:bg-primary/5 py-3 flex items-center",
                pathname === "/report/manpower-usage"
                  ? "opacity-100"
                  : "opacity-50"
              )}
            >
              <p className="ml-12">Manpower Usage</p>
            </Link>
          </div>
        )}
        <Link
          href="/history"
          className={cn(
            "relative w-full hover:bg-primary/5 py-3 flex items-center",
            pathname === "/history" ? "opacity-100" : "opacity-50"
          )}
        >
          <div
            className={cn(
              "w-2 h-10 rounded-r-xl mr-7",
              pathname === "/history" ? "bg-primary" : "bg-none"
            )}
          />
          <p>History</p>
        </Link>
        <Link
          href="/management"
          className={cn(
            "relative w-full hover:bg-primary/5 py-3 flex items-center",
            pathname === "/management" ? "opacity-100" : "opacity-50"
          )}
        >
          <div
            className={cn(
              "w-2 h-10 rounded-r-xl mr-7",
              pathname === "/management" ? "bg-primary" : "bg-none"
            )}
          />
          <p>Management</p>
        </Link>
        <Link
          href="/profile"
          className={cn(
            "relative w-full hover:bg-primary/5 py-3 flex items-center",
            pathname === "/profile" ? "opacity-100" : "opacity-50"
          )}
        >
          <div
            className={cn(
              "w-2 h-10 rounded-r-xl mr-7",
              pathname === "/profile" ? "bg-primary" : "bg-none"
            )}
          />
          <p>Profile</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
