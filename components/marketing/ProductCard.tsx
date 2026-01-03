import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Download } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    short_desc: string | null
    spec_sheets?: { file_url: string }[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  // Determine image based on slug
  const imageSrc = (() => {
    if (product.slug.includes('shea') && product.slug.includes('oil')) return 'shea-oil.png'
    if (product.slug.includes('shea')) return 'shea-butter.png'
    if (product.slug.includes('soy')) return 'soybean.png'
    if (product.slug.includes('baobab')) return 'baobab-oil.png'
    if (product.slug.includes('cashew')) return 'cashew.png'
    return 'ginger.png' // Fallback or ginger
  })()

  const hasSpecSheet = product.spec_sheets && product.spec_sheets.length > 0;

  return (
    <Card className="flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-slate-200 hover:border-primary/20 group bg-white">
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] bg-slate-50 overflow-hidden">
        <img
          src={`/images/${imageSrc}`}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <Badge className="absolute top-3 right-3 bg-white/90 text-primary hover:bg-white backdrop-blur-sm shadow-sm font-medium border border-slate-100">
          Export Grade
        </Badge>
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3">
          <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors block">
            <h3 className="font-bold text-lg leading-tight text-slate-900 mb-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {product.short_desc}
          </p>
        </div>

        <div className="mt-auto space-y-4">
          <div className="space-y-2 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              Grade A, Unrefined
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              Low Moisture Content
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              MOQ: Negotiable
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" className="flex-1 h-9 text-xs font-semibold hover:bg-primary hover:text-white transition-colors border-slate-200" asChild>
              <Link href={`/products/${product.slug}`}>
                View Specs
              </Link>
            </Button>
            {hasSpecSheet && (
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-slate-400 hover:text-primary hover:bg-primary/5" title="Download Spec Sheet">
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

