import { createClient } from '@/lib/supabase/server'
import { RFQForm } from '@/components/public/RFQForm'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import Image from 'next/image'
import * as motion from "framer-motion/client"

export const revalidate = 0

export default async function RFQPage({ searchParams }: { searchParams: { product?: string } }) {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('id, name')
    .eq('is_active', true)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rfq-hero-bg.png"
            alt="Request For Quotation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Request a <span className="text-primary-foreground">Quote</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              Tell us your requirements and we will provide a competitive wholesale quote within 24 hours.
            </motion.p>
          </div>
        </Container>
      </section>

      <Section spacing="loose" className="bg-background">
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-card p-6 md:p-10 rounded-2xl shadow-lg border"
          >
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Detailed Specifications</h2>
              <p className="text-muted-foreground">Please fill out the form below with your order details.</p>
            </div>
            <RFQForm products={products || []} />
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
