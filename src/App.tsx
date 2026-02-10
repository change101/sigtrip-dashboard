import { useState } from 'react'
import { useDashboard } from '@/hooks/useDashboard'
import { Sidebar } from '@/components/Sidebar'
import { MetricCard } from '@/components/MetricCard'
import { Recommendations } from '@/components/Recommendations'
import {
  BudgetBreakdownChart,
  RunwayChart,
  HotelGrowthChart,
  RevenueChart,
  SensitivityChart,
  RevenueMixChart,
  CumulativeChart,
  CostBreakdownChart,
  TeamCompositionChart,
  UseOfFundsChart,
  COLORS,
} from '@/components/Charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getCategoryData, getScenarios, getRunwaySensitivity } from '@/lib/calculations'
import { formatCurrency, formatNumber } from '@/lib/utils'
import {
  TrendingDown,
  Calendar,
  Target,
  Users,
  Building2,
  Wallet,
  BarChart3,
  PieChart,
  TrendingUp,
  LineChart,
  Menu
} from 'lucide-react'

function App() {
  const { inputs, metrics, updateInput } = useDashboard()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const categoryData = getCategoryData(metrics)
  const scenarios = getScenarios(metrics.monthlyBurn)
  const sensitivityData = getRunwaySensitivity(
    metrics.raiseDollars, 
    metrics.monthlyBurn, 
    metrics.totalHeadcount
  )
  
  // Calculate runway data
  const monthsArr = Array.from({ length: inputs.runwayMonths + 1 }, (_, i) => i)
  const cashNoRev = monthsArr.map(m => metrics.raiseDollars - metrics.monthlyBurn * m)
  const cashWithRev = monthsArr.map(m => 
    Math.max(metrics.raiseDollars - (metrics.monthlyBurn * m - metrics.cumulativeRevenue[m]), 
    -metrics.raiseDollars * 0.3)
  )
  
  // Saas and commission revenue breakdown (from metrics)
  const { saasRevenueByMonth, commissionRevenueByMonth } = metrics
  
  // Cumulative burn
  const cumulativeBurn = monthsArr.map(m => metrics.monthlyBurn * m)
  
  // Cost breakdown data
  const costBreakdownData = [
    { category: 'Payroll (loaded)', value: metrics.monthlyPayrollLoaded },
    { category: 'Office', value: metrics.monthlyOffice },
    { category: 'Marketing', value: metrics.monthlyMarketing },
    { category: 'Infra & Cloud', value: metrics.monthlyInfra },
    { category: 'Dev Tools', value: metrics.monthlyDevtools },
    { category: 'Legal/Acct', value: metrics.monthlyLegal },
    { category: 'Travel/Events', value: metrics.monthlyTravel },
    { category: 'Buffer', value: metrics.monthlyBurn - metrics.monthlyBurnBase },
  ]
  
  const surplusOrDeficit = metrics.raiseDollars - metrics.totalNeeded
  const isSurplus = surplusOrDeficit >= 0

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        inputs={inputs}
        updateInput={updateInput}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 overflow-y-auto w-full">
        {/* Mobile header bar */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600"
            aria-label="Open filters"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-base font-bold text-slate-900">Sigtrip Fundraise Planner</h1>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-10 max-w-[1920px] mx-auto">
          {/* Header - hidden on mobile (shown in sticky bar instead) */}
          <div className="mb-8 hidden lg:block">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Sigtrip Fundraise Planner</h1>
            </div>
            <p className="text-slate-600 ml-13">
              Interactive model to determine the right raise amount for Sigtrip's Seed / Series A.
              Adjust the inputs in the sidebar to explore scenarios.
            </p>
          </div>
          
          {/* KPI Row 1 - Financial */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
            <MetricCard
              title="Monthly Burn"
              value={formatCurrency(metrics.monthlyBurn)}
              trend="down"
              icon={<TrendingDown className="w-5 h-5 text-red-500" />}
            />
            <MetricCard
              title="Projected ARR"
              value={formatCurrency(metrics.arr, true)}
              trend="up"
              icon={<Target className="w-5 h-5 text-blue-500" />}
            />
            <MetricCard
              title="Raise Target"
              value={`$${inputs.raiseAmount}M`}
              icon={<Wallet className="w-5 h-5 text-emerald-500" />}
            />
            <MetricCard
              title="Runway"
              value={`${metrics.actualRunway.toFixed(1)} mo`}
              subtitle={`${(metrics.actualRunway / 12).toFixed(1)} years`}
              icon={<Calendar className="w-5 h-5 text-purple-500" />}
            />
            <MetricCard
              title="Target Hotels"
              value={formatNumber(inputs.targetHotels)}
              icon={<Building2 className="w-5 h-5 text-cyan-500" />}
            />
          </div>
          
          {/* KPI Row 2 - Revenue */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <MetricCard
              title="Revenue Model"
              value={inputs.revenueModel === 'saas' ? 'SaaS' : inputs.revenueModel === 'commission' ? 'Commission' : 'Hybrid'}
              icon={<PieChart className="w-5 h-5 text-indigo-500" />}
            />
            <MetricCard
              title="Revenue per Hotel/mo"
              value={formatCurrency(metrics.avgMonthlyRevenuePerHotel)}
              trend="up"
              icon={<TrendingUp className="w-5 h-5 text-green-500" />}
            />
            <MetricCard
              title="Team Size"
              value={metrics.totalHeadcount}
              subtitle="people"
              icon={<Users className="w-5 h-5 text-orange-500" />}
            />
            <MetricCard
              title="Breakeven"
              value={metrics.breakevenMonth !== null ? `Month ${metrics.breakevenMonth}` : 'N/A'}
              icon={<LineChart className="w-5 h-5 text-pink-500" />}
            />
          </div>
          
          {/* Charts Grid - Full Width Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Row 1 - Budget (4 cols) & Runway (8 cols) */}
            <div className="xl:col-span-4">
              <BudgetBreakdownChart data={categoryData} />
            </div>
            <div className="xl:col-span-8">
              <RunwayChart 
                months={monthsArr} 
                cashNoRev={cashNoRev} 
                cashWithRev={cashWithRev} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Row 2 - Costs (4 cols), Hotels (4 cols), Team (4 cols) */}
            <div className="xl:col-span-4">
              <CostBreakdownChart data={costBreakdownData} />
            </div>
            <div className="xl:col-span-4">
              <HotelGrowthChart 
                months={monthsArr} 
                hotels={metrics.hotelsByMonth}
                targetHotels={inputs.targetHotels}
              />
            </div>
            <div className="xl:col-span-4">
              <TeamCompositionChart 
                roles={[
                  { name: 'Engineers', count: inputs.nEngineers, color: COLORS.teal },
                  { name: 'Sales/BD', count: inputs.nSalesBd, color: COLORS.blue },
                  { name: 'Product', count: inputs.nProduct, color: COLORS.purple },
                  { name: 'Ops', count: inputs.nOps, color: COLORS.gray },
                  { name: 'Founders', count: inputs.founders, color: COLORS.amber },
                ]}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Row 3 - Revenue (8 cols) & Revenue Mix (4 cols) */}
            <div className="xl:col-span-8">
              <RevenueChart 
                months={monthsArr}
                monthlyRevenue={metrics.monthlyRevenue}
                saasRevenue={saasRevenueByMonth}
                commissionRevenue={commissionRevenueByMonth}
                monthlyBurn={metrics.monthlyBurn}
                hasSaas={inputs.revenueModel !== 'commission'}
                hasCommission={inputs.revenueModel !== 'saas'}
              />
            </div>
            <div className="xl:col-span-4">
              <RevenueMixChart 
                annualSaas={metrics.annualSaas}
                annualCommission={metrics.annualCommission}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Row 4 - Cumulative (4 cols), Sensitivity (8 cols) */}
            <div className="xl:col-span-4">
              <CumulativeChart 
                months={monthsArr}
                cumulativeBurn={cumulativeBurn}
                cumulativeRevenue={metrics.cumulativeRevenue}
              />
            </div>
            <div className="xl:col-span-8">
              <SensitivityChart 
                data={sensitivityData}
                currentHeadcount={metrics.totalHeadcount}
              />
            </div>
          </div>
          
          {/* Use of Funds - Full Width */}
          <div className="mb-6">
            <UseOfFundsChart 
              categories={categoryData}
              runwayMonths={inputs.runwayMonths}
            />
          </div>
          
          {/* Scenarios Table - Full Width */}
          <Card className="bg-white border-slate-200 shadow-sm mb-6">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-semibold text-slate-900">Raise Scenario Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Raise ($M)</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Monthly Burn</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Runway (months)</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Runway (years)</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">18mo?</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">24mo?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((s, i) => (
                      <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 text-sm font-semibold text-slate-900">${s.raiseAmount}M</td>
                        <td className="py-4 px-6 text-sm text-slate-600">{formatCurrency(s.monthlyBurn)}</td>
                        <td className="py-4 px-6 text-sm text-slate-600">{s.runway.toFixed(1)}</td>
                        <td className="py-4 px-6 text-sm text-slate-600">{s.runwayYears.toFixed(1)}</td>
                        <td className="py-4 px-6">
                          <Badge variant={s.enough18 ? 'success' : 'destructive'} className="font-medium">
                            {s.enough18 ? 'Yes' : 'No'}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <Badge variant={s.enough24 ? 'success' : 'destructive'} className="font-medium">
                            {s.enough24 ? 'Yes' : 'No'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Unit Economics Table - Full Width */}
          <Card className="bg-white border-slate-200 shadow-sm mb-6">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-semibold text-slate-900">Unit Economics Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100">
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">LTV (Annual)</p>
                  <p className="text-xl font-bold text-slate-900">
                    {formatCurrency(metrics.avgMonthlyRevenuePerHotel * 12)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">per hotel</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100">
                  <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide mb-1">CAC Payback</p>
                  <p className="text-xl font-bold text-slate-900">6-12</p>
                  <p className="text-xs text-slate-500 mt-1">months (est.)</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100">
                  <p className="text-xs text-purple-600 font-medium uppercase tracking-wide mb-1">Rev per Employee</p>
                  <p className="text-xl font-bold text-slate-900">
                    {metrics.totalHeadcount > 0 
                      ? `$${(metrics.arr / metrics.totalHeadcount / 1e3).toFixed(1)}K` 
                      : 'N/A'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">annual</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-100">
                  <p className="text-xs text-orange-600 font-medium uppercase tracking-wide mb-1">Gross Margin</p>
                  <p className="text-xl font-bold text-slate-900">80-90%</p>
                  <p className="text-xs text-slate-500 mt-1">software</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100/50 border border-pink-100">
                  <p className="text-xs text-pink-600 font-medium uppercase tracking-wide mb-1">Take Rate</p>
                  <p className="text-xl font-bold text-slate-900">{inputs.commissionPct}%</p>
                  <p className="text-xs text-slate-500 mt-1">vs OTA 15-25%</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-100">
                  <p className="text-xs text-cyan-600 font-medium uppercase tracking-wide mb-1">Breakeven</p>
                  <p className="text-xl font-bold text-slate-900">
                    {metrics.breakevenMonth !== null ? `M${metrics.breakevenMonth}` : 'N/A'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {metrics.breakevenMonth !== null ? `${metrics.hotelsByMonth[metrics.breakevenMonth]} hotels` : 'raise more'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recommendations & Questions */}
          <Recommendations inputs={inputs} metrics={metrics} />
          
          <Separator className="my-8" />
          
          {/* Summary Table - Full Width */}
          <Card className="bg-white border-slate-200 shadow-sm mb-8">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-semibold text-slate-900">Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {[
                      { label: 'Raise amount', value: `$${inputs.raiseAmount}M`, highlight: true },
                      { label: 'Monthly burn', value: formatCurrency(metrics.monthlyBurn) },
                      { label: 'Annual burn', value: formatCurrency(metrics.annualBurn) },
                      { label: 'Team size', value: `${metrics.totalHeadcount} people` },
                      { label: 'Runway', value: `${metrics.actualRunway.toFixed(1)} months` },
                      { 
                        label: `${inputs.runwayMonths}-month need vs raise`, 
                        value: isSurplus 
                          ? `Surplus of ${formatCurrency(surplusOrDeficit)}` 
                          : `Shortfall of ${formatCurrency(Math.abs(surplusOrDeficit))}`,
                        valueClass: isSurplus ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'
                      },
                      { label: 'People % of burn', value: `${metrics.peoplePct.toFixed(0)}%` },
                      { label: 'Engineering % of team', value: `${metrics.engRatio.toFixed(0)}%` },
                      { 
                        label: 'Revenue Model', 
                        value: inputs.revenueModel === 'saas' 
                          ? 'SaaS Subscription' 
                          : inputs.revenueModel === 'commission' 
                          ? 'Per-Booking Commission' 
                          : 'Hybrid (SaaS + Commission)'
                      },
                      { label: 'Projected ARR at Exit', value: formatCurrency(metrics.arr, true) },
                      { label: 'Revenue per Hotel/mo', value: formatCurrency(metrics.avgMonthlyRevenuePerHotel) },
                      { 
                        label: 'Breakeven Month', 
                        value: metrics.breakevenMonth !== null ? `Month ${metrics.breakevenMonth}` : 'N/A (raise more)'
                      },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-0">
                        <td className="py-3 px-6 text-sm text-slate-500 font-medium w-1/3">{row.label}</td>
                        <td className={`py-3 px-6 text-sm ${row.highlight ? 'text-slate-900 font-bold text-lg' : row.valueClass || 'text-slate-700'}`}>
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Footer */}
          <p className="text-xs text-slate-400 text-center pb-8">
            Built for Sigtrip fundraise planning. All figures are estimates. 
            Adjust inputs in the sidebar to explore different scenarios.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
