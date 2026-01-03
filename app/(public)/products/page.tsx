import { createClient } from '@/lib/supabase/server'
import { ProductCard } from '@/components/marketing/ProductCard'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Image from 'next/image'
import * as motion from "framer-motion/client"

export const revalidate = 0

export default async function ProductsPage() {
  const defaultProducts: any[] = [
    {
      id: '1',
      name: 'Unrefined (Grade A) Shea Butter',
      slug: 'unrefined-shea-butter-grade-a',
      short_desc: 'Premium Grade A unrefined shea butter, sourced directly from African women cooperatives.',
      spec_sheets: []
    },
    {
      id: '2',
      name: 'Shea Butter Oil',
      slug: 'shea-butter-oil',
      short_desc: 'Pure, unrefined shea oil extracted from premium shea nuts.',
      spec_sheets: []
    },
    {
      id: '3',
      name: 'Premium Grade Soybean',
      slug: 'premium-grade-soybean',
      short_desc: 'High-quality, non-GMO soybeans suitable for food processing and industrial use.',
      spec_sheets: []
    },
    {
      id: '4',
      name: 'Cashew Nut',
      slug: 'cashew-nut',
      short_desc: 'Raw cashew nuts sourced from high-yield farms in Ghana and West Africa.',
      spec_sheets: []
    },
    {
      id: '5',
      name: 'Yellow Corn (Maize)',
      slug: 'yellow-corn',
      short_desc: 'Sun-dried yellow corn, rich in nutrients, suitable for animal feed and human consumption.',
      spec_sheets: []
    },
    {
      id: '6',
      name: 'Unrefined Salt',
      slug: 'unrefined-salt',
      short_desc: 'Natural, unrefined sea salt harvested from the coast, rich in essential minerals.',
      spec_sheets: []
    },
    {
      id: '7',
      name: 'Chili Dry Pepper',
      slug: 'chili-dry-pepper',
      short_desc: 'Spicy, sun-dried chili peppers, perfect for culinary and industrial applications.',
      spec_sheets: []
    },
    {
      id: '8',
      name: 'Peanuts (Groundnuts)',
      slug: 'peanuts-groundnuts',
      short_desc: 'Organic shelled and unshelled peanuts, high in protein and oil content.',
      spec_sheets: []
    }
  ]

  let products = defaultProducts;

  try {
    const supabase = await createClient()
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('*, spec_sheets(file_url)')
      .eq('is_active', true)
      .order('created_at', { ascending: true })

    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts
    }
  } catch (e) {
    console.log("Using default products due to DB error")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/products-hero-bg.png"
            alt="Premium Agricultural Products"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                Nature's Finest, <br />
                <span className="text-primary-foreground/90">Harvested for You.</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              Grade A, unrefined agricultural products sourced directly from African farmers. Export-ready with full documentation support.
            </motion.p>
          </div>
        </Container>
      </section>

      <Section spacing="loose">
        <Container>
          {/* Filters UI */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 h-12 text-lg bg-background shadow-sm border-muted focus:border-primary"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 w-full md:w-auto">
              <Button variant="outline" className="shrink-0">Category: All</Button>
              <Button variant="outline" className="shrink-0">Sort: Newest</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="muted" className="py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 px-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Don't see what you're looking for?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We can source specific agricultural commodities upon request. Contact our export team to discuss your custom requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="px-8 py-6 text-lg">
              <Link href="/contact">Contact Export Team</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-8 py-6 text-lg">
              <Link href="/rfq">Submit RFQ</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
