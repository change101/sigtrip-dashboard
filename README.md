# Sigtrip Fundraise Planner Dashboard

A modern, interactive fundraising planning dashboard for Sigtrip built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- **Interactive Inputs**: Adjust all parameters via intuitive sliders and inputs
- **Real-time Calculations**: See immediate updates as you change values
- **Beautiful Charts**: Visualize budget breakdown, runway projections, revenue growth, and more
- **Revenue Modeling**: Support for SaaS, Commission, and Hybrid pricing models
- **Unit Economics**: Track key metrics like ARR, revenue per hotel, and breakeven analysis
- **Scenario Comparison**: Compare different raise amounts and their impact on runway
- **Smart Recommendations**: Get contextual advice based on your inputs

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd sigtrip-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dashboard will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Usage

1. **Adjust Raise Parameters**: Set your target raise amount and desired runway
2. **Plan Your Team**: Configure headcount by role and salaries
3. **Set Location**: Choose office model and primary location
4. **Configure Revenue Model**: Select SaaS, Commission, or Hybrid pricing
5. **Set Hotel Targets**: Define your hotel acquisition goals
6. **Review Outputs**: Check KPIs, charts, and recommendations

## Input Parameters

### Raise Parameters
- Total raise target ($M)
- Target runway (months)

### Team Plan
- Engineers, Sales/BD, Product/Design, Ops/Admin, Founders

### Salaries ($K annually)
- Engineer, Sales/BD, Product/Design, Ops/Admin, Founder

### Office & Location
- Office model: Fully Remote, Hybrid, Dedicated Office
- Primary location with cost multipliers

### Revenue Model
- SaaS Subscription per Property
- Per-Booking Commission  
- Hybrid (SaaS + Low Commission)

### Hotel Acquisition
- Target hotels (end of runway)
- Hotels at start
- Months to first revenue
- Revenue per hotel parameters

## Outputs

- Monthly/Annual Burn Rate
- Projected ARR
- Cash Runway Projection
- Hotel Growth Ramp
- Revenue Breakdown (SaaS vs Commission)
- Budget Breakdown by Category
- Sensitivity Analysis
- Unit Economics Metrics
- Actionable Recommendations

## License

Private - Built for Sigtrip
