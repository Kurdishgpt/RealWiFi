import { useState, useCallback, useEffect } from "react";
import { NetworkVisualization } from "@/components/NetworkVisualization";
import { ControlPanel } from "@/components/ControlPanel";
import { type NetworkSettings, type Device, type SimulationState } from "@shared/schema";
import { Wifi } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Home() {
  const [localState, setLocalState] = useState<{
    settings: NetworkSettings;
    devices: Device[];
    simulation: SimulationState;
  }>({
    settings: {
      ssid: "MyWiFiNetwork",
      frequency: "5GHz",
      channel: 6,
      securityType: "WPA3",
      broadcastEnabled: true,
    },
    devices: [],
    simulation: {
      playing: true,
      speed: 1,
      showSignalStrength: true,
      showChannels: false,
    },
  });

  const { data: networkState } = useQuery({
    queryKey: ["/api/network"],
  });

  useEffect(() => {
    if (networkState) {
      setLocalState(networkState);
    }
  }, [networkState]);

  const updateStateMutation = useMutation({
    mutationFn: async (state: typeof localState) => {
      return apiRequest("PUT", "/api/network", state);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/network"] });
    },
  });

  const handleSettingsUpdate = useCallback((settings: NetworkSettings) => {
    const newState = { ...localState, settings };
    setLocalState(newState);
    updateStateMutation.mutate(newState);
  }, [localState]);

  const handleAddDevice = useCallback((type: "laptop" | "phone" | "tablet" | "iot") => {
    const deviceNames: Record<string, string[]> = {
      laptop: ["MacBook Pro", "Dell XPS", "ThinkPad", "Surface Laptop"],
      phone: ["iPhone", "Galaxy S24", "Pixel 9", "OnePlus"],
      tablet: ["iPad Air", "Galaxy Tab", "Surface Pro"],
      iot: ["Smart TV", "Ring Camera", "Nest Thermostat", "Smart Speaker"],
    };

    const names = deviceNames[type];
    const name = names[Math.floor(Math.random() * names.length)];
    
    const newDevice: Device = {
      id: `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${name} ${localState.devices.filter(d => d.type === type).length + 1}`,
      type,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      signalStrength: 60 + Math.floor(Math.random() * 40),
      connected: true,
    };

    const newState = {
      ...localState,
      devices: [...localState.devices, newDevice],
    };
    setLocalState(newState);
    updateStateMutation.mutate(newState);
  }, [localState]);

  const handleRemoveDevice = useCallback((id: string) => {
    const newState = {
      ...localState,
      devices: localState.devices.filter((d) => d.id !== id),
    };
    setLocalState(newState);
    updateStateMutation.mutate(newState);
  }, [localState]);

  const handleToggleConnection = useCallback((id: string) => {
    const newState = {
      ...localState,
      devices: localState.devices.map((d) =>
        d.id === id ? { ...d, connected: !d.connected } : d
      ),
    };
    setLocalState(newState);
    updateStateMutation.mutate(newState);
  }, [localState]);

  const handleDeviceMove = useCallback((id: string, x: number, y: number) => {
    const centerX = 50;
    const centerY = 50;
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const maxDistance = 50;
    const signalStrength = Math.max(0, Math.min(100, 100 - (distance / maxDistance) * 80));

    const newState = {
      ...localState,
      devices: localState.devices.map((d) =>
        d.id === id ? { ...d, x, y, signalStrength: Math.round(signalStrength) } : d
      ),
    };
    setLocalState(newState);
  }, [localState]);

  const handleSimulationUpdate = useCallback((simulation: SimulationState) => {
    const newState = { ...localState, simulation };
    setLocalState(newState);
    updateStateMutation.mutate(newState);
  }, [localState]);

  const handleReset = useCallback(() => {
    const resetState = {
      settings: {
        ssid: "MyWiFiNetwork",
        frequency: "5GHz" as const,
        channel: 6,
        securityType: "WPA3" as const,
        broadcastEnabled: true,
      },
      devices: [],
      simulation: {
        playing: true,
        speed: 1,
        showSignalStrength: true,
        showChannels: false,
      },
    };
    setLocalState(resetState);
    updateStateMutation.mutate(resetState);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-app-title">
                Wi-Fi Network Simulator
              </h1>
              <p className="text-sm text-muted-foreground">
                Interactive educational tool for learning wireless networking
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          <div>
            <NetworkVisualization
              devices={localState.devices}
              onDeviceMove={handleDeviceMove}
              playing={localState.simulation.playing}
              speed={localState.simulation.speed}
              showSignalStrength={localState.simulation.showSignalStrength}
            />
          </div>

          <div className="lg:h-[600px]">
            <ControlPanel
              settings={localState.settings}
              devices={localState.devices}
              simulation={localState.simulation}
              onSettingsUpdate={handleSettingsUpdate}
              onAddDevice={handleAddDevice}
              onRemoveDevice={handleRemoveDevice}
              onToggleConnection={handleToggleConnection}
              onSimulationUpdate={handleSimulationUpdate}
              onReset={handleReset}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
