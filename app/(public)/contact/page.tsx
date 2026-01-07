import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Mail, MapPin, Phone, Clock, MessageSquare, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import * as motion from "framer-motion/client"
import { ContactForm } from '@/components/public/ContactForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const revalidate = 0

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Africma’s & Dakeb Farm Information',
  description: 'Get in touch with our export team. Headquartered in Accra, Ghana. We are ready to handle your wholesale agricultural orders.',
  openGraph: {
    title: 'Contact Us | Africma’s & Dakeb Farm Information',
    description: 'Get in touch with our export team. Headquartered in Accra, Ghana. We are ready to handle your wholesale agricultural orders.',
    url: 'https://africmasdakebfarmltd.com/contact',
  },
  alternates: {
    canonical: 'https://africmasdakebfarmltd.com/contact',
  }
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-hero-bg.png"
            alt="Global Communications"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
              Let's Start a <span className="text-primary-foreground">Conversation.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Whether you have a question about our products, need a custom quote, or want to discuss a partnership, our team is ready to help.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section className="bg-slate-50 relative -mt-20 pb-20 z-20 pt-0">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <ContactForm />
          </motion.div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section background="muted" className="py-20">
        <Container size="narrow">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions about our export process. </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Do you offer international shipping?", a: "Yes, we ship globally using Sea Freight (FCL/LCL) and Air Freight, with full logistics handling." },
              { q: "What is your Minimum Order Quantity (MOQ)?", a: "MOQs vary by product but generally start at 1 metric ton for sea freight. Contact us for specifics on smaller air freight trials." },
              { q: "Can I get product samples before ordering?", a: "Absolutely. We can send samples for lab testing and quality verification. Sample shipping costs may apply." },
              { q: "Are your products certified organic?", a: "Yes, our key products like Shea Butter and Soybeans are sourced from certified organic farms. We provide COA (Certificate of Analysis) with every shipment." },
              { q: "What payment methods do you accept?", a: "We typically accept T/T (Bank Transfer) and Irrevocable L/C (Letter of Credit) for larger orders." }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-background mb-4 rounded-xl border px-4">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>
    </div>
  )
}
