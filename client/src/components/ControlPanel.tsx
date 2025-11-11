import { NetworkSettingsComponent } from "./NetworkSettings";
import { DeviceList } from "./DeviceList";
import { EducationalInfo } from "./EducationalInfo";
import { SimulationControls } from "./SimulationControls";
import { type NetworkSettings, type Device, type SimulationState } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ControlPanelProps {
  settings: NetworkSettings;
  devices: Device[];
  simulation: SimulationState;
  onSettingsUpdate: (settings: NetworkSettings) => void;
  onAddDevice: (type: "laptop" | "phone" | "tablet" | "iot") => void;
  onRemoveDevice: (id: string) => void;
  onToggleConnection: (id: string) => void;
  onSimulationUpdate: (state: SimulationState) => void;
  onReset: () => void;
}

export function ControlPanel({
  settings,
  devices,
  simulation,
  onSettingsUpdate,
  onAddDevice,
  onRemoveDevice,
  onToggleConnection,
  onSimulationUpdate,
  onReset,
}: ControlPanelProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-6" data-testid="control-panel">
        <NetworkSettingsComponent settings={settings} onUpdate={onSettingsUpdate} />
        <DeviceList
          devices={devices}
          onAddDevice={onAddDevice}
          onRemoveDevice={onRemoveDevice}
          onToggleConnection={onToggleConnection}
        />
        <SimulationControls
          state={simulation}
          onUpdate={onSimulationUpdate}
          onReset={onReset}
        />
        <EducationalInfo />
      </div>
    </ScrollArea>
  );
}
