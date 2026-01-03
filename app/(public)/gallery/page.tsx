import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import Image from 'next/image'
import * as motion from "framer-motion/client"

export const revalidate = 0

export default async function GalleryPage() {
  const supabase = await createClient()

  const { data: items } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery-hero-bg.png"
            alt="Farm and Production Gallery"
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
                Our Story in <br />
                <span className="text-primary-foreground/90">Pictures.</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              A glimpse into our production facilities, packaging, and high-quality products.
            </motion.p>
          </div>
        </Container>
      </section>

      <Section spacing="loose">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items?.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-muted-foreground text-lg">No images available yet.</p>
              </div>
            ) : (
              items?.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden group h-full border-none shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[4/3] relative bg-muted grayscale group-hover:grayscale-0 transition-all duration-500">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.title || 'Gallery Image'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-slate-100">
                          <span className="opacity-50">Image Unavailable</span>
                        </div>
                      )}
                    </div>
                    {item.caption && (
                      <div className="p-5 bg-card">
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.caption}</p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </Container>
      </Section>
    </div>
  )
}
