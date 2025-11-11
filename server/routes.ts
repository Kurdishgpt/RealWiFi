import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { networkStateSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/network", async (req, res) => {
    try {
      const state = await storage.getNetworkState();
      res.json(state);
    } catch (error) {
      console.error("Error fetching network state:", error);
      res.status(500).json({ error: "Failed to fetch network state" });
    }
  });

  app.put("/api/network", async (req, res) => {
    try {
      const validatedState = networkStateSchema.parse(req.body);
      const updatedState = await storage.updateNetworkState(validatedState);
      res.json(updatedState);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid network state", details: error.errors });
      } else {
        console.error("Error updating network state:", error);
        res.status(500).json({ error: "Failed to update network state" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
