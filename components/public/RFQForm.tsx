'use client'

import { useState } from 'react'
import { submitRFQ } from '@/actions/rfq'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft, Package, User, Truck, FileCheck, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const steps = [
  { label: 'Buyer Details', icon: User, description: 'Tell us about your business' },
  { label: 'Product Selection', icon: Package, description: 'What do you need?' },
  { label: 'Logistics', icon: Truck, description: 'Shipping & Terms' },
  { label: 'Compliance', icon: FileCheck, description: 'Certifications & documentation' }
]

const productImages = [
  '/images/shea-butter.png',
  '/images/cashew-nut.png',
  '/images/soybean.png',
  '/images/shea-oil.png',
]

export function RFQForm({ products }: { products: any[] }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [rfqNo, setRfqNo] = useState('')

  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    email: '',
    phone: '',
    whatsapp: '',
    role: '',
    products: [] as any[], // { productId, qty, packaging }
    destination_country: '',
    incoterm: '',
    timeline: '',
    intended_use: '',
    require_coa: false,
    notes: ''
  })

  // Helper for products selection
  const addProductRow = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { productId: '', qty: '', packaging: '' }]
    }))
  }

  const updateProductRow = (index: number, field: string, value: string) => {
    const newProducts = [...formData.products]
    newProducts[index] = { ...newProducts[index], [field]: value }
    setFormData(prev => ({ ...prev, products: newProducts }))
  }

  const handleNext = () => {
    // Basic validation
    if (currentStep === 0) {
      if (!formData.full_name || !formData.email || !formData.company_name) {
        toast.error('Please fill in required fields')
        return
      }
    }
    if (currentStep === 1) {
      if (formData.products.length === 0) {
        if (formData.products.length === 0) addProductRow()
      }
    }
    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => setCurrentStep(prev => prev - 1)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Transform products to include name from selected product
      const productsWithNames = formData.products.map(row => {
        const product = products.find(p => p.id === row.productId)
        return {
          id: row.productId,
          name: product?.name || 'Unknown',
          qty: row.qty,
          packaging: row.packaging,
        }
      })

      const result = await submitRFQ({
        ...formData,
        products: productsWithNames,
      })

      if (result.success) {
        setSubmitted(true)
        setRfqNo(result.rfqNo!)
        toast.success('RFQ Submitted Successfully!')
      } else {
        toast.error(result.error || 'Failed to submit RFQ')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center py-20">
        <Card className="max-w-2xl w-full text-center p-8 shadow-2xl border-none rounded-3xl animate-in zoom-in-95 duration-500 bg-white">
          <CardContent className="space-y-8 pt-8">
            <div className="mx-auto w-24 h-24 bg-green-100/50 rounded-full flex items-center justify-center text-green-600 animate-in fade-in zoom-in duration-700 delay-150 ring-8 ring-green-50">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Request Received!</h2>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Your Request for Quotation has been securely submitted.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 py-4">
              <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">Reference Number</span>
              <code className="text-3xl font-mono font-bold text-primary bg-primary/5 px-6 py-2 rounded-xl border border-primary/10">{rfqNo}</code>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl max-w-lg mx-auto text-sm leading-relaxed text-slate-600 border border-slate-100">
              We have sent a confirmation email to <span className="font-semibold text-slate-900">{formData.email}</span>.
              Our export specialists will review your requirements and send a detailed proforma invoice within 24 hours.
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white gap-2 h-12 px-8 rounded-full shadow-lg shadow-green-600/20" asChild>
                <a href={`https://wa.me/233248209525?text=Hi, I just submitted RFQ ${rfqNo}. Can we discuss?`}>
                  Chat on WhatsApp <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.reload()} className="h-12 px-8 rounded-full border-2">
                Submit Another RFQ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Visual Content for Side Panel
  const renderVisualContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="h-full flex flex-col justify-end p-8 text-white z-10">
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-lg">Verified Suppliers</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                We work directly with vetted farmer cooperatives to ensure you get the best market rates without middlemen markup.
              </p>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="h-full flex flex-col p-8 z-10">
            <div className="mt-auto grid grid-cols-2 gap-3">
              {productImages.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative aspect-square rounded-xl overflow-hidden border border-white/20 shadow-lg bg-black/20"
                >
                  <Image src={src} alt="Product" fill className="object-cover" />
                </motion.div>
              ))}
            </div>
            <div className="mt-4 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <p className="text-white text-xs font-medium text-center">Premium Grade A Specifications</p>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="h-full flex flex-col justify-end p-8 text-white z-10">
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-lg">Global Logistics</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" /> Door-to-Door Delivery
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" /> CIF / FOB / EXW Support
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" /> Fast Lead Times
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="h-full flex flex-col justify-end p-8 text-white z-10">
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FileCheck className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-lg">Full Compliance</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Every shipment includes Certificate of Origin, Phyto-sanitary Certificate, and Commercial Invoice.
              </p>
            </div>
          </div>
        )
      default: return null
    }
  }

  // Background Image function
  const getBgImage = () => {
    switch (currentStep) {
      case 0: return '/images/hero-1.png'
      case 1: return '/images/products-hero-bg.png' // or a subtle texture
      case 2: return '/images/export-ready-hero-bg.png'
      case 3: return '/images/contact-hero-bg.png'
      default: return '/images/hero-1.png'
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">

      {/* Visual Sidebar (Desktop) */}
      <div className="hidden lg:block lg:w-[400px] relative overflow-hidden bg-slate-900 shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={getBgImage()}
              alt="Background"
              fill
              className="object-cover opacity-80"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Animated Content Layer */}
        <div className="absolute inset-0 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              {renderVisualContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 flex flex-col p-6 lg:p-10">

        {/* Progress Nav */}
        <div className="mb-8">
          <nav className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-primary -z-10 transition-all duration-500 rounded-full"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2 relative bg-white px-2">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    currentStep >= i
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                      : "bg-white border-slate-200 text-slate-300"
                  )}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={cn(
                  "text-xs font-semibold absolute -bottom-6 w-32 text-center transition-colors duration-300",
                  currentStep === i ? "text-slate-900" : "text-slate-400 opacity-0 sm:opacity-100"
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex-1 mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">{steps[currentStep].label}</h2>
            <p className="text-slate-500">{steps[currentStep].description}</p>
          </div>

          <Card className="border-none shadow-none p-0">
            <CardContent className="p-0 space-y-6 min-h-[300px]">
              {/* Step 0: Buyer Details */}
              {currentStep === 0 && (
                <div className="grid sm:grid-cols-2 gap-5 animate-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <Label>Full Name <span className="text-red-500">*</span></Label>
                    <Input
                      placeholder="John Doe"
                      value={formData.full_name}
                      onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                      className="h-12 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company Name <span className="text-red-500">*</span></Label>
                    <Input
                      placeholder="Business Ltd."
                      value={formData.company_name}
                      onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                      className="h-12 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address <span className="text-red-500">*</span></Label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone / WhatsApp</Label>
                    <Input
                      placeholder="+123..."
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Role</Label>
                    <Select onValueChange={val => setFormData({ ...formData, role: val })}>
                      <SelectTrigger className="h-12 border-slate-200 bg-slate-50"><SelectValue placeholder="Select your role" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="procurement">Procurement Manager</SelectItem>
                        <SelectItem value="owner">Business Owner</SelectItem>
                        <SelectItem value="agent">Agent / Broker</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 1: Products */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  {formData.products.map((row, i) => (
                    <div key={i} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white hover:shadow-md transition-all relative group">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Product</Label>
                          <Select value={row.productId} onValueChange={val => updateProductRow(i, 'productId', val)}>
                            <SelectTrigger className="bg-white h-11"><SelectValue placeholder="Select Product" /></SelectTrigger>
                            <SelectContent>
                              {products.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Quantity</Label>
                          <Input
                            value={row.qty}
                            onChange={e => updateProductRow(i, 'qty', e.target.value)}
                            placeholder="e.g. 10MT"
                            className="bg-white h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Packaging</Label>
                          <Input
                            value={row.packaging}
                            onChange={e => updateProductRow(i, 'packaging', e.target.value)}
                            placeholder="e.g. 50kg PP Bags"
                            className="bg-white h-11"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newP = [...formData.products]
                          newP.splice(i, 1)
                          setFormData({ ...formData, products: newP })
                        }}
                        className="absolute -top-3 -right-3 h-8 w-8 bg-white border rounded-full shadow-sm text-slate-400 hover:text-red-500 items-center justify-center flex opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove Item"
                      >
                        <span className="text-xl leading-none mb-1">&times;</span>
                      </button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addProductRow} className="w-full border-dashed border-2 py-6 text-slate-500 hover:text-primary hover:border-primary/50 hover:bg-primary/5">
                    <Package className="mr-2 h-4 w-4" /> Add Another Product
                  </Button>
                </div>
              )}

              {/* Step 2: Logistics */}
              {currentStep === 2 && (
                <div className="grid sm:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <Label>Destination Country <span className="text-red-500">*</span></Label>
                    <Input
                      value={formData.destination_country}
                      onChange={e => setFormData({ ...formData, destination_country: e.target.value })}
                      className="h-12 border-slate-200 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Desired Timeline</Label>
                    <Select onValueChange={val => setFormData({ ...formData, timeline: val })}>
                      <SelectTrigger className="h-12 border-slate-200 bg-slate-50"><SelectValue placeholder="When do you need it?" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="1month">Next 30 Days</SelectItem>
                        <SelectItem value="3months">Next Quarter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 space-y-3">
                    <Label>Preferred Incoterms</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {['EXW', 'FOB', 'CIF'].map(term => (
                        <div
                          key={term}
                          onClick={() => setFormData({ ...formData, incoterm: term })}
                          className={cn(
                            "cursor-pointer rounded-xl border-2 p-4 text-center transition-all hover:border-primary/50",
                            formData.incoterm === term
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-slate-100 bg-slate-50 text-slate-500"
                          )}
                        >
                          <div className="font-bold text-lg">{term}</div>
                          <div className="text-[10px] uppercase font-medium mt-1 opacity-70">
                            {term === 'EXW' ? 'Ex Works' : (term === 'FOB' ? 'Freight on Board' : 'Cost Ins Friction')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Compliance & Notes */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-xl flex gap-3 text-sm text-blue-700">
                    <Info className="h-5 w-5 shrink-0" />
                    <p>We provide standard documentation including Commercial Invoice, Packing List, and Phyto Certificate/COA.</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Specific Industry/Application</Label>
                    <Input
                      placeholder="e.g. Skin care manuf., Animal feed, etc."
                      value={formData.intended_use}
                      onChange={e => setFormData({ ...formData, intended_use: e.target.value })}
                      className="h-12 border-slate-200 bg-slate-50"
                    />
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setFormData({ ...formData, require_coa: !formData.require_coa })}>
                    <Checkbox
                      id="coa"
                      checked={formData.require_coa}
                      onCheckedChange={(c) => setFormData({ ...formData, require_coa: c as boolean })}
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <label htmlFor="coa" className="font-semibold cursor-pointer">Require Specialized COA / MSDS?</label>
                      <p className="text-sm text-slate-500">Check this if your import authority requires specific additional testing.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Notes</Label>
                    <Textarea
                      placeholder="Tell us more about your target price, packaging requirements, or any other details..."
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      className="min-h-[100px] border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-slate-100 mt-auto">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="text-slate-500 hover:text-slate-900"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSubmit} disabled={loading} size="lg" className="px-8 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/20">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Quote Request
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="px-8 bg-slate-900 text-white hover:bg-slate-800">
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

      </div>
    </div>
  )
}
