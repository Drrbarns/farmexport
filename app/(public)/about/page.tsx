import { createClient } from '@/lib/supabase/server'
import { CheckCircle2, Globe, Heart, Sprout, Users, Target, Eye, BadgeCheck, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import Link from 'next/link'
import * as motion from "framer-motion/client"
import Image from 'next/image'

export const revalidate = 0

export default async function AboutPage() {
  const supabase = await createClient()

  const { data: section } = await supabase
    .from('page_sections')
    .select('content')
    .eq('page_key', 'about')
    .single()

  const content = section?.content as any || {
    mission: 'To bridge the gap between African farmers and global markets through ethical sourcing and quality assurance.',
    vision: 'To be the leading agricultural exporter from Africa, known for reliability, quality, and sustainable practices.',
    story: 'Founded in Accra, Ghana, Africma\'s & Dakeb Farm LTD was established to connect local farming communities across Africa with international buyers seeking premium, unrefined agricultural products. We work directly with over 500 farmers across the continent to source Grade A shea butter, shea oil, soybean, and baobab oil.'
  }

  const stats = [
    { label: "Partner Farmers", value: "500+", icon: Users },
    { label: "Export Destinations", value: "15+", icon: Globe },
    { label: "Tons Exported", value: "2000+", icon: Sprout },
    { label: "Communities Impacted", value: "10+", icon: Heart },
  ]

  const values = [
    {
      title: "Our Mission",
      description: content.mission,
      icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Our Vision",
      description: content.vision,
      icon: Eye,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Quality Promise",
      description: "We guarantee Grade A quality through rigorous lab testing and sustainable sourcing practices.",
      icon: BadgeCheck,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero-bg.png"
            alt="Farm Landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-4">
                Est. 2022 • Africa
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                Cultivating Excellence, <br />
                <span className="text-primary-foreground/90">Exporting Trust.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              Connecting the rich soils of Africa to the global market through sustainable agriculture and ethical partnerships.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <Section spacing="loose" className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-story-farm.png"
                alt="Farmers at work"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Rooted in Tradition, <br />
                <span className="text-primary">Built for the Global Stage.</span>
              </h2>
              <div className="w-20 h-1.5 bg-primary rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/30 animate-pulse" />
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.story}
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-green-500/10 text-green-600">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="font-medium">100% Organic</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-medium">Community Driven</span>
              </div>
            </div>

            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/products">Explore Our Produce</Link>
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* Values Grid */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-2xl p-8 shadow-sm border hover:shadow-md transition-shadow duration-300"
              >
                <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-6`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Section with Parallax Feel */}
      <section className="py-24 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10 pattern-grid-lg" />
        <Container className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors backdrop-blur-sm">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">{stat.value}</div>
                <div className="text-primary-foreground/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust/Partner Section */}
      <Section spacing="loose">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Why Global Partners Choose Us</h2>
            <p className="text-muted-foreground text-lg">Uncompromising quality standard for international markets</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "Direct sourcing from 15+ farming communities",
              "Full traceability from farm to port",
              "ISO certified lab testing & COA provided",
              "Comprehensive export logistics handling",
              "Fair trade practices ensuring farmer prosperity",
              "Consistent Grade A supply capability"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border hover:border-primary/50 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-lg">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-muted/50 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Ready to source premium African produce?</h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join our network of international buyers and experience the quality of Africa's finest exports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/contact">Get a Quote</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/products">View Catalog</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
