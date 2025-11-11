import { z } from "zod";

// Network Settings Schema
export const networkSettingsSchema = z.object({
  ssid: z.string().min(1).max(32),
  frequency: z.enum(["2.4GHz", "5GHz"]),
  channel: z.number().min(1).max(13),
  securityType: z.enum(["Open", "WEP", "WPA", "WPA2", "WPA3"]),
  broadcastEnabled: z.boolean(),
});

export type NetworkSettings = z.infer<typeof networkSettingsSchema>;

// Device Schema
export const deviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["laptop", "phone", "tablet", "iot"]),
  x: z.number(),
  y: z.number(),
  signalStrength: z.number().min(0).max(100),
  connected: z.boolean(),
});

export type Device = z.infer<typeof deviceSchema>;

export const insertDeviceSchema = deviceSchema.omit({ id: true });
export type InsertDevice = z.infer<typeof insertDeviceSchema>;

// Simulation State Schema
export const simulationStateSchema = z.object({
  playing: z.boolean(),
  speed: z.number().min(1).max(4),
  showSignalStrength: z.boolean(),
  showChannels: z.boolean(),
});

export type SimulationState = z.infer<typeof simulationStateSchema>;

// Complete Network State (for API responses)
export const networkStateSchema = z.object({
  settings: networkSettingsSchema,
  devices: z.array(deviceSchema),
  simulation: simulationStateSchema,
});

export type NetworkState = z.infer<typeof networkStateSchema>;
