'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { ScaleHover } from '@/components/shared/Animations'

interface IndustryCardProps {
  title: string
  desc: string
  icon: LucideIcon
}

export function IndustryCard({ title, desc, icon: Icon }: IndustryCardProps) {
  return (
    <ScaleHover scale={1.03} className="h-full">
      <Card className="h-full border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group">
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
    </ScaleHover>
  )
}
