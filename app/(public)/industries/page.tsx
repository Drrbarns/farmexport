import { createClient } from '@/lib/supabase/server'
import { Beaker, ChefHat, Leaf, Pill, Award, Microscope, Globe2, Truck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import * as motion from "framer-motion/client"

export const revalidate = 0

export default async function IndustriesPage() {
  const supabase = await createClient()

  const { data: section } = await supabase
    .from('page_sections')
    .select('content')
    .eq('page_key', 'industries')
    .single()

  const sectors = [
    {
      title: "Cosmetics & Personal Care",
      desc: "We supply premium, unrefined shea butter and oils that serve as the foundation for the world's leading beauty brands. Our ingredients are rich in vitamins A, E, and F, offering exceptional moisturizing and healing properties.",
      benefits: ["100% Organic & Unrefined", "High Vitamin Content", "Ethically Sourced"],
      image: "/images/industry-cosmetics.png",
      icon: Beaker
    },
    {
      title: "Food & Beverage",
      desc: "From non-GMO soybeans to organic seeds, we provide food manufacturers with wholesome, traceable ingredients. Our rigorous quality control ensures purity and safety for consumers.",
      benefits: ["Non-GMO Certified", "Full Traceability", "Food Safety Compliant"],
      image: "/images/industry-food.png",
      icon: ChefHat
    },
    {
      title: "Pharmaceuticals",
      desc: "Our pharmaceutical-grade raw materials meet the highest standards of purity. We understand the critical nature of supply chain consistency for medicinal applications.",
      benefits: ["USP/BP Grade Available", "COA Provided", "Strict Lab Testing"],
      image: "/images/industry-pharma.png",
      icon: Pill
    },
    {
      title: "Animal Feed",
      desc: "We provide high-protein agricultural by-products essential for livestock health and growth. Our sustainable sourcing supports the global feed industry with reliable bulk supplies.",
      benefits: ["High Protein Content", "Mycotoxin Free", "Bulk Availability"],
      image: "/images/industry-feed.png",
      icon: Leaf
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/industries-hero-bg.png"
            alt="Diverse Industries"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
              Fueling Global <br />
              <span className="text-primary-foreground">Innovation.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              Delivering premium agricultural ingredients that power the world's most essential industries.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Intro Stats/Features */}
      <section className="py-12 bg-muted/30 border-b">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, label: "Premium Quality", sub: "ISO Certified" },
              { icon: Microscope, label: "Lab Tested", sub: "Rigorous Analysis" },
              { icon: Globe2, label: "Global Reach", sub: "Export Ready" },
              { icon: Truck, label: "Reliable Supply", sub: "Consistent Volume" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-full text-primary ring-1 ring-primary/20">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Sectors */}
      <Section spacing="loose">
        <div className="space-y-24">
          {sectors.map((sector, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                  <Image
                    src={sector.image}
                    alt={sector.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 text-white grid gap-1">
                    <span className="text-sm font-medium uppercase tracking-wider bg-primary/90 px-3 py-1 rounded w-fit">
                      Sector Focus
                    </span>
                    <span className="text-xl font-bold">{sector.title}</span>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <sector.icon className="w-6 h-6" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {sector.title}
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {sector.desc}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="font-semibold text-foreground">Key Advantages:</h4>
                  <ul className="grid gap-2">
                    {sector.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-center text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/products">View Products for {sector.title.split(' ')[0]}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-grid.png')] opacity-10" />
        <Container className="relative z-10 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Need a Custom Solution?</h2>
          <p className="text-xl max-w-2xl mx-auto text-primary-foreground/80">
            We work directly with manufacturers to develop supply chains that meet specific technical requirements.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="text-primary font-bold">
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/rfq">Request Samples</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
