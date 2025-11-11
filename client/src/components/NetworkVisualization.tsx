import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { SignalWaves } from "./SignalWaves";
import { type Device } from "@shared/schema";
import { Wifi, Laptop, Smartphone, Tablet, Radio } from "lucide-react";

interface NetworkVisualizationProps {
  devices: Device[];
  onDeviceMove?: (id: string, x: number, y: number) => void;
  playing: boolean;
  speed: number;
  showSignalStrength: boolean;
}

export function NetworkVisualization({
  devices,
  onDeviceMove,
  playing,
  speed,
  showSignalStrength,
}: NetworkVisualizationProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingDevice, setDraggingDevice] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, []);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "laptop":
        return Laptop;
      case "phone":
        return Smartphone;
      case "tablet":
        return Tablet;
      case "iot":
        return Radio;
      default:
        return Smartphone;
    }
  };

  const handleDeviceDragStart = (id: string) => {
    setDraggingDevice(id);
  };

  const handleDeviceDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingDevice || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (onDeviceMove) {
      onDeviceMove(draggingDevice, Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y)));
    }
  };

  const handleDeviceDragEnd = () => {
    setDraggingDevice(null);
  };

  const getSignalBars = (strength: number) => {
    const bars = Math.ceil((strength / 100) * 4);
    return bars;
  };

  return (
    <Card
      ref={canvasRef}
      className="relative w-full h-[600px] bg-card overflow-hidden"
      onMouseMove={handleDeviceDrag}
      onMouseUp={handleDeviceDragEnd}
      onMouseLeave={handleDeviceDragEnd}
      data-testid="network-visualization-canvas"
    >
      <div className="absolute inset-0">
        <svg className="w-full h-full" style={{ background: "repeating-linear-gradient(0deg, hsl(var(--border)) 0px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, hsl(var(--border)) 0px, transparent 1px, transparent 20px)" }}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="hsl(var(--border))" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.1" />

          {devices.map((device) => (
            <line
              key={device.id}
              x1="50%"
              y1="50%"
              x2={`${device.x}%`}
              y2={`${device.y}%`}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity={device.connected ? "0.3" : "0.1"}
              className={device.connected && playing ? "animate-pulse" : ""}
            />
          ))}
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SignalWaves playing={playing} speed={speed} />
        <div className="relative z-10 bg-primary text-primary-foreground rounded-full p-6 shadow-lg" data-testid="router-icon">
          <Wifi className="w-12 h-12" />
        </div>
      </div>

      {devices.map((device) => {
        const Icon = getDeviceIcon(device.type);
        return (
          <div
            key={device.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-move group"
            style={{ left: `${device.x}%`, top: `${device.y}%` }}
            onMouseDown={() => handleDeviceDragStart(device.id)}
            data-testid={`device-${device.id}`}
          >
            <div className="relative">
              <div className={`bg-card border-2 ${device.connected ? "border-primary" : "border-border"} rounded-lg p-3 shadow-md hover-elevate transition-all`}>
                <Icon className={`w-8 h-8 ${device.connected ? "text-primary" : "text-muted-foreground"}`} />
                {device.connected && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse-dot" />
                )}
              </div>
              {showSignalStrength && device.connected && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-card/90 backdrop-blur-sm px-2 py-1 rounded-md border text-xs font-mono">
                    {device.signalStrength}%
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </Card>
  );
}
