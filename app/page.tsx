"use client";

import { useState, useRef, memo, useMemo } from "react";
import type { MqttClient } from "mqtt";
import useMqtt from "../lib/useMqtt";
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

function Home() {
  const [realtimeMessages, setRealtimeMessages] = useState<any[]>([]);
  const [carUsageMessages, setCarUsageMessages] = useState<any[]>([]);
  const [fuelUsageMessages, setFuelUsageMessages] = useState<any[]>([]);

  const [fuelUsageTotal, setFuelUsageTotal] = useState(0);

  const addMessage = useMemo(
    () => (message: any) => {
      if (message.topic === "test/realtime") {
        setRealtimeMessages([message]);
      }
      if (message.topic === "test/top-5-car-usage") {
        setCarUsageMessages([message]);
      }
      if (message.topic === "test/fuel-usage") {
        setFuelUsageMessages([message]);
      }
    },
    []
  );

  const incommingMessageHandlers = useRef([
    {
      topic: "test/realtime",
      handler: (msg: string) => {
        addMessage(msg);
      },
    },
    {
      topic: "test/top-5-car-usage",
      handler: (msg: string) => {
        addMessage(msg);
      },
    },
    {
      topic: "test/fuel-usage",
      handler: (msg: string) => {
        addMessage(msg);
      },
    },
  ]);

  const mqttClientRef = useRef<MqttClient | null>(null);
  const setMqttClient = (client: MqttClient) => {
    mqttClientRef.current = client;
  };

  useMqtt({
    uri:
      (process.env.NEXT_PUBLIC_MQTT_WEBSOCKET_URI as string) ||
      (process.env.NEXT_PUBLIC_MQTT_URI as string),
    options: {
      username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
      password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
      clientId: `mqtt_${Math.random().toString(16).substring(2, 8)}`,
    },
    topicHandlers: incommingMessageHandlers.current,
    onConnectedHandler: (client) => setMqttClient(client),
  });

  const carUsageData = useMemo(() => {
    let data = [["Element", "Volume (Liter)"]];
    carUsageMessages.forEach((message) =>
      message.payload.forEach((payload: any) =>
        data.push([payload.name, payload.usage])
      )
    );
    return data;
  }, [carUsageMessages]);

  const fuelUsageData = useMemo(() => {
    let data = [["Element", "Ratio"]];
    let total = 0;
    fuelUsageMessages.forEach((message) =>
      message.payload.forEach((payload: any) => {
        data.push([payload.name, payload.usage]);
        total += payload.usage;
      })
    );
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
          {realtimeMessages.map((m, i) => {
            return (
              <Suspense
                key={i}
                fallback={<Skeleton className="w-96 h-48 bg-slate-700" />}
              >
                <div className="flex gap-4 overflow-auto">
                  {m.payload.map((msg: any, i: number) => (
                    <TankCard
                      key={i}
                      name={msg.name}
                      current={msg.current_stock}
                      max={msg.maximum_stock}
                      status={msg.status}
                      updated={msg.updated_at}
                    />
                  ))}
                </div>
              </Suspense>
            );
          })}
        </div>
        <div className="grow w-full flex gap-5">
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
                  width="90%"
                  height="300px"
                  data={carUsageData}
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
                    options={fulUsageOptions}
                    width={"100%"}
                    height={"250px"}
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
                    {fuelUsageMessages.map((m) =>
                      m.payload.map((msg: any, index: number) => (
                        <TableRow
                          key={Math.random()}
                          className="text-background"
                        >
                          <TableCell className="p-1 flex gap-2 items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${fulUsageColor[index]}`}
                            ></div>
                            {msg.name}
                          </TableCell>
                          <TableCell className="text-right p-1">
                            {(msg.usage / fuelUsageTotal) * 100}
                          </TableCell>
                          <TableCell className="text-right p-1">
                            {msg.usage}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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
