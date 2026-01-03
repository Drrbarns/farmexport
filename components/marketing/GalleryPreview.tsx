import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function GalleryPreview() {
  const items = [
    {
      id: 1,
      src: '/images/hero-1.png',
      title: 'Sustainable Harvesting',
      category: 'Sourcing'
    },
    {
      id: 2,
      src: '/images/shea-butter.png',
      title: 'Premium Processing',
      category: 'Production'
    },
    {
      id: 3,
      src: '/images/hero-2.png',
      title: 'Global Logistics',
      category: 'Export'
    },
    {
      id: 4,
      src: '/images/hero-3.png',
      title: 'Quality Inspection',
      category: 'Quality Control'
    }
  ]

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            
            <div className="p-5">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                {item.category}
              </p>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button size="lg" variant="outline" className="border-slate-300 hover:bg-slate-50 min-w-[200px] h-12 rounded-full font-medium" asChild>
          <Link href="/gallery">
            View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}