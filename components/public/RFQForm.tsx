'use client'

import { useState } from 'react'
import { submitRFQ } from '@/actions/rfq'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft, Package, User, Truck, FileCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { label: 'Buyer Details', icon: User },
  { label: 'Products', icon: Package },
  { label: 'Logistics', icon: Truck },
  { label: 'Compliance', icon: FileCheck }
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
          // If empty, maybe add one empty row or prompt?
          // Let's add a row if empty
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
      <Card className="max-w-2xl mx-auto text-center py-16 shadow-2xl border-none rounded-3xl animate-in zoom-in-95 duration-500">
        <CardContent className="space-y-8">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-in fade-in zoom-in duration-700 delay-150">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Request Received!</h2>
            <p className="text-xl text-muted-foreground mt-4 max-w-md mx-auto">
              Thank you for your enquiry. Your RFQ Reference is <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded">{rfqNo}</span>.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl max-w-md mx-auto text-sm text-slate-600 border border-slate-100">
            We have sent a confirmation email to <span className="font-semibold text-slate-900">{formData.email}</span>. Our sales team will review your requirements and send a proforma invoice within 24 hours.
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
              <a href={`https://wa.me/233248209525?text=Hi, I just submitted RFQ ${rfqNo}. Can we discuss?`}>
                Chat on WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
              Submit Another RFQ
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
      {/* Steps Sidebar - Horizontal on mobile, vertical on desktop */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="lg:sticky lg:top-24 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-sm border border-slate-100">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {steps.map((step, i) => (
              <div 
                key={i}
                className={cn(
                  "flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-colors shrink-0 lg:shrink",
                  currentStep === i ? "bg-primary text-white" : (currentStep > i ? "text-primary font-medium" : "text-slate-400")
                )}
              >
                <step.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">{step.label}</span>
                {currentStep > i && <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 ml-auto hidden lg:block" />}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1">
        <Card className="border-none shadow-xl rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="h-1.5 sm:h-2 bg-slate-100 w-full">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-in-out" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <CardHeader className="pb-4 sm:pb-8 px-4 sm:px-6">
             <CardTitle className="text-xl sm:text-2xl">{steps[currentStep].label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8 min-h-[350px] sm:min-h-[400px] px-4 sm:px-6">
            
            {currentStep === 0 && (
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <Label className="text-sm">Full Name *</Label>
                  <Input 
                    value={formData.full_name} 
                    onChange={e => setFormData({...formData, full_name: e.target.value})} 
                    className="h-11 sm:h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Company Name *</Label>
                  <Input 
                    value={formData.company_name} 
                    onChange={e => setFormData({...formData, company_name: e.target.value})} 
                    className="h-11 sm:h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Email Address *</Label>
                  <Input 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    className="h-11 sm:h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Phone / WhatsApp</Label>
                  <Input 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                    className="h-11 sm:h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm">Role</Label>
                  <Select onValueChange={val => setFormData({...formData, role: val})}>
                    <SelectTrigger className="h-11 sm:h-12 bg-slate-50 border-slate-200"><SelectValue placeholder="Select Role" /></SelectTrigger>
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

            {currentStep === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                {formData.products.length === 0 && (
                   <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed">
                      <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 mb-4">No products added yet.</p>
                      <Button onClick={addProductRow} variant="outline">Add First Product</Button>
                   </div>
                )}
                
                {formData.products.map((row, i) => (
                  <div key={i} className="grid md:grid-cols-3 gap-4 p-6 border rounded-xl bg-slate-50/50 relative group hover:bg-white hover:shadow-md transition-all">
                    <div className="space-y-2">
                      <Label>Product</Label>
                      <Select value={row.productId} onValueChange={val => updateProductRow(i, 'productId', val)}>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="Select Product" /></SelectTrigger>
                        <SelectContent>
                          {products.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity (e.g. 5 Tons)</Label>
                      <Input 
                         value={row.qty} 
                         onChange={e => updateProductRow(i, 'qty', e.target.value)} 
                         className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Packaging Pref.</Label>
                      <Input 
                         value={row.packaging} 
                         onChange={e => updateProductRow(i, 'packaging', e.target.value)} 
                         placeholder="e.g. 25kg Cartons" 
                         className="bg-white"
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-white shadow-sm border text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        const newP = [...formData.products]
                        newP.splice(i, 1)
                        setFormData({...formData, products: newP})
                      }}
                    >
                      <span className="sr-only">Remove</span>
                      &times;
                    </Button>
                  </div>
                ))}
                
                {formData.products.length > 0 && (
                  <Button type="button" variant="outline" onClick={addProductRow} className="w-full border-dashed">
                    + Add Another Product
                  </Button>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <Label className="text-sm">Destination Country *</Label>
                  <Input 
                    value={formData.destination_country} 
                    onChange={e => setFormData({...formData, destination_country: e.target.value})} 
                    className="h-11 sm:h-12 bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Target Timeline</Label>
                  <Select onValueChange={val => setFormData({...formData, timeline: val})}>
                    <SelectTrigger className="h-11 sm:h-12 bg-slate-50 border-slate-200"><SelectValue placeholder="Select Timeline" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (ASAP)</SelectItem>
                      <SelectItem value="1month">Within 1 Month</SelectItem>
                      <SelectItem value="3months">Within 3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3 sm:space-y-4 sm:col-span-2">
                  <Label className="text-sm sm:text-base">Preferred Incoterms</Label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {['EXW', 'FOB', 'CIF'].map(term => (
                       <label 
                         key={term} 
                         className={cn(
                           "flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50",
                           formData.incoterm === term ? "border-primary bg-primary/5 text-primary" : "border-slate-100 text-slate-500"
                         )}
                       >
                         <Checkbox 
                           className="sr-only"
                           checked={formData.incoterm === term} 
                           onCheckedChange={() => setFormData({...formData, incoterm: term})} 
                         />
                         <span className="font-bold text-base sm:text-lg">{term}</span>
                         <span className="text-[10px] sm:text-xs text-center mt-1 font-normal">
                           {term === 'EXW' ? 'Ex Works' : (term === 'FOB' ? 'Free On Board' : 'Cost, Ins, Freight')}
                         </span>
                       </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <Label>Intended Application / Industry</Label>
                  <Input 
                    placeholder="e.g. Cosmetic formulation for skin cream" 
                    value={formData.intended_use} 
                    onChange={e => setFormData({...formData, intended_use: e.target.value})} 
                    className="h-12 bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="flex items-center space-x-3 border p-6 rounded-xl bg-slate-50/50">
                   <Checkbox 
                     id="coa" 
                     className="h-6 w-6"
                     checked={formData.require_coa} 
                     onCheckedChange={(c) => setFormData({...formData, require_coa: c as boolean})} 
                   />
                   <div className="space-y-1">
                     <label htmlFor="coa" className="font-semibold leading-none cursor-pointer">
                       Require Certificate of Analysis (COA) / MSDS?
                     </label>
                     <p className="text-sm text-slate-500">We will attach standard quality specs to your quote.</p>
                   </div>
                </div>
                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea 
                    placeholder="Any specific requirements regarding packaging, labeling, or shipping?" 
                    value={formData.notes} 
                    onChange={e => setFormData({...formData, notes: e.target.value})} 
                    className="min-h-[120px] bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            )}

          </CardContent>
          <CardFooter className="flex justify-between p-4 sm:p-8 bg-slate-50/50 border-t gap-3">
            <Button 
               variant="ghost" 
               onClick={handleBack} 
               disabled={currentStep === 0}
               className="text-slate-500 hover:text-slate-900 px-3 sm:px-4"
            >
               <ChevronLeft className="mr-1 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Back</span>
            </Button>
            
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} disabled={loading} size="lg" className="px-4 sm:px-8 shadow-lg hover:shadow-xl transition-shadow bg-primary text-white text-sm sm:text-base">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit RFQ
              </Button>
            ) : (
              <Button onClick={handleNext} size="lg" className="px-4 sm:px-8 text-sm sm:text-base">
                Next <span className="hidden sm:inline">Step</span> <ChevronRight className="ml-1 sm:ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
