import { createClient } from '@/lib/supabase/server'
import { Anchor, ClipboardCheck, Globe, PackageCheck, Plane, Ship, Container as ContainerIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import Link from 'next/link'
import Image from 'next/image'
import * as motion from "framer-motion/client"

export const revalidate = 0

export default async function ExportReadinessPage() {
  const supabase = await createClient()

  const { data: section } = await supabase
    .from('page_sections')
    .select('content')
    .eq('page_key', 'export_readiness')
    .single()

  const content = section?.content as any || {
    shipping_methods: ["Sea Freight (FCL/LCL)", "Air Freight", "Express Courier"],
    incoterms: ["EXW", "FOB", "CIF"],
    ports: ["Tema Port, Ghana"],
    quality_assurance: 'All products undergo rigorous testing before shipment.'
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/export-ready-hero-bg.png"
            alt="Global Logistics"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                Seamless Logistics, <br />
                <span className="text-primary-foreground/90">Global Reach.</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              We handle the complexities of international trade so you can focus on your business. From documentation to logistics, we are fully export-ready.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="lg" className="px-8 py-6 text-lg rounded-full" asChild>
                <Link href="/rfq">Request a Quote</Link>
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      <Section spacing="loose">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <ContainerIcon className="mr-3 h-7 w-7 text-primary" /> Shipping Methods
              </h2>
              <div className="space-y-4">
                {content.shipping_methods?.map((item: string, i: number) => (
                  <div key={i} className="flex items-center p-4 bg-muted/30 rounded-xl border group hover:border-primary transition-colors">
                    <div className="h-10 w-10 bg-background rounded-full flex items-center justify-center border shadow-sm mr-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {i === 0 ? <Ship className="h-5 w-5" /> : (i === 1 ? <Plane className="h-5 w-5" /> : <PackageCheck className="h-5 w-5" />)}
                    </div>
                    <span className="font-semibold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Globe className="mr-3 h-7 w-7 text-primary" /> Supported Incoterms
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {content.incoterms?.map((item: string, i: number) => (
                  <div key={i} className="flex flex-col items-center justify-center p-6 bg-slate-900 text-white rounded-2xl hover:bg-primary transition-colors cursor-default shadow-lg">
                    <span className="text-2xl font-bold tracking-tight">{item.split(' ')[0]}</span>
                    <span className="text-xs text-slate-300 mt-1 text-center font-medium">{item.split('(')[1]?.replace(')', '')}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Anchor className="mr-3 h-7 w-7 text-primary" /> Ports of Loading
              </h2>
              <ul className="space-y-4 mb-12">
                {content.ports?.map((item: string, i: number) => (
                  <li key={i} className="flex items-center p-4 bg-muted/30 rounded-xl border">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-4 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <span className="font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-dashed">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <ClipboardCheck className="mr-3 h-7 w-7 text-primary" /> Quality Assurance
                </h2>
                <div className="text-lg leading-relaxed text-muted-foreground space-y-6">
                  <p>{content.quality_assurance}</p>
                  <div className="flex flex-wrap gap-2">
                    {['Phytosanitary Cert', 'Certificate of Origin', 'COA / MSDS', 'Commercial Invoice', 'Packing List'].map((doc, i) => (
                      <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
