import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeviceCard } from "./DeviceCard";
import { type Device } from "@shared/schema";
import { Plus, Smartphone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface DeviceListProps {
  devices: Device[];
  onAddDevice: (type: "laptop" | "phone" | "tablet" | "iot") => void;
  onRemoveDevice: (id: string) => void;
  onToggleConnection: (id: string) => void;
}

export function DeviceList({
  devices,
  onAddDevice,
  onRemoveDevice,
  onToggleConnection,
}: DeviceListProps) {
  const [selectedType, setSelectedType] = useState<"laptop" | "phone" | "tablet" | "iot">("phone");

  return (
    <Card data-testid="device-list-card">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
        <Smartphone className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg font-semibold">Connected Devices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={selectedType} onValueChange={(v: any) => setSelectedType(v)}>
            <SelectTrigger className="flex-1" data-testid="select-device-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="laptop">Laptop</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
              <SelectItem value="iot">IoT Device</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => onAddDevice(selectedType)} data-testid="button-add-device">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {devices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No devices connected. Add a device to get started.
            </div>
          ) : (
            devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onRemove={onRemoveDevice}
                onToggleConnection={onToggleConnection}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
