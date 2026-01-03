import { ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function LatestInsights() {
  const posts = [
    {
      title: "How to Choose a Reliable Unrefined Shea Butter Supplier",
      excerpt: "Key quality indicators and certifications to look for when sourcing shea butter from Ghana.",
      date: "Oct 12, 2025",
      category: "Sourcing Guide",
      slug: "choose-reliable-supplier",
      image: "/images/shea-butter.png"
    },
    {
      title: "Shea Oil vs Shea Butter: Applications for Skincare Brands",
      excerpt: "Understanding the formulation differences and benefits of fractionation.",
      date: "Sep 28, 2025",
      category: "Product Knowledge",
      slug: "shea-oil-vs-butter",
      image: "/images/shea-oil.png"
    },
    {
      title: "Global Market Trends for Baobab Oil in 2026",
      excerpt: "Why cosmetic giants are turning to this African super-oil for anti-aging products.",
      date: "Sep 15, 2025",
      category: "Market Trends",
      slug: "baobab-market-trends",
      image: "/images/baobab-oil.png"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      {posts.map((post, i) => (
        <Link key={i} href={`/blog/${post.slug}`} className="group block h-full">
          <Card className="h-full border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm border-none shadow-sm font-medium">
                  {post.category}
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
                <Calendar className="h-3.5 w-3.5" /> 
                <span>{post.date}</span>
              </div>
              
              <CardTitle className="text-lg font-bold leading-snug text-slate-900 group-hover:text-primary transition-colors mb-3 line-clamp-2">
                {post.title}
              </CardTitle>
              
              <p className="text-sm text-slate-500 line-clamp-3 mb-4 leading-relaxed flex-1">
                {post.excerpt}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-100">
                <span className="text-sm font-semibold text-primary flex items-center">
                  Read Article <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}



