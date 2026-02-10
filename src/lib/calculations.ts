import type { DashboardInputs, CalculatedMetrics, ScenarioData, CategoryData } from '@/types'

const OFFICE_COST_PER_SEAT: Record<string, number> = {
  fully_remote: 150,
  hybrid: 600,
  dedicated_office: 1200,
}

const CITY_MULTIPLIER: Record<string, number> = {
  'San Francisco': 1.35,
  'New York': 1.30,
  'London': 1.20,
  'Tel Aviv': 1.10,
  'Austin': 0.90,
  'Miami': 0.95,
  'Berlin': 0.85,
  'Lisbon': 0.75,
  'Remote (distributed)': 0.80,
}

export function calculateMetrics(inputs: DashboardInputs): CalculatedMetrics {
  const benefitsMultiplier = 1.25
  
  // Basic calculations
  const raiseDollars = inputs.raiseAmount * 1_000_000
  const totalHeadcount = inputs.nEngineers + inputs.nSalesBd + inputs.nProduct + inputs.nOps + inputs.founders
  
  // Payroll
  const monthlyPayroll = (
    inputs.nEngineers * inputs.salaryEng +
    inputs.nSalesBd * inputs.salarySales +
    inputs.nProduct * inputs.salaryProduct +
    inputs.nOps * inputs.salaryOps +
    inputs.founders * inputs.salaryFounder
  ) * 1000 / 12
  
  const monthlyPayrollLoaded = monthlyPayroll * benefitsMultiplier
  
  // Office
  const monthlyOffice = OFFICE_COST_PER_SEAT[inputs.officeChoice] * 
    totalHeadcount * 
    (CITY_MULTIPLIER[inputs.city] || 1.0)
  
  // Other costs
  const monthlyMarketing = inputs.marketingMonthly * 1000
  const monthlyInfra = inputs.infraMonthly * 1000
  const monthlyDevtools = inputs.devToolsMonthly * 1000
  const monthlyLegal = inputs.legalAccountingAnnual * 1000 / 12
  const monthlyTravel = inputs.travelEventsMonthly * 1000
  const monthlyOther = monthlyLegal + monthlyTravel
  
  // Burn
  const monthlyBurnBase = monthlyPayrollLoaded + monthlyOffice + monthlyMarketing + 
    monthlyInfra + monthlyDevtools + monthlyOther
  const monthlyBurn = monthlyBurnBase * (1 + inputs.bufferPct / 100)
  
  const annualBurn = monthlyBurn * 12
  const totalNeeded = monthlyBurn * inputs.runwayMonths
  const actualRunway = monthlyBurn > 0 ? raiseDollars / monthlyBurn : 0
  
  // Categories
  const catPeople = monthlyPayrollLoaded * 12
  const catOffice = monthlyOffice * 12
  const catMarketing = monthlyMarketing * 12
  const catDev = (monthlyInfra + monthlyDevtools) * 12
  const catOther = monthlyOther * 12
  const catBuffer = (monthlyBurn - monthlyBurnBase) * 12
  
  // Revenue projections
  const monthsArr = Array.from({ length: inputs.runwayMonths + 1 }, (_, i) => i)
  
  // Hotel ramp with sigmoid curve
  const hotelRamp = (month: number): number => {
    if (month < inputs.monthsToFirstRevenue) {
      return inputs.hotelsAtStart
    } else if (month >= inputs.runwayMonths) {
      return inputs.targetHotels
    } else {
      const progress = (month - inputs.monthsToFirstRevenue) / 
        (inputs.runwayMonths - inputs.monthsToFirstRevenue)
      const sigmoid = 1 / (1 + Math.exp(-10 * (progress - 0.5)))
      return Math.floor(inputs.hotelsAtStart + (inputs.targetHotels - inputs.hotelsAtStart) * sigmoid)
    }
  }
  
  const hotelsByMonth = monthsArr.map(hotelRamp)
  
  // Revenue calculation - split by source for time series
  const saasRevenueByMonth: number[] = []
  const commissionRevenueByMonth: number[] = []
  const monthlyRevenue = hotelsByMonth.map((hotels) => {
    const saasRevenue = hotels * inputs.monthlySubscription
    const commissionRevenue = hotels * inputs.avgBookingsPerHotel * inputs.avgBookingValue *
      inputs.avgLengthOfStay * (inputs.commissionPct / 100)
    saasRevenueByMonth.push(saasRevenue)
    commissionRevenueByMonth.push(commissionRevenue)
    return saasRevenue + commissionRevenue
  })
  
  const cumulativeRevenue = monthlyRevenue.reduce((acc, val, i) => {
    acc.push((acc[i - 1] || 0) + val)
    return acc
  }, [] as number[])
  
  // Annual projections
  const annualSaas = inputs.targetHotels * inputs.monthlySubscription * 12
  const annualCommission = inputs.targetHotels * inputs.avgBookingsPerHotel * inputs.avgBookingValue *
    inputs.avgLengthOfStay * (inputs.commissionPct / 100) * 12
  const totalAnnualRevenue = annualSaas + annualCommission
  
  const finalHotels = hotelsByMonth[hotelsByMonth.length - 1]
  const arr = finalHotels * inputs.monthlySubscription * 12 +
    finalHotels * inputs.avgBookingsPerHotel * inputs.avgBookingValue * inputs.avgLengthOfStay * (inputs.commissionPct / 100) * 12
  
  const avgMonthlyRevenuePerHotel = inputs.monthlySubscription +
    inputs.avgBookingsPerHotel * inputs.avgBookingValue * inputs.avgLengthOfStay * (inputs.commissionPct / 100)
  
  // Analysis
  const peoplePct = annualBurn > 0 ? (catPeople / annualBurn) * 100 : 0
  const engRatio = totalHeadcount > 0 ? (inputs.nEngineers / totalHeadcount) * 100 : 0
  const marketingPct = annualBurn > 0 ? (catMarketing / annualBurn) * 100 : 0
  
  // Breakeven
  let breakevenMonth: number | null = null
  for (let i = 0; i < monthlyRevenue.length; i++) {
    if (monthlyRevenue[i] >= monthlyBurn) {
      breakevenMonth = i
      break
    }
  }
  
  return {
    raiseDollars,
    monthlyPayroll,
    monthlyPayrollLoaded,
    monthlyOffice,
    monthlyMarketing,
    monthlyInfra,
    monthlyDevtools,
    monthlyLegal,
    monthlyTravel,
    monthlyOther,
    monthlyBurnBase,
    monthlyBurn,
    annualBurn,
    totalNeeded,
    actualRunway,
    totalHeadcount,
    catPeople,
    catOffice,
    catMarketing,
    catDev,
    catOther,
    catBuffer,
    hotelsByMonth,
    monthlyRevenue,
    cumulativeRevenue,
    saasRevenueByMonth,
    commissionRevenueByMonth,
    annualSaas,
    annualCommission,
    totalAnnualRevenue,
    arr,
    avgMonthlyRevenuePerHotel,
    peoplePct,
    engRatio,
    marketingPct,
    breakevenMonth,
  }
}

export function getCategoryData(metrics: CalculatedMetrics): CategoryData[] {
  return [
    { name: 'People (salaries + benefits)', value: metrics.catPeople, color: '#64ffda' },
    { name: 'Office & Location', value: metrics.catOffice, color: '#58a6ff' },
    { name: 'Marketing & Growth', value: metrics.catMarketing, color: '#f78166' },
    { name: 'Dev & Infrastructure', value: metrics.catDev, color: '#d2a8ff' },
    { name: 'Legal / Travel / Other', value: metrics.catOther, color: '#8b949e' },
    { name: 'Contingency Buffer', value: metrics.catBuffer, color: '#ffa657' },
  ]
}

export function getScenarios(monthlyBurn: number): ScenarioData[] {
  const amounts = [3, 4, 5, 6, 8, 10]
  return amounts.map(amt => {
    const runway = monthlyBurn > 0 ? (amt * 1_000_000) / monthlyBurn : 0
    return {
      raiseAmount: amt,
      monthlyBurn,
      runway,
      runwayYears: runway / 12,
      enough18: runway >= 18,
      enough24: runway >= 24,
    }
  })
}

export function getRunwaySensitivity(
  raiseDollars: number, 
  monthlyBurn: number, 
  currentHeadcount: number
): { size: number; runway: number }[] {
  const sizes = Array.from({ length: 25 }, (_, i) => i + 5)
  return sizes.map(sz => {
    const ratio = currentHeadcount > 0 ? sz / currentHeadcount : 1
    const scaledBurn = monthlyBurn * ratio
    const runway = scaledBurn > 0 ? raiseDollars / scaledBurn : 0
    return { size: sz, runway }
  })
}
