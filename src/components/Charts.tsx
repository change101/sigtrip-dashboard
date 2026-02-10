import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Area, AreaChart,
  BarChart, Bar, ReferenceLine
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import type { CategoryData } from '@/types'

// Chart colors for light theme
export const COLORS = {
  teal: '#14b8a6',
  blue: '#3b82f6',
  orange: '#f97316',
  purple: '#a855f7',
  gray: '#6b7280',
  amber: '#f59e0b',
  emerald: '#10b981',
  red: '#ef4444',
  slate: '#64748b',
  cyan: '#06b6d4',
  pink: '#ec4899',
}

interface BudgetBreakdownChartProps {
  data: CategoryData[]
}

export function BudgetBreakdownChart({ data }: BudgetBreakdownChartProps) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-100">
        <CardTitle className="text-sm font-semibold text-slate-700">Annual Budget Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
              ))}
            </Pie>
            <RechartsTooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              itemStyle={{ color: '#1e293b' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface RunwayChartProps {
  months: number[]
  cashNoRev: number[]
  cashWithRev: number[]
}

export function RunwayChart({ months, cashNoRev, cashWithRev }: RunwayChartProps) {
  const data = months.map((month, i) => ({
    month,
    noRevenue: cashNoRev[i],
    withRevenue: cashWithRev[i],
  }))

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-100">
        <CardTitle className="text-sm font-semibold text-slate-700">Cash Runway Projection</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
            <defs>
              <linearGradient id="colorNoRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.red} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={COLORS.red} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorWithRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Months', position: 'insideBottom', offset: -15, fill: '#64748b', fontSize: 12 }} />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12}
              tickFormatter={(v) => `$${(v / 1e6).toFixed(1)}M`}
              tickLine={false}
            />
            <RechartsTooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Month ${label}`}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="noRevenue" 
              stroke={COLORS.red} 
              fillOpacity={1} 
              fill="url(#colorNoRev)" 
              strokeDasharray="5 5"
              name="No Revenue"
            />
            <Area 
              type="monotone" 
              dataKey="withRevenue" 
              stroke={COLORS.emerald} 
              fillOpacity={1} 
              fill="url(#colorWithRev)" 
              name="With Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface HotelGrowthChartProps {
  months: number[]
  hotels: number[]
  targetHotels: number
}

export function HotelGrowthChart({ months, hotels, targetHotels }: HotelGrowthChartProps) {
  const data = months.map((month, i) => ({
    month,
    hotels: hotels[i],
  }))

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-100">
        <CardTitle className="text-sm font-semibold text-slate-700">Hotel Onboarding Ramp</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
            <defs>
              <linearGradient id="colorHotels" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.teal} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={COLORS.teal} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Months', position: 'insideBottom', offset: -15, fill: '#64748b', fontSize: 12 }} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
            <RechartsTooltip 
              formatter={(value: number) => [`${value} hotels`, 'Hotels']}
              labelFormatter={(label) => `Month ${label}`}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <ReferenceLine y={targetHotels} stroke={COLORS.slate} strokeDasharray="3 3" label={{ value: 'Target', fill: COLORS.slate, fontSize: 12 }} />
            <Area 
              type="monotone" 
              dataKey="hotels" 
              stroke={COLORS.teal} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorHotels)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface RevenueChartProps {
  months: number[]
  monthlyRevenue: number[]
  saasRevenue: number[]
  commissionRevenue: number[]
  monthlyBurn: number
  hasSaas: boolean
  hasCommission: boolean
}

export function RevenueChart({ 
  months, 
  monthlyRevenue, 
  saasRevenue, 
  commissionRevenue, 
  monthlyBurn,
  hasSaas,
  hasCommission
}: RevenueChartProps) {
  const data = months.map((month, i) => ({
    month,
    saas: saasRevenue[i],
    commission: commissionRevenue[i],
    total: monthlyRevenue[i],
  }))

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-100">
        <CardTitle className="text-sm font-semibold text-slate-700">Monthly Revenue Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
            <defs>
              <linearGradient id="colorSaas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.teal} stopOpacity={0.5}/>
                <stop offset="95%" stopColor={COLORS.teal} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.5}/>
                <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Months', position: 'insideBottom', offset: -15, fill: '#64748b', fontSize: 12 }} />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              tickLine={false}
            />
            <RechartsTooltip 
              formatter={(value: number, name: string) => [formatCurrency(value), name]}
              labelFormatter={(label) => `Month ${label}`}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <ReferenceLine 
              y={monthlyBurn} 
              stroke={COLORS.red} 
              strokeDasharray="3 3" 
              label={{ value: 'Monthly Burn', fill: COLORS.red, fontSize: 12 }} 
            />
            {hasSaas && (
              <Area 
                type="monotone" 
                dataKey="saas" 
                stackId="1"
                stroke={COLORS.teal} 
                fill="url(#colorSaas)" 
                name="SaaS Subscription"
              />
            )}
            {hasCommission && (
              <Area 
                type="monotone" 
                dataKey="commission" 
                stackId="1"
                stroke={COLORS.blue} 
                fill="url(#colorCommission)" 
                name="Booking Commission"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface SensitivityChartProps {
  data: { size: number; runway: number }[]
  currentHeadcount: number
}

export function SensitivityChart({ data, currentHeadcount }: SensitivityChartProps) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-100">
        <CardTitle className="text-sm font-semibold text-slate-700">Sensitivity: Runway vs. Team Size</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
            <defs>
              <linearGradient id="colorSensitivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.teal} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={COLORS.teal} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="size" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Total Headcount', position: 'insideBottom', offset: -15, fill: '#64748b', fontSize: 12 }} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Runway (months)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }} />
            <RechartsTooltip 
              formatter={(value: number) => [`${value.toFixed(1)} months`, 'Runway']}
              labelFormatter={(label) => `${label} people`}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <ReferenceLine y={18} stroke={COLORS.amber} strokeDasharray="3 3" label={{ value: '18-mo target', fill: COLORS.amber, fontSize: 12 }} />
            <ReferenceLine y={24} stroke={COLORS.red} strokeDasharray="3 3" label={{ value: '24-mo target', fill: COLORS.red, fontSize: 12 }} />
            <ReferenceLine x={currentHeadcount} stroke={COLORS.slate} strokeDasharray="3 3" label={{ value: `Current (${currentHeadcount})`, fill: COLORS.slate, fontSize: 12 }} />
            <Area 
              type="monotone" 
              dataKey="runway" 
              stroke={COLORS.teal} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorSensitivity)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface RevenueMixChartProps {
  annualSaas: number
  annualCommission: number
}

export function RevenueMixChart({ annualSaas, annualCommission }: RevenueMixChartProps) {
  const data = [
    { name: 'SaaS Subscription', value: annualSaas, color: COLORS.teal },
    { name: 'Booking Commission', value: annualCommission, color: COLORS.blue },
  ].filter(d => d.value > 0)

  if (data.length === 0) return null

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-100">
        <CardTitle className="text-sm font-semibold text-slate-700">Revenue Mix at Full Ramp</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
              ))}
            </Pie>
            <RechartsTooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface CumulativeChartProps {
  months: number[]
  cumulativeBurn: number[]
  cumulativeRevenue: number[]
}

export function CumulativeChart({ months, cumulativeBurn, cumulativeRevenue }: CumulativeChartProps) {
  const data = months.map((month, i) => ({
    month,
    burn: cumulativeBurn[i],
    revenue: cumulativeRevenue[i],
  }))

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-100">
        <CardTitle className="text-sm font-semibold text-slate-700">Revenue vs Burn</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'Months', position: 'insideBottom', offset: -15, fill: '#64748b', fontSize: 12 }} />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12}
              tickFormatter={(v) => `$${(v / 1e6).toFixed(1)}M`}
              tickLine={false}
            />
            <RechartsTooltip 
              formatter={(value: number, name: string) => [formatCurrency(value), name]}
              labelFormatter={(label) => `Month ${label}`}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Line type="monotone" dataKey="burn" stroke={COLORS.red} strokeWidth={2} dot={false} name="Cumulative Burn" />
            <Line type="monotone" dataKey="revenue" stroke={COLORS.emerald} strokeWidth={2} dot={false} name="Cumulative Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface CostBreakdownChartProps {
  data: { category: string; value: number }[]
}

export function CostBreakdownChart({ data }: CostBreakdownChartProps) {
  const sortedData = [...data].sort((a, b) => a.value - b.value)
  
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-100">
        <CardTitle className="text-sm font-semibold text-slate-700">Monthly Cost Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
            <XAxis 
              type="number" 
              stroke="#94a3b8" 
              fontSize={12}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              tickLine={false}
            />
            <YAxis 
              type="category" 
              dataKey="category" 
              stroke="#64748b" 
              fontSize={11}
              width={90}
              tickLine={false}
            />
            <RechartsTooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar dataKey="value" fill={COLORS.blue} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface TeamCompositionChartProps {
  roles: { name: string; count: number; color: string }[]
}

export function TeamCompositionChart({ roles }: TeamCompositionChartProps) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-100">
        <CardTitle className="text-sm font-semibold text-slate-700">Team Composition</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={roles} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
            <RechartsTooltip 
              formatter={(value: number) => [`${value} people`, 'Count']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {roles.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface UseOfFundsChartProps {
  categories: { name: string; value: number; color: string }[]
  runwayMonths: number
}

export function UseOfFundsChart({ categories, runwayMonths }: UseOfFundsChartProps) {
  // Calculate cumulative for waterfall effect
  let cumulative = 0
  const data = categories.map(cat => {
    const value = cat.value / 12 * runwayMonths
    const item = {
      name: cat.name,
      value: value,
      start: cumulative,
      end: cumulative + value,
      color: cat.color,
    }
    cumulative += value
    return item
  })
  
  const total = cumulative

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-100">
        <CardTitle className="text-sm font-semibold text-slate-700">Use of Funds – {runwayMonths}-Month Plan</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false}
              angle={-25}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1e6).toFixed(1)}M`}
            />
            <RechartsTooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-sm font-medium text-slate-600">Total Use of Funds</span>
          <span className="text-lg font-bold text-slate-900">{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
