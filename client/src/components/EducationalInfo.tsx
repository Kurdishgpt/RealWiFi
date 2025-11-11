import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Radio, Shield, Waves } from "lucide-react";

export function EducationalInfo() {
  return (
    <Card data-testid="educational-info-card">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg font-semibold">Learn About Wi-Fi</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="frequencies" data-testid="accordion-frequencies">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-primary" />
                <span>Understanding Wi-Fi Frequencies</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
              <p>
                <strong className="text-foreground">2.4 GHz:</strong> Longer range but slower speeds. Better at
                penetrating walls and obstacles. More prone to interference from
                other devices like microwaves and Bluetooth.
              </p>
              <p>
                <strong className="text-foreground">5 GHz:</strong> Faster speeds but shorter range. Less interference
                from other devices. Better for streaming and gaming when you're
                close to the router.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="channels" data-testid="accordion-channels">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-primary" />
                <span>Channel Interference</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
              <p>
                Wi-Fi channels are like lanes on a highway. When multiple
                networks use the same channel, they interfere with each other,
                slowing down all connections.
              </p>
              <p>
                <strong className="text-foreground">Best Practice:</strong> Use channels 1, 6, or 11 on 2.4 GHz as they
                don't overlap. Modern routers can automatically select the best
                channel based on nearby networks.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="encryption" data-testid="accordion-encryption">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Encryption Types</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
              <p>
                <strong className="text-foreground">Open:</strong> No encryption. Anyone can connect and intercept
                data. Never use for sensitive information.
              </p>
              <p>
                <strong className="text-foreground">WEP:</strong> Outdated and easily cracked. Should never be used.
              </p>
              <p>
                <strong className="text-foreground">WPA/WPA2:</strong> Secure for most home networks. WPA2 is the
                current standard.
              </p>
              <p>
                <strong className="text-foreground">WPA3:</strong> Latest and most secure. Protects against password
                guessing attacks and provides better encryption.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
