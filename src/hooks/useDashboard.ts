import { useState, useMemo } from 'react'
import type { DashboardInputs } from '@/types'
import { calculateMetrics } from '@/lib/calculations'

const defaultInputs: DashboardInputs = {
  raiseAmount: 5,
  runwayMonths: 24,
  
  nEngineers: 2,
  nSalesBd: 0,
  nProduct: 1,
  nOps: 0,
  founders: 2,
  
  salaryEng: 250,
  salarySales: 110,
  salaryProduct: 170,
  salaryOps: 90,
  salaryFounder: 200,
  
  officeChoice: 'hybrid',
  city: 'San Francisco',
  
  marketingMonthly: 25,
  
  infraMonthly: 10,
  devToolsMonthly: 3,
  
  revenueModel: 'hybrid',
  targetHotels: 3500,
  hotelsAtStart: 5,
  monthsToFirstRevenue: 3,
  monthlySubscription: 100,
  commissionPct: 2,
  avgBookingsPerHotel: 30,
  avgBookingValue: 300,
  
  legalAccountingAnnual: 50,
  travelEventsMonthly: 8,
  bufferPct: 15,
}

export function useDashboard() {
  const [inputs, setInputs] = useState<DashboardInputs>(defaultInputs)
  
  const metrics = useMemo(() => calculateMetrics(inputs), [inputs])
  
  const updateInput = <K extends keyof DashboardInputs>(
    key: K,
    value: DashboardInputs[K]
  ) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }
  
  return {
    inputs,
    metrics,
    updateInput,
  }
}
