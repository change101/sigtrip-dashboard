import { Slider } from '@/components/ui/slider'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import type { DashboardInputs } from '@/types'
import { Calculator, Users, Building2, DollarSign, TrendingUp, Briefcase, Settings } from 'lucide-react'

interface SidebarProps {
  inputs: DashboardInputs
  updateInput: <K extends keyof DashboardInputs>(key: K, value: DashboardInputs[K]) => void
  isOpen?: boolean
  onClose?: () => void
}

const cities = [
  'San Francisco',
  'New York',
  'Austin',
  'Miami',
  'London',
  'Lisbon',
  'Berlin',
  'Tel Aviv',
  'Remote (distributed)',
]

export function Sidebar({ inputs, updateInput, isOpen = true, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div className={`
        fixed lg:relative z-50 lg:z-auto
        w-[85vw] max-w-sm bg-white border-r border-slate-200 h-screen overflow-y-auto shadow-sm
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Raise Planner</h1>
                <p className="text-xs text-slate-500">Sigtrip</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                aria-label="Close sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            The Distribution Layer for the AI Travel Economy
          </p>
        </div>

        <Separator className="my-4" />

        {/* Raise Parameters */}
        <Section title="Raise Parameters" icon={<DollarSign className="w-4 h-4" />}>
          <SliderField
            label="Total raise target"
            value={inputs.raiseAmount}
            min={2}
            max={12}
            step={0.5}
            format={(v) => `$${v}M`}
            onChange={(v) => updateInput('raiseAmount', v)}
          />
          <SliderField
            label="Target runway"
            value={inputs.runwayMonths}
            min={12}
            max={36}
            step={1}
            format={(v) => `${v} months`}
            onChange={(v) => updateInput('runwayMonths', v)}
          />
        </Section>

        {/* Team */}
        <Section title="Team Plan" icon={<Users className="w-4 h-4" />}>
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="Engineers"
              value={inputs.nEngineers}
              min={2}
              max={30}
              onChange={(v) => updateInput('nEngineers', v)}
            />
            <NumberField
              label="Sales / BD"
              value={inputs.nSalesBd}
              min={0}
              max={15}
              onChange={(v) => updateInput('nSalesBd', v)}
            />
            <NumberField
              label="Product / Design"
              value={inputs.nProduct}
              min={0}
              max={10}
              onChange={(v) => updateInput('nProduct', v)}
            />
            <NumberField
              label="Ops / Admin"
              value={inputs.nOps}
              min={0}
              max={10}
              onChange={(v) => updateInput('nOps', v)}
            />
          </div>
          <NumberField
            label="Founders (taking salary)"
            value={inputs.founders}
            min={1}
            max={5}
            onChange={(v) => updateInput('founders', v)}
          />
        </Section>

        {/* Salaries */}
        <Section title="Annual Salaries ($K)" icon={<Briefcase className="w-4 h-4" />}>
          <SliderField
            label="Engineer"
            value={inputs.salaryEng}
            min={80}
            max={250}
            step={5}
            format={(v) => `$${v}K`}
            onChange={(v) => updateInput('salaryEng', v)}
          />
          <SliderField
            label="Sales / BD"
            value={inputs.salarySales}
            min={60}
            max={200}
            step={5}
            format={(v) => `$${v}K`}
            onChange={(v) => updateInput('salarySales', v)}
          />
          <SliderField
            label="Product / Design"
            value={inputs.salaryProduct}
            min={80}
            max={220}
            step={5}
            format={(v) => `$${v}K`}
            onChange={(v) => updateInput('salaryProduct', v)}
          />
          <SliderField
            label="Ops / Admin"
            value={inputs.salaryOps}
            min={50}
            max={150}
            step={5}
            format={(v) => `$${v}K`}
            onChange={(v) => updateInput('salaryOps', v)}
          />
          <SliderField
            label="Founder salary"
            value={inputs.salaryFounder}
            min={40}
            max={200}
            step={5}
            format={(v) => `$${v}K`}
            onChange={(v) => updateInput('salaryFounder', v)}
          />
        </Section>

        {/* Office */}
        <Section title="Office & Location" icon={<Building2 className="w-4 h-4" />}>
          <div className="space-y-2">
            <label className="text-xs text-slate-500 font-medium">Office model</label>
            <Select 
              value={inputs.officeChoice} 
              onValueChange={(v) => updateInput('officeChoice', v as DashboardInputs['officeChoice'])}
            >
              <SelectTrigger className="bg-white border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fully_remote">Fully Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid (flex space)</SelectItem>
                <SelectItem value="dedicated_office">Dedicated Office</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 mt-3">
            <label className="text-xs text-slate-500 font-medium">Primary location</label>
            <Select 
              value={inputs.city} 
              onValueChange={(v) => updateInput('city', v)}
            >
              <SelectTrigger className="bg-white border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Section>

        {/* Marketing */}
        <Section title="Marketing Budget" icon={<TrendingUp className="w-4 h-4" />}>
          <SliderField
            label="Monthly marketing spend"
            value={inputs.marketingMonthly}
            min={0}
            max={150}
            step={5}
            format={(v) => `$${v}K`}
            onChange={(v) => updateInput('marketingMonthly', v)}
          />
        </Section>

        {/* Infra */}
        <Section title="Development & Infra" icon={<Settings className="w-4 h-4" />}>
          <SliderField
            label="Cloud / API / Infra"
            value={inputs.infraMonthly}
            min={1}
            max={80}
            step={1}
            format={(v) => `$${v}K/mo`}
            onChange={(v) => updateInput('infraMonthly', v)}
          />
          <SliderField
            label="Dev tools & licenses"
            value={inputs.devToolsMonthly}
            min={0}
            max={30}
            step={1}
            format={(v) => `$${v}K/mo`}
            onChange={(v) => updateInput('devToolsMonthly', v)}
          />
        </Section>

        {/* Revenue Model */}
        <Section title="Revenue Model" icon={<DollarSign className="w-4 h-4" />}>
          <div className="space-y-2">
            <label className="text-xs text-slate-500 font-medium">Pricing model</label>
            <Select 
              value={inputs.revenueModel} 
              onValueChange={(v) => updateInput('revenueModel', v as DashboardInputs['revenueModel'])}
            >
              <SelectTrigger className="bg-white border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="saas">SaaS Subscription per Property</SelectItem>
                <SelectItem value="commission">Per-Booking Commission</SelectItem>
                <SelectItem value="hybrid">Hybrid (SaaS + Low Commission)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 space-y-1">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Hotel Acquisition</p>
            <NumberField
              label="Target hotels (end of runway)"
              value={inputs.targetHotels}
              min={50}
              max={5000}
              step={50}
              onChange={(v) => updateInput('targetHotels', v)}
            />
            <NumberField
              label="Hotels at start (existing)"
              value={inputs.hotelsAtStart}
              min={0}
              max={100}
              step={5}
              onChange={(v) => updateInput('hotelsAtStart', v)}
            />
            <SliderField
              label="Months to first revenue"
              value={inputs.monthsToFirstRevenue}
              min={0}
              max={12}
              step={1}
              format={(v) => `${v} months`}
              onChange={(v) => updateInput('monthsToFirstRevenue', v)}
            />
          </div>
          
          <div className="mt-4 space-y-1">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Revenue per Hotel</p>
            {(inputs.revenueModel === 'saas' || inputs.revenueModel === 'hybrid') && (
              <SliderField
                label="Monthly SaaS fee per property"
                value={inputs.monthlySubscription}
                min={inputs.revenueModel === 'hybrid' ? 25 : 50}
                max={inputs.revenueModel === 'hybrid' ? 250 : 500}
                step={25}
                format={(v) => `$${v}`}
                onChange={(v) => updateInput('monthlySubscription', v)}
              />
            )}
            {(inputs.revenueModel === 'commission' || inputs.revenueModel === 'hybrid') && (
              <SliderField
                label="Commission per booking"
                value={inputs.commissionPct}
                min={inputs.revenueModel === 'hybrid' ? 0.5 : 1}
                max={inputs.revenueModel === 'hybrid' ? 5 : 10}
                step={0.5}
                format={(v) => `${v}%`}
                onChange={(v) => updateInput('commissionPct', v)}
              />
            )}
            <SliderField
              label="Avg bookings/hotel/month"
              value={inputs.avgBookingsPerHotel}
              min={10}
              max={500}
              step={10}
              onChange={(v) => updateInput('avgBookingsPerHotel', v)}
            />
            <SliderField
              label="Avg booking value"
              value={inputs.avgBookingValue}
              min={100}
              max={1000}
              step={50}
              format={(v) => `$${v}`}
              onChange={(v) => updateInput('avgBookingValue', v)}
            />
            <SliderField
              label="Avg length of stay (nights)"
              value={inputs.avgLengthOfStay}
              min={1}
              max={14}
              step={1}
              format={(v) => `${v}`}
              onChange={(v) => updateInput('avgLengthOfStay', v)}
            />
          </div>
        </Section>

        {/* Other */}
        <Section title="Other Costs" icon={<Settings className="w-4 h-4" />}>
          <SliderField
            label="Legal & accounting"
            value={inputs.legalAccountingAnnual}
            min={10}
            max={200}
            step={5}
            format={(v) => `$${v}K/yr`}
            onChange={(v) => updateInput('legalAccountingAnnual', v)}
          />
          <SliderField
            label="Travel & events"
            value={inputs.travelEventsMonthly}
            min={0}
            max={40}
            step={1}
            format={(v) => `$${v}K/mo`}
            onChange={(v) => updateInput('travelEventsMonthly', v)}
          />
          <SliderField
            label="Contingency buffer"
            value={inputs.bufferPct}
            min={0}
            max={30}
            step={1}
            format={(v) => `${v}%`}
            onChange={(v) => updateInput('bufferPct', v)}
          />
        </Section>
      </div>
    </div>
    </>
  )
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-slate-400">{icon}</span>}
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
      <Separator className="mt-6" />
    </div>
  )
}

interface SliderFieldProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  format?: (value: number) => string
  onChange: (value: number) => void
}

function SliderField({ label, value, min, max, step = 1, format, onChange }: SliderFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs text-slate-500">{label}</label>
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          {format ? format(value) : value}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  )
}

interface NumberFieldProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}

function NumberField({ label, value, min, max, step = 1, onChange }: NumberFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-slate-500">{label}</label>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const val = parseInt(e.target.value) || min
          onChange(Math.max(min, Math.min(max, val)))
        }}
        className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
      />
    </div>
  )
}
