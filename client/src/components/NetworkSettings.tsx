import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { type NetworkSettings } from "@shared/schema";
import { Wifi } from "lucide-react";

interface NetworkSettingsProps {
  settings: NetworkSettings;
  onUpdate: (settings: NetworkSettings) => void;
}

export function NetworkSettingsComponent({ settings, onUpdate }: NetworkSettingsProps) {
  return (
    <Card data-testid="network-settings-card">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
        <Wifi className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg font-semibold">Network Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ssid" className="text-sm font-medium">
            SSID (Network Name)
          </Label>
          <Input
            id="ssid"
            value={settings.ssid}
            onChange={(e) => onUpdate({ ...settings, ssid: e.target.value })}
            placeholder="MyWiFiNetwork"
            maxLength={32}
            data-testid="input-ssid"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency" className="text-sm font-medium">
            Frequency Band
          </Label>
          <Select
            value={settings.frequency}
            onValueChange={(value: "2.4GHz" | "5GHz") =>
              onUpdate({ ...settings, frequency: value })
            }
          >
            <SelectTrigger id="frequency" data-testid="select-frequency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2.4GHz">2.4 GHz</SelectItem>
              <SelectItem value="5GHz">5 GHz</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="channel" className="text-sm font-medium">
            Channel
          </Label>
          <Select
            value={settings.channel.toString()}
            onValueChange={(value) => onUpdate({ ...settings, channel: parseInt(value) })}
          >
            <SelectTrigger id="channel" data-testid="select-channel">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 13 }, (_, i) => i + 1).map((ch) => (
                <SelectItem key={ch} value={ch.toString()}>
                  Channel {ch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="security" className="text-sm font-medium">
            Security Type
          </Label>
          <Select
            value={settings.securityType}
            onValueChange={(value: any) => onUpdate({ ...settings, securityType: value })}
          >
            <SelectTrigger id="security" data-testid="select-security">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open (No Security)</SelectItem>
              <SelectItem value="WEP">WEP (Outdated)</SelectItem>
              <SelectItem value="WPA">WPA</SelectItem>
              <SelectItem value="WPA2">WPA2</SelectItem>
              <SelectItem value="WPA3">WPA3 (Recommended)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Label htmlFor="broadcast" className="text-sm font-medium cursor-pointer">
            Broadcast SSID
          </Label>
          <Switch
            id="broadcast"
            checked={settings.broadcastEnabled}
            onCheckedChange={(checked) =>
              onUpdate({ ...settings, broadcastEnabled: checked })
            }
            data-testid="switch-broadcast"
          />
        </div>
      </CardContent>
    </Card>
  );
}
