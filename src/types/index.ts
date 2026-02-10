export interface DashboardInputs {
  // Raise parameters
  raiseAmount: number
  runwayMonths: number

  // Team
  nEngineers: number
  nSalesBd: number
  nProduct: number
  nOps: number
  founders: number

  // Salaries
  salaryEng: number
  salarySales: number
  salaryProduct: number
  salaryOps: number
  salaryFounder: number

  // Office
  officeChoice: 'fully_remote' | 'hybrid' | 'dedicated_office'
  city: string

  // Marketing
  marketingMonthly: number

  // Infra
  infraMonthly: number
  devToolsMonthly: number

  // Revenue model
  revenueModel: 'saas' | 'commission' | 'hybrid'
  targetHotels: number
  hotelsAtStart: number
  monthsToFirstRevenue: number
  monthlySubscription: number
  commissionPct: number
  avgBookingsPerHotel: number
  avgBookingValue: number
  avgLengthOfStay: number

  // Other
  legalAccountingAnnual: number
  travelEventsMonthly: number
  bufferPct: number
}

export interface CalculatedMetrics {
  // Basic metrics
  raiseDollars: number
  monthlyPayroll: number
  monthlyPayrollLoaded: number
  monthlyOffice: number
  monthlyMarketing: number
  monthlyInfra: number
  monthlyDevtools: number
  monthlyLegal: number
  monthlyTravel: number
  monthlyOther: number
  monthlyBurnBase: number
  monthlyBurn: number
  annualBurn: number
  totalNeeded: number
  actualRunway: number
  totalHeadcount: number

  // Categories
  catPeople: number
  catOffice: number
  catMarketing: number
  catDev: number
  catOther: number
  catBuffer: number

  // Revenue
  hotelsByMonth: number[]
  monthlyRevenue: number[]
  cumulativeRevenue: number[]
  saasRevenueByMonth: number[]
  commissionRevenueByMonth: number[]
  annualSaas: number
  annualCommission: number
  totalAnnualRevenue: number
  arr: number
  avgMonthlyRevenuePerHotel: number

  // Analysis
  peoplePct: number
  engRatio: number
  marketingPct: number
  breakevenMonth: number | null
}

export interface CategoryData {
  name: string
  value: number
  color: string
}

export interface ScenarioData {
  raiseAmount: number
  monthlyBurn: number
  runway: number
  runwayYears: number
  enough18: boolean
  enough24: boolean
}

export type RecommendationType = 'success' | 'warning' | 'info'

export interface Recommendation {
  type: RecommendationType
  title: string
  message: string
}
