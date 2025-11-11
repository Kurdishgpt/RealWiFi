import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { type SimulationState } from "@shared/schema";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

interface SimulationControlsProps {
  state: SimulationState;
  onUpdate: (state: SimulationState) => void;
  onReset: () => void;
}

export function SimulationControls({ state, onUpdate, onReset }: SimulationControlsProps) {
  return (
    <Card data-testid="simulation-controls-card">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
        <Settings className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg font-semibold">Simulation Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant={state.playing ? "default" : "outline"}
            onClick={() => onUpdate({ ...state, playing: !state.playing })}
            className="flex-1"
            data-testid="button-play-pause"
          >
            {state.playing ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onReset} data-testid="button-reset">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Animation Speed</Label>
            <span className="text-sm font-mono text-muted-foreground">{state.speed}x</span>
          </div>
          <Slider
            value={[state.speed]}
            onValueChange={([speed]) => onUpdate({ ...state, speed })}
            min={1}
            max={4}
            step={1}
            className="w-full"
            data-testid="slider-speed"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1x</span>
            <span>2x</span>
            <span>3x</span>
            <span>4x</span>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t">
          <div className="flex items-center justify-between">
            <Label htmlFor="signal-strength" className="text-sm font-medium cursor-pointer">
              Show Signal Strength
            </Label>
            <Switch
              id="signal-strength"
              checked={state.showSignalStrength}
              onCheckedChange={(checked) =>
                onUpdate({ ...state, showSignalStrength: checked })
              }
              data-testid="switch-signal-strength"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="channels" className="text-sm font-medium cursor-pointer">
              Show Channels
            </Label>
            <Switch
              id="channels"
              checked={state.showChannels}
              onCheckedChange={(checked) =>
                onUpdate({ ...state, showChannels: checked })
              }
              data-testid="switch-channels"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
