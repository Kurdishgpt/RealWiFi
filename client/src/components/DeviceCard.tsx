import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Device } from "@shared/schema";
import { Laptop, Smartphone, Tablet, Radio, Trash2, Signal } from "lucide-react";

interface DeviceCardProps {
  device: Device;
  onRemove: (id: string) => void;
  onToggleConnection: (id: string) => void;
}

export function DeviceCard({ device, onRemove, onToggleConnection }: DeviceCardProps) {
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

  const Icon = getDeviceIcon(device.type);

  const getSignalBars = (strength: number) => {
    return Math.ceil((strength / 100) * 4);
  };

  return (
    <Card className="hover-elevate" data-testid={`card-device-${device.id}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`p-2 rounded-lg ${device.connected ? "bg-primary/10" : "bg-muted"}`}>
              <Icon className={`w-5 h-5 ${device.connected ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate" data-testid={`text-device-name-${device.id}`}>
                {device.name}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {device.connected ? (
                  <>
                    <Badge variant="outline" className="text-xs bg-primary/10 border-primary/20">
                      <div className="w-2 h-2 rounded-full bg-primary mr-1 animate-pulse-dot" />
                      Connected
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Signal className="w-3 h-3" />
                      <span className="font-mono">{device.signalStrength}%</span>
                    </div>
                  </>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Disconnected
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onToggleConnection(device.id)}
              data-testid={`button-toggle-connection-${device.id}`}
            >
              <Signal className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onRemove(device.id)}
              data-testid={`button-remove-device-${device.id}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
