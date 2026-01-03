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
  }
}

export function ProductCard({ product }: ProductCardProps) {
  // Determine image based on slug for demo purposes
  const imageSrc = product.slug.includes('shea') 
    ? (product.slug.includes('oil') ? 'shea-oil.jpg' : 'shea-butter.jpg') 
    : (product.slug.includes('soy') ? 'soybean.jpg' : 'baobab.jpg')

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 overflow-hidden border border-border hover:border-primary/50">
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          <img 
            src={`/images/${imageSrc}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23F1F5F9' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='16' fill='%2364748B'%3E" + product.name + "%3C/text%3E%3C/svg%3E"
            }}
          />
          <Badge className="absolute top-3 right-3 bg-primary text-white">
            Export Grade
          </Badge>
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-4 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.short_desc}
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Grade A, Unrefined</li>
            <li>• Low Moisture Content</li>
            <li>• Export Documentation Available</li>
          </ul>
        </CardContent>
        <CardFooter className="pt-0 pb-6 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Specs <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
