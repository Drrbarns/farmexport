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

      <Section spacing="loose">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left Column: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We are available for international enquiries and look forward to supplying your business with premium African produce.
                </p>
              </div>

              <div className="space-y-6">
                <ContactInfoItem
                  icon={MapPin}
                  title="Headquarters"
                  details={
                    <>
                      P.O Box Legon Accra Headquarters<br />
                      Branch: Tamale - Fou
                    </>
                  }
                />

                <ContactInfoItem
                  icon={Phone}
                  title="Phone & WhatsApp"
                  details="+233 24 820 9525"
                  link="https://wa.me/233248209525"
                  linkText="Chat on WhatsApp"
                />

                <ContactInfoItem
                  icon={Mail}
                  title="Email Us"
                  details="export@africmadakeb.com"
                  link="mailto:export@africmadakeb.com"
                  linkText="Send an Email"
                />

                <ContactInfoItem
                  icon={Clock}
                  title="Operating Hours"
                  details="Mon - Fri: 8:00 AM - 6:00 PM (GMT)"
                />
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden h-64 relative bg-muted border">
                {/* In a real app, this would be an interactive map iframe */}
                <Image src="/images/export-logistics.svg" alt="Location Map" fill className="object-cover opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <Button variant="secondary" className="shadow-lg" asChild>
                    <Link href="https://maps.google.com" target="_blank">View on Google Maps</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
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

function ContactInfoItem({ icon: Icon, title, details, link, linkText }: any) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-bold text-lg text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-1">{details}</p>
        {link && (
          <Link href={link} className="text-primary font-medium hover:underline text-sm inline-flex items-center gap-1">
            {linkText} <MessageSquare className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  )
}
