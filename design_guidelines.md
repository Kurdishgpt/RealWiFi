# Wi-Fi Wireless Network Simulator - Design Guidelines

## Design Approach

**Selected Framework:** Material Design with custom visualization components
**Rationale:** Educational tools benefit from Material's clear visual hierarchy and information density, while custom components handle the unique network visualization requirements.

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, and 12
- Micro spacing (gaps, padding): 2, 4
- Component spacing: 6, 8
- Section spacing: 12, 16

**Grid Structure:**
- Main layout: 2-column split (60/40) on desktop
  - Left: Interactive network visualization canvas (60%)
  - Right: Control panel and educational info (40%)
- Mobile: Stack to single column, visualization on top

**Container Widths:**
- Full viewport width with max-w-screen-2xl
- Control panel: max-w-md with fixed positioning on larger screens

## Typography Hierarchy

**Font Stack:** Google Fonts - "Inter" for UI, "JetBrains Mono" for technical specs
- H1 (App Title): 2xl, bold (font-bold)
- H2 (Section Headers): xl, semibold (font-semibold)
- H3 (Panel Titles): lg, medium (font-medium)
- Body Text: base, regular
- Technical Data: sm, mono (JetBrains Mono)
- Labels/Captions: xs, medium

## Component Library

### Core Components

**Network Visualization Canvas**
- Large canvas area (min-h-[600px]) centered in left column
- Grid background pattern for spatial reference
- Router icon positioned centrally
- Device icons arranged in orbital pattern around router
- Animated signal wave SVG rings emanating from router
- Connection lines from router to devices with animated dashes

**Control Panel (Right Sidebar)**
- Floating card design with subtle elevation
- Fixed width (w-80) on desktop
- Sections separated by dividers (border-b with spacing)
- Contains: Network settings, device management, simulation controls

**Network Settings Card**
- SSID input field with Wi-Fi icon prefix
- Dropdown selectors for: Frequency (2.4GHz/5GHz), Channel, Security Type
- Toggle switches for: Router broadcast, Show signal strength, Show channels

**Device Management Panel**
- List of connected devices with compact card design
- Each device shows: icon, name, signal strength indicator, connection status
- Add/Remove device buttons (icon buttons with tooltips)
- Device types: laptop, phone, tablet, IoT device (different icons)

**Educational Info Cards**
- Expandable accordion sections
- Topics: "Understanding Wi-Fi Frequencies", "Channel Interference", "Encryption Types"
- Each section: title + icon, expandable content with concise explanations
- Use info icons (Heroicons) consistently

**Simulation Controls**
- Play/Pause toggle for animations
- Speed slider (1x to 4x)
- Reset button
- Placed at bottom of control panel

### Interactive Elements

**Signal Strength Indicators**
- Visual bars (3-4 bars style) or circular progress indicators
- Dynamically update based on device distance from router
- Color-independent visual strength representation

**Device Icons**
- Use Heroicons for: computer-desktop, device-phone-mobile, device-tablet
- Size: 8x8 or 10x10 units
- Draggable on canvas for repositioning

**Connection Status**
- Pulsing dot indicator on each device
- Animated connection line when device connects/disconnects

## Animation Strategy

**Signal Wave Animation** (Primary Animation)
- Concentric circles expanding from router
- 3-4 overlapping waves at different phases
- Subtle opacity fade as waves expand
- Continuous loop at moderate speed
- Use CSS animations (keyframes) for performance

**Connection Events**
- Brief flash animation when device connects
- Fade in/out for device addition/removal
- No hover animations on canvas elements

**UI Interactions**
- Smooth transitions for accordion expand/collapse (200ms)
- Minimal button feedback (avoid distracting from visualization)

## Accessibility

**Keyboard Navigation**
- Tab order: controls → devices → educational sections
- Focus indicators on all interactive elements (ring-2 offset)
- Escape key to close expanded panels

**Screen Reader Support**
- Proper ARIA labels for all controls
- Live region announcements for connection events
- Alternative text descriptions for network state

## Icons

**Icon Library:** Heroicons (via CDN)
**Usage:**
- wifi icon for router
- signal icon for signal strength
- device icons (computer, phone, tablet)
- information-circle for educational info
- play/pause for simulation controls
- chevron-down for accordion toggles

## Images

**No hero image required** - This is a web application, not a marketing page.

**Network Device Illustrations:**
- Router: Simple icon representation (Heroicons wifi icon scaled up)
- Devices: Use corresponding Heroicons
- No photographic images needed - icon-based visualization sufficient

## Responsive Behavior

**Desktop (lg+):** Side-by-side layout with fixed right panel
**Tablet (md):** Narrower visualization, compressed control panel
**Mobile (base):** Stacked layout, visualization height reduced to h-96, controls below with full width

This design creates a focused, educational tool where the network visualization is the hero element, supported by clean, functional controls that don't compete for attention.