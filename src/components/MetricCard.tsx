import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  className?: string
  valueClassName?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
}

export function MetricCard({ 
  title, 
  value, 
  subtitle,
  className,
  valueClassName,
  icon,
  trend = 'neutral'
}: MetricCardProps) {
  return (
    <Card className={cn(
      "bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow",
      className
    )}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide truncate">
              {title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className={cn(
                "text-lg sm:text-xl font-bold text-slate-900",
                valueClassName
              )}>
                {value}
              </p>
              {trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
              {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
            )}
          </div>
          {icon && (
            <div className="p-2 rounded-lg bg-slate-50 text-slate-500 shrink-0 ml-2">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
