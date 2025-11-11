import { type NetworkState, type NetworkSettings, type Device, type SimulationState } from "@shared/schema";

export interface IStorage {
  getNetworkState(): Promise<NetworkState>;
  updateNetworkState(state: NetworkState): Promise<NetworkState>;
}

export class MemStorage implements IStorage {
  private networkState: NetworkState;

  constructor() {
    this.networkState = {
      settings: {
        ssid: "MyWiFiNetwork",
        frequency: "5GHz",
        channel: 6,
        securityType: "WPA3",
        broadcastEnabled: true,
      },
      devices: [
        {
          id: "device-initial-1",
          name: "MacBook Pro 1",
          type: "laptop",
          x: 35,
          y: 35,
          signalStrength: 85,
          connected: true,
        },
        {
          id: "device-initial-2",
          name: "iPhone 1",
          type: "phone",
          x: 65,
          y: 45,
          signalStrength: 75,
          connected: true,
        },
      ],
      simulation: {
        playing: true,
        speed: 1,
        showSignalStrength: true,
        showChannels: false,
      },
    };
  }

  async getNetworkState(): Promise<NetworkState> {
    return this.networkState;
  }

  async updateNetworkState(state: NetworkState): Promise<NetworkState> {
    this.networkState = state;
    return this.networkState;
  }
}

export const storage = new MemStorage();
