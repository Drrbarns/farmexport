'use client'

import { ArrowRight, ClipboardCheck, FileCheck, Package, Truck, Wallet } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/shared/Animations'
import { motion } from 'framer-motion'

const steps = [
  { step: "01", title: "Submit RFQ", desc: "Tell us your product needs, quantity, and destination.", icon: ClipboardCheck },
  { step: "02", title: "Confirm Specs", desc: "We review requirements and provide a detailed quotation.", icon: FileCheck },
  { step: "03", title: "Invoice & Deposit", desc: "Secure your order with deposit payment and production timeline.", icon: Wallet },
  { step: "04", title: "Shipment", desc: "We prepare, package, and ship with full documentation.", icon: Truck },
]

export function Steps() {
  return (
    <div className="relative">
      {/* Connecting Line (Desktop) */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-slate-200 via-primary/20 to-slate-200 -z-10 origin-left" 
      />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {steps.map((item, i) => (
          <StaggerItem key={i} className="relative group h-full">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center relative z-10">
              
              {/* Step Number Badge */}
              <div className="absolute -top-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg group-hover:bg-primary transition-colors">
                Step {item.step}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-slate-50 group-hover:bg-primary/5 border border-slate-100 group-hover:border-primary/10 flex items-center justify-center mb-5 transition-colors duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                <item.icon className="h-7 w-7 text-slate-400 group-hover:text-primary transition-colors" />
              </div>

              <h3 className="font-bold text-lg mb-3 text-slate-900 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>

            {/* Mobile/Tablet Arrow */}
            {i < 3 && (
              <div className="lg:hidden flex justify-center py-4 text-slate-300">
                <ArrowRight className="h-6 w-6 rotate-90 md:rotate-0" />
              </div>
            )}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
