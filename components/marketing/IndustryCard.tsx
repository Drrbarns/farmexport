import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface IndustryCardProps {
  title: string
  desc: string
  icon: LucideIcon
}

export function IndustryCard({ title, desc, icon: Icon }: IndustryCardProps) {
  return (
    <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border-slate-200 hover:border-primary/20 bg-white">
      <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          {desc}
        </p>
      </CardContent>
    </Card>
  )
}




