import { useState, useEffect } from "react";
import mqtt from "mqtt";

const setting = {
  url:
    (process.env.NEXT_PUBLIC_MQTT_WEBSOCKET_URI as string) ||
    (process.env.NEXT_PUBLIC_MQTT_URI as string),
  options: {
    username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
    password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
  },
};

export default function useMqtt() {
  const [client, setClient] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>({});

  const mqttConnect = async () => {
    const clientId = `mqttjs_ + ${Math.random().toString(16).substring(2, 8)}`;
    const url = setting.url;
    const options = {
      clientId,
      keepalive: 60,
      clean: true,
      reconnectPeriod: 300000,
      connectTimeout: 30000,
      rejectUnauthorized: false,
      ...setting.options,
    };
    const clientMqtt = await mqtt.connect(url, options);
    setClient(clientMqtt);
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        console.log("MQTT Disconnected");
        setIsConnected(false);
      });
    }
  };

  const mqttSubscribe = async (topic: string[]) => {
    if (client) {
      console.log("MQTT subscribe ", topic);
      const clientMqtt = await client.subscribe(
        [...topic],
        {
          qos: 0,
          rap: false,
          rh: 0,
        },
        (error: any) => {
          if (error) {
            console.log("MQTT Subscribe to topics error", error);
            return;
          }
        }
      );
      setClient(clientMqtt);
    }
  };

  const mqttUnSubscribe = async (topic: string) => {
    if (client) {
      const clientMqtt = await client.unsubscribe(topic, (error: any) => {
        if (error) {
          console.log("MQTT Unsubscribe error", error);
          return;
        }
      });
      setClient(clientMqtt);
    }
  };

  useEffect(() => {
    mqttConnect();
    return () => {
      mqttDisconnect();
    };
  }, []);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setIsConnected(true);
        console.log("MQTT Connected");
      });
      client.on("error", (err: any) => {
        console.error("MQTT Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setIsConnected(true);
      });
      client.on("message", (_topic: string, message: any) => {
        const payloadMessage = { topic: _topic, message: message.toString() };
        setPayload(payloadMessage);
      });
    }
  }, [client]);

  return {
    mqttConnect,
    mqttDisconnect,
    mqttSubscribe,
    mqttUnSubscribe,
    payload,
    isConnected,
  };
}
