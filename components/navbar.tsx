"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import {
  ChevronDown,
  LogOut,
  PencilLine,
  Search,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const rawDate = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [time, setTime] = useState("");
  const date =
    rawDate.getDate() +
    " " +
    month[rawDate.getMonth()] +
    " " +
    rawDate.getFullYear();

  const updateTime = () => {
    const currentdate = new Date();

    setTime(
      currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds()
    );
  };

  useEffect(() => {
    updateTime;
  }, []);

  setInterval(updateTime, 1000);

  return (
    <div className="bg-background w-[100%] h-24 flex items-center justify-between px-5 border-b">
      <div className="flex items-center">
        <Input
          placeholder="Search"
          className="w-64 rounded-l-xl border-r-none bg-primary/5 "
        />
        <div className="bg-primary/5 px-3 py-3 rounded-r-xl cursor-pointer">
          <Search className="w-4 h-4 opacity-50" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <p className="font-semibold">{time + ", " + date}</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2 font-semibold p-2">
              <div className="rounded-full bg-white p-2">
                <User className="w-4 h-4" color="hsl(222.2 84% 4.9%)" />
              </div>
              <p>Muhaemin Iskandar</p>
              <ChevronDown className="w-4 h-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                My Profile
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <PencilLine className="w-5 h-5" />
                Edit Profile
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <LogOut className="w-5 h-5 rotate-180" />
                Log out
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
