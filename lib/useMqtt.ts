import type { MqttClient, IClientOptions } from "mqtt";
import MQTT from "mqtt";
import { useEffect, useRef, useMemo } from "react";

interface TopicHandler {
  topic: string;
  handler: (payload: any) => void;
}

interface useMqttProps {
  uri: string;
  options?: IClientOptions;
  topicHandlers?: TopicHandler[];
  onConnectedHandler?: (client: MqttClient) => void;
}

function useMqtt({
  uri,
  options = {},
  topicHandlers = [],
  onConnectedHandler = () => {},
}: useMqttProps) {
  const clientRef = useRef<MqttClient | null>(null);

  const memoizedHandlers = useMemo(() => topicHandlers, [topicHandlers]);

  useEffect(() => {
    const client = MQTT.connect(uri, options);
    clientRef.current = client;

    memoizedHandlers.forEach(({ topic }) => client.subscribe(topic));

    client.on("message", (topic: string, rawPayload: any, packet: any) => {
      console.log("message received", topic, rawPayload.toString());
      const handler = memoizedHandlers.find((t) => t.topic === topic)?.handler;
      if (!handler) return;

      let payload;
      try {
        payload = JSON.parse(rawPayload);
      } catch {
        payload = rawPayload;
      }

      handler({ topic, payload, packet });
    });

    client.on("connect", () => onConnectedHandler(client));

    client.on("error", (err) => {
      alert(err);
      client.end();
    });

    return () => {
      memoizedHandlers.forEach(({ topic }) => client.unsubscribe(topic));
      client.end();
    };
  }, [uri, options, memoizedHandlers, onConnectedHandler]);

  return null;
}

export default useMqtt;
