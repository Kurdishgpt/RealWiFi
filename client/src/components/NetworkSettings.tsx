import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { type NetworkSettings, networkSettingsSchema } from "@shared/schema";
import { Wifi } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface NetworkSettingsProps {
  settings: NetworkSettings;
  onUpdate: (settings: NetworkSettings) => void;
}

export function NetworkSettingsComponent({ settings, onUpdate }: NetworkSettingsProps) {
  const form = useForm<NetworkSettings>({
    resolver: zodResolver(networkSettingsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: settings,
  });

  useEffect(() => {
    form.reset(settings);
  }, [settings, form]);

  useEffect(() => {
    const subscription = form.watch(async (value) => {
      const isValid = await form.trigger();
      if (isValid) {
        onUpdate(value as NetworkSettings);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  return (
    <Card data-testid="network-settings-card">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
        <Wifi className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg font-semibold">Network Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="ssid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">SSID (Network Name)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="MyWiFiNetwork"
                      maxLength={32}
                      data-testid="input-ssid"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Frequency Band</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger data-testid="select-frequency">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2.4GHz">2.4 GHz</SelectItem>
                      <SelectItem value="5GHz">5 GHz</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="channel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Channel</FormLabel>
                  <Select value={field.value.toString()} onValueChange={(v) => field.onChange(parseInt(v))}>
                    <FormControl>
                      <SelectTrigger data-testid="select-channel">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 13 }, (_, i) => i + 1).map((ch) => (
                        <SelectItem key={ch} value={ch.toString()}>
                          Channel {ch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="securityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Security Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger data-testid="select-security">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Open">Open (No Security)</SelectItem>
                      <SelectItem value="WEP">WEP (Outdated)</SelectItem>
                      <SelectItem value="WPA">WPA</SelectItem>
                      <SelectItem value="WPA2">WPA2</SelectItem>
                      <SelectItem value="WPA3">WPA3 (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="broadcastEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between pt-2">
                  <FormLabel className="text-sm font-medium cursor-pointer">
                    Broadcast SSID
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="switch-broadcast"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
