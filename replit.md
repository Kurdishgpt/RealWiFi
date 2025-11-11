# Wi-Fi Wireless Network Simulator

## Overview

This is an educational web application that simulates Wi-Fi wireless networks through interactive visualizations. The application allows users to explore Wi-Fi networking concepts including signal propagation, device connections, frequency bands, channel management, and security protocols. Users can configure network settings, add/remove devices, visualize signal strength, and control simulation playback to understand how wireless networks function in real-time.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: Shadcn/ui with Radix UI primitives
- Material Design approach for educational clarity and information hierarchy
- Custom visualization components for network simulation canvas
- Tailwind CSS for styling with custom design tokens
- Typography: Inter for UI elements, JetBrains Mono for technical specifications

**State Management**:
- React Query (TanStack Query) for server state management and API caching
- Local React state for UI-specific interactions (dragging, animations)
- Form state managed via React Hook Form with Zod validation

**Layout Strategy**:
- Desktop: 60/40 split layout (visualization canvas / control panel)
- Mobile: Single column stack with visualization on top
- Responsive design using Tailwind breakpoints

**Key Components**:
- `NetworkVisualization`: Interactive canvas showing router and connected devices with signal waves
- `ControlPanel`: Sidebar containing settings, device list, simulation controls, and educational content
- `NetworkSettings`: Form for configuring SSID, frequency, channel, and security
- `DeviceList`: Interface for adding/removing devices and toggling connections
- `SimulationControls`: Playback controls for animation speed and visibility toggles
- `EducationalInfo`: Accordion-based content explaining Wi-Fi concepts

### Backend Architecture

**Framework**: Express.js with TypeScript

**API Design**: RESTful endpoints
- `GET /api/network`: Retrieve current network state
- `PUT /api/network`: Update network state with validation

**Request/Response Flow**:
- JSON body parsing with raw body preservation for potential webhook integrations
- Zod schema validation for all incoming network state updates
- Structured error responses with appropriate HTTP status codes

**Development Server**:
- Vite middleware integration for HMR during development
- Request logging with timing and response preview
- Static file serving in production mode

### Data Storage Solutions

**Current Implementation**: In-memory storage (MemStorage class)
- Stores network state including settings, devices, and simulation parameters
- Initialized with default network configuration
- Suitable for development and single-user scenarios

**Schema Definition**:
- Network settings (SSID, frequency, channel, security type, broadcast)
- Device properties (id, name, type, position, signal strength, connection status)
- Simulation state (playing, speed, visibility flags)
- All schemas defined using Zod for runtime validation

**Database Configuration**: 
- Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless`
- Schema location: `shared/schema.ts`
- Migration output: `./migrations`
- Database provisioning expected via `DATABASE_URL` environment variable
- Note: Current implementation uses in-memory storage; database integration prepared but not yet implemented

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives for accessible, unstyled components
- Shadcn/ui component patterns (New York style)
- Lucide React for icons

**Styling and Design**:
- Tailwind CSS with custom configuration
- Google Fonts: Inter, JetBrains Mono, Architects Daughter, DM Sans, Fira Code, Geist Mono

**State and Data Management**:
- TanStack React Query for server state
- React Hook Form for form handling
- Zod for schema validation and type safety
- Drizzle ORM for database operations (configured, not yet utilized)

**Development Tools**:
- Vite for build tooling and development server
- Replit-specific plugins (runtime error overlay, cartographer, dev banner)
- TypeScript for type safety across client and server
- Wouter for client-side routing

**Backend Services**:
- Express.js web framework
- @neondatabase/serverless for PostgreSQL connectivity (provisioned but not actively used)
- connect-pg-simple for session storage (available but not implemented)

**Build and Deployment**:
- ESBuild for server-side bundling
- Vite for client-side bundling
- Path aliasing: `@/` for client code, `@shared/` for shared schemas