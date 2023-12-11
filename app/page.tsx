"use client";

import { useState, useEffect, memo, useMemo } from "react";
import useMqtt from "@/lib/useMqtt";
import TankCard from "./_components/tank-card";
import { Chart } from "react-google-charts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { useStore } from "@/store/useStore";

import Carousel from "nuka-carousel";
import { ChevronRight, ChevronLeft } from "lucide-react";

function Home() {
  const {
    realtimeMessages,
    setRealtimeMessages,
    carUsageMessages,
    setCarUsageMessages,
    fuelUsageMessages,
    setFuelUsageMessages,
  } = useStore();

  const [fuelUsageTotal, setFuelUsageTotal] = useState(0);

  const { isConnected, mqttSubscribe, payload } = useMqtt();

  const addMessage = useMemo(
    () => (message: any) => {
      if (message.topic === "test/realtime") {
        setRealtimeMessages(JSON.parse(message.message));
      }
      if (message.topic === "test/top-5-car-usage") {
        setCarUsageMessages(JSON.parse(message.message));
      }
      if (message.topic === "test/fuel-usage") {
        setFuelUsageMessages(JSON.parse(message.message));
      }
    },
    []
  );

  useEffect(() => {
    if (isConnected) {
      mqttSubscribe([
        "test/realtime",
        "test/top-5-car-usage",
        "test/fuel-usage",
      ]);
    }
  }, [isConnected]);

  useEffect(() => {
    if (payload?.message) {
      addMessage(payload);
    }
  }, [payload]);

  const carUsageData = useMemo(() => {
    let data = [["Element", "Volume (Liter)"]];
    carUsageMessages.map((message) => {
      data.push([message.name, message.usage]);
    });
    return data;
  }, [carUsageMessages]);

  const fuelUsageData = useMemo(() => {
    let data = [["Element", "Ratio"]];
    let total = 0;
    fuelUsageMessages.forEach((message) => {
      data.push([message.name, message.usage]);
      total += message.usage;
    });
    setFuelUsageTotal(total);
    return data;
  }, [fuelUsageMessages]);

  const fulUsageOptions = {
    legend: "none",
    slices: {
      0: { color: "yellow" },
      1: { color: "red" },
      2: { color: "green" },
      3: { color: "grey" },
      4: { color: "blue" },
      5: { color: "purple" },
    },
  };

  const fulUsageColor = [
    "bg-yellow-300",
    "bg-red-600",
    "bg-green-700",
    "bg-gray-500",
    "bg-blue-700",
    "bg-purple-950",
  ];

  return (
    <div className="flex flex-col h-screen">
      <h1 className="font-semibold text-xl p-5">Dashboard</h1>
      <div className="bg-primary/10 p-5 flex flex-col gap-5 overflow-scroll">
        <h1 className="font-semibold text-2xl text-center">
          REALTIME FUEL TANK STATUS
        </h1>
        <div className="p-3 bg-background min-h-[200px] rounded-xl">
          <Suspense fallback={<Skeleton className="w-96 h-48 bg-slate-700" />}>
            <Carousel
              autoplay
              cellSpacing={20}
              dragging
              className="flex gap-4"
              slidesToShow={2}
              wrapAround
              renderCenterRightControls={({ nextSlide }) => (
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-black/20 text-white font-bold flex items-center justify-center"
                >
                  <ChevronRight />
                </button>
              )}
              renderCenterLeftControls={({ previousSlide }) => (
                <button
                  onClick={previousSlide}
                  className="w-10 h-10 rounded-full bg-black/10 text-white font-bold flex items-center justify-center"
                >
                  <ChevronLeft />
                </button>
              )}
            >
              {realtimeMessages.map((msg, i) => (
                <TankCard
                  key={i}
                  name={msg.name}
                  current={msg.current_stock}
                  max={msg.maximum_stock}
                  status={msg.status}
                  updated={msg.updated_at}
                />
              ))}
            </Carousel>
          </Suspense>
        </div>
        <div className="pb-20 w-full flex gap-5">
          <div className="w-full h-full border rounded-xl flex flex-col items-center justify-between bg-white p-3">
            <p className="font-semibold text-2xl p-5 text-center text-background">
              Top 5 Car Usage This Month
            </p>
            <Suspense
              fallback={<Skeleton className="w-96 h-48 bg-slate-700" />}
            >
              {carUsageMessages[0] && (
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="300px"
                  data={carUsageData}
                  loader={
                    <div className="text-black/70 animate-pulse">
                      Loading Chart..
                    </div>
                  }
                  options={{
                    colors: ["#66C2A5"],
                  }}
                />
              )}
            </Suspense>
          </div>
          <div className="relative w-full h-full border rounded-xl flex flex-col items-center bg-white p-3">
            <p className="font-semibold text-2xl p-5 text-center text-background z-10">
              Fuel Usage This Month
            </p>
            <div className="-mt-12 -z-0">
              <Suspense
                fallback={<Skeleton className="w-96 h-48 bg-slate-700" />}
              >
                {fuelUsageMessages[0] && (
                  <Chart
                    chartType="PieChart"
                    data={fuelUsageData}
                    loader={
                      <div className="text-black/70 animate-pulse">
                        Loading Chart..
                      </div>
                    }
                    options={fulUsageOptions}
                    width={"100%"}
                    height={"250px"}
                    className="text-black"
                  />
                )}
              </Suspense>
            </div>
            <Suspense
              fallback={<Skeleton className="w-96 h-48 bg-slate-700" />}
            >
              {fuelUsageMessages[0] && (
                <Table className="text-xs">
                  <TableHeader className="p-1">
                    <TableRow className="p-1">
                      <TableHead className="p-1 h-7">Fuel Name</TableHead>
                      <TableHead className="text-right p-1 h-7">
                        Ratio %
                      </TableHead>
                      <TableHead className="text-right p-1 h-7">
                        Jumlah (L)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelUsageMessages.map((msg: any, index: number) => (
                      <TableRow
                        key={Math.random()}
                        className="text-background font-semibold"
                      >
                        <TableCell className="p-1 flex gap-2 items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${fulUsageColor[index]}`}
                          ></div>
                          {msg.name}
                        </TableCell>
                        <TableCell className="text-right p-1">
                          {Math.ceil((msg.usage / fuelUsageTotal) * 100)}
                        </TableCell>
                        <TableCell className="text-right p-1">
                          {msg.usage}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
