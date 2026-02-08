import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Lightbulb,
  Shield
} from 'lucide-react'
import type { DashboardInputs, CalculatedMetrics, Recommendation } from '@/types'

interface RecommendationsProps {
  inputs: DashboardInputs
  metrics: CalculatedMetrics
}

function generateRecommendations(inputs: DashboardInputs, metrics: CalculatedMetrics): Recommendation[] {
  const recs: Recommendation[] = []
  
  // Runway recommendation
  if (metrics.actualRunway < 18) {
    recs.push({
      type: 'warning',
      title: 'Short Runway',
      message: `Runway is under 18 months. Most seed/A-stage startups need 18-24 months to hit next milestones. Either raise more or cut burn. You'll be fundraising again in ~12 months which is distracting.`
    })
  } else if (metrics.actualRunway < 24) {
    recs.push({
      type: 'info',
      title: 'Acceptable Runway',
      message: `Runway of ${metrics.actualRunway.toFixed(0)} months is acceptable but tight. Aim for 24 months so you have buffer for slow quarters.`
    })
  } else {
    recs.push({
      type: 'success',
      title: 'Strong Runway',
      message: `Runway of ${metrics.actualRunway.toFixed(0)} months is strong. This gives you room to iterate without fundraising pressure.`
    })
  }
  
  // People costs
  if (metrics.peoplePct > 75) {
    recs.push({
      type: 'warning',
      title: 'High People Costs',
      message: `People costs are ${metrics.peoplePct.toFixed(0)}% of burn. That's very high. Consider if all roles are Day 1 hires or if some can be phased in at months 6-12.`
    })
  } else if (metrics.peoplePct > 60) {
    recs.push({
      type: 'success',
      title: 'Healthy People Allocation',
      message: `People costs are ${metrics.peoplePct.toFixed(0)}% of burn – normal for a seed-stage startup. Talent is your main asset.`
    })
  }
  
  // Engineering ratio
  if (metrics.engRatio < 40) {
    recs.push({
      type: 'warning',
      title: 'Low Engineering Ratio',
      message: `Engineering is only ${metrics.engRatio.toFixed(0)}% of team. For a technical infrastructure product (MCP integrations, PMS connectors, real-time availability), you likely need 50-60% engineers at this stage.`
    })
  } else {
    recs.push({
      type: 'success',
      title: 'Good Engineering Ratio',
      message: `Engineering is ${metrics.engRatio.toFixed(0)}% of team – good ratio for a technical product. Prioritize: MCP protocol layer, PMS integrations, booking engine reliability.`
    })
  }
  
  // Marketing
  if (metrics.marketingPct > 25) {
    recs.push({
      type: 'warning',
      title: 'High Marketing Spend',
      message: `Marketing is ${metrics.marketingPct.toFixed(0)}% of spend. At seed stage, Sigtrip's growth should be mostly BD-driven (direct hotel outreach + AI platform partnerships), not paid marketing.`
    })
  } else if (metrics.marketingPct < 5 && inputs.marketingMonthly > 0) {
    recs.push({
      type: 'success',
      title: 'Lean Marketing',
      message: `Marketing budget is lean. That's fine if your GTM is partnership-driven. Allocate toward travel industry conferences (Phocuswright, HITEC) and developer relations for MCP adoption.`
    })
  }
  
  // Strategic recommendations
  recs.push({
    type: 'info',
    title: 'Hire PMS Integration Lead',
    message: 'Your core moat is connecting hotel property management systems (Opera, Mews, Cloudbeds, etc.) to AI platforms. One senior engineer focused solely on PMS connectors will accelerate onboarding.'
  })
  
  recs.push({
    type: 'info',
    title: 'Focus on Key Chains',
    message: 'Prioritize 3-5 hotel chains for launch. Rather than spreading thin, get deep integrations with a few mid-size chains (100-500 properties each) to prove the model before scaling.'
  })
  
  recs.push({
    type: 'info',
    title: 'Race Against OTAs',
    message: 'Booking.com and Expedia are also building AI layers. Your pitch to investors should emphasize speed-to-market: whoever becomes the default booking layer in ChatGPT/Claude wins. This justifies a larger raise.'
  })
  
  // Revenue model
  const modelDesc = inputs.revenueModel === 'hybrid' 
    ? `SaaS $${inputs.monthlySubscription}/mo + ${inputs.commissionPct}% per booking`
    : inputs.revenueModel === 'saas'
    ? `SaaS $${inputs.monthlySubscription}/mo per property`
    : `${inputs.commissionPct}% commission per booking`
    
  recs.push({
    type: 'success',
    title: 'Revenue Model Clarity',
    message: `Current model: ${modelDesc}. At ${inputs.targetHotels} hotels: $${(metrics.totalAnnualRevenue / 1e6).toFixed(2)}M ARR potential. This is significantly lower than OTA 15-25% commissions, creating clear value for hotels.`
  })
  
  // Hotel target
  if (inputs.targetHotels < 100) {
    recs.push({
      type: 'warning',
      title: 'Conservative Hotel Target',
      message: `Target of ${inputs.targetHotels} hotels may be too conservative. With MCP standardization (USB-C for AI), hotels need distribution partners. Aim higher—each PMS integration unlocks thousands of properties.`
    })
  }
  
  // Commission warning
  if (inputs.commissionPct > 5) {
    recs.push({
      type: 'warning',
      title: 'High Commission Rate',
      message: `${inputs.commissionPct}% commission approaches OTA levels (15-25%). Your value prop is lower customer acquisition cost. Keep commissions under 5% to maintain competitive advantage vs Booking.com/Expedia.`
    })
  }
  
  // Unit economics
  if (metrics.avgMonthlyRevenuePerHotel < 100) {
    recs.push({
      type: 'warning',
      title: 'Low Revenue per Hotel',
      message: `Low revenue per hotel ($${metrics.avgMonthlyRevenuePerHotel.toFixed(0)}/mo). Need scale (>1000 hotels) to reach meaningful ARR. Consider value-add services: dynamic pricing, guest messaging, loyalty integration.`
    })
  } else {
    recs.push({
      type: 'success',
      title: 'Strong Unit Economics',
      message: `Strong unit economics: $${metrics.avgMonthlyRevenuePerHotel.toFixed(0)} monthly revenue per hotel. At ${inputs.targetHotels} hotels, that's $${(metrics.avgMonthlyRevenuePerHotel * inputs.targetHotels / 1e3).toFixed(0)}K MRR potential.`
    })
  }
  
  // Breakeven
  if (metrics.breakevenMonth !== null) {
    recs.push({
      type: 'success',
      title: 'Path to Breakeven',
      message: `Breakeven projection: Month ${metrics.breakevenMonth}. With ${metrics.hotelsByMonth[metrics.breakevenMonth]} hotels generating $${metrics.monthlyRevenue[metrics.breakevenMonth].toLocaleString()}/mo, you cover $${metrics.monthlyBurn.toLocaleString()} burn. Focus on hitting this milestone for Series A narrative.`
    })
  } else {
    recs.push({
      type: 'warning',
      title: 'No Breakeven in Runway',
      message: `Revenue doesn't cover burn by end of runway. You'll need to raise again before profitability. Consider: (1) higher SaaS fees, (2) faster hotel acquisition, or (3) larger raise.`
    })
  }
  
  return recs
}

const questions = [
  {
    question: "What is your current MRR / ARR?",
    answer: "If pre-revenue, investors will value team + TAM + speed. If you have even $5-10K MRR from pilot hotels, that dramatically improves valuation and terms."
  },
  {
    question: "How many PMS integrations do you have live?",
    answer: "Each PMS integration (Opera, Mews, Cloudbeds, Guesty, etc.) unlocks thousands of properties. Investors will measure progress in integrations, not just hotel count."
  },
  {
    question: "What's your relationship with AI platforms?",
    answer: "Do you have a partnership or early access with OpenAI, Anthropic, Google, or Perplexity? Being an approved MCP provider for Claude or a ChatGPT plugin partner is a massive signal."
  },
  {
    question: "What's the competitive landscape?",
    answer: "Are OTAs already doing this? Is there a direct competitor? If Booking.com launches an MCP connector tomorrow, what's your moat? (Answer: direct hotel relationships + lower commissions + hotel data ownership.)"
  },
  {
    question: "Raise $3M or $8M – what changes?",
    answer: "$3M = lean team (~8 people), 18-month runway, prove PMF with 50-100 hotels. $8M = full team (~15 people), 24-month runway, aim for 500+ hotels and establish as the default layer. The question is: how fast are OTAs moving?"
  },
  {
    question: "What milestones unlock the next round?",
    answer: "Define clear Series A triggers: X hotels live, Y bookings/month, Z MRR. Work backward from those to determine how much capital you need."
  },
  {
    question: "Remote vs. hub – what's the talent strategy?",
    answer: "PMS integration engineers are niche (hospitality tech experience). They may not be in SF. Consider a remote-first model with quarterly offsites."
  },
]

export function Recommendations({ inputs, metrics }: RecommendationsProps) {
  const recommendations = generateRecommendations(inputs, metrics)
  
  return (
    <div className="space-y-6">
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <CardTitle className="text-lg font-semibold text-slate-900">Recommendations for Sigtrip</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          {recommendations.map((rec, i) => (
            <div 
              key={i}
              className={`p-4 rounded-xl border-l-4 ${
                rec.type === 'success' 
                  ? 'bg-emerald-50 border-emerald-500' 
                  : rec.type === 'warning'
                  ? 'bg-amber-50 border-amber-500'
                  : 'bg-blue-50 border-blue-500'
              }`}
            >
              <div className="flex items-start gap-3">
                {rec.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />}
                {rec.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />}
                {rec.type === 'info' && <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />}
                <div>
                  <h4 className={`font-semibold text-sm ${
                    rec.type === 'success' 
                      ? 'text-emerald-800' 
                      : rec.type === 'warning'
                      ? 'text-amber-800'
                      : 'text-blue-800'
                  }`}>
                    {rec.title}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{rec.message}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-lg font-semibold text-slate-900">Key Questions to Answer Before Raising</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Accordion type="single" collapsible className="w-full">
            {questions.map((q, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-slate-100">
                <AccordionTrigger className="text-sm text-slate-700 hover:text-slate-900 font-medium py-4">
                  {q.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-500 leading-relaxed pb-4">
                  {q.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
