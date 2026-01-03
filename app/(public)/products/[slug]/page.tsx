import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, Download, FileText, Globe, Package, ShieldCheck, Phone, ArrowRight } from 'lucide-react'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export const revalidate = 0

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createClient()
  const { slug } = params

  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      product_specs (*),
      product_images (*),
      spec_sheets (*)
    `)
    .eq('slug', slug)
    .single()

  if (!product) {
    notFound()
  }

  const specs = product.product_specs?.[0] || {}

  const imageSrc = product.slug.includes('shea') 
    ? (product.slug.includes('oil') ? 'shea-oil.svg' : 'shea-butter.svg') 
    : (product.slug.includes('soy') ? 'soybean.svg' : 'baobab.svg')

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b sticky top-20 z-30 py-4 shadow-sm">
        <div className="container flex flex-wrap items-center justify-between gap-4">
           <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
             <span>/</span>
             <span className="text-foreground font-medium">{product.name}</span>
           </div>
           <div className="flex gap-3">
             <Button variant="outline" size="sm" asChild className="hidden sm:flex">
               <Link href="https://wa.me/233248209525" target="_blank">
                <Phone className="mr-2 h-4 w-4" /> WhatsApp
               </Link>
             </Button>
             <Button size="sm" asChild>
               <Link href={`/rfq?product=${product.id}`}>Request Quote</Link>
             </Button>
           </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Images */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-square bg-muted rounded-2xl border overflow-hidden relative group">
               <img 
                 src={`/images/${imageSrc}`} 
                 alt={product.name}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               <div className="absolute top-6 right-6">
                 <Badge className="bg-green-600 hover:bg-green-700 shadow-md">Export Ready</Badge>
               </div>
            </div>
            
            {/* Gallery Thumbnails Placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg border cursor-pointer hover:border-primary transition-colors overflow-hidden">
                   <img src={`/images/${imageSrc}`} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" alt="Thumb" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">{product.name}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                {product.short_desc}
              </p>
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               {[
                 { label: "Origin", value: specs.origin || "Africa" },
                 { label: "Grade", value: specs.grade_type || "Premium" },
                 { label: "MOQ", value: specs.moq || "Negotiable" },
                 { label: "Shelf Life", value: specs.shelf_life || "24 Months" },
               ].map((item, i) => (
                 <div key={i} className="bg-card p-4 rounded-xl border shadow-sm">
                   <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                   <p className="font-bold text-foreground">{item.value}</p>
                 </div>
               ))}
            </div>

            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
                <TabsTrigger value="specs" className="py-2 px-4">Specifications</TabsTrigger>
                <TabsTrigger value="applications" className="py-2 px-4">Applications</TabsTrigger>
                <TabsTrigger value="logistics" className="py-2 px-4">Packaging & Logistics</TabsTrigger>
                <TabsTrigger value="docs" className="py-2 px-4">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specs" className="pt-6 space-y-6">
                <div className="prose prose-slate max-w-none">
                   <div 
                     className="text-muted-foreground leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: product.long_desc || '' }} 
                   />
                </div>

                <div className="bg-card rounded-xl border overflow-hidden">
                  <div className="bg-muted/30 p-4 border-b">
                     <h3 className="font-semibold flex items-center">
                       <ShieldCheck className="mr-2 h-5 w-5 text-primary" /> Technical Specifications
                     </h3>
                  </div>
                  <Table>
                    <TableBody>
                      <TableRow className="hover:bg-transparent">
                        <TableCell className="w-1/3 font-medium text-muted-foreground pl-6 py-4">Grade / Type</TableCell>
                        <TableCell className="font-semibold py-4">{specs.grade_type || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-transparent">
                        <TableCell className="font-medium text-muted-foreground pl-6 py-4">Moisture Content</TableCell>
                        <TableCell className="font-semibold py-4">{specs.moisture || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-transparent">
                        <TableCell className="font-medium text-muted-foreground pl-6 py-4">Purity</TableCell>
                        <TableCell className="font-semibold py-4">{specs.purity || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-transparent border-0">
                        <TableCell className="font-medium text-muted-foreground pl-6 py-4">Lead Time</TableCell>
                        <TableCell className="font-semibold py-4">{specs.lead_time || 'N/A'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="applications" className="pt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Common Industry Applications</h3>
                    {specs.applications ? (
                      <div className="flex flex-wrap gap-2">
                        {specs.applications.map((app: string, i: number) => (
                          <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Information not available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logistics" className="pt-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                     <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Package className="mr-2 h-5 w-5 text-primary" /> Packaging Options
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {specs.packaging_options?.map((opt: string, i: number) => (
                            <li key={i} className="flex items-center text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                              {opt}
                            </li>
                          )) || <li className="text-muted-foreground">Contact for details</li>}
                        </ul>
                     </div>
                     <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Globe className="mr-2 h-5 w-5 text-primary" /> Global Shipping
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          We ship via air and sea freight from major African ports. Supported Incoterms: EXW, FOB, CIF.
                        </p>
                     </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="docs" className="pt-6">
                 <div className="grid gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4 flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-primary" /> Technical Documents
                        </h3>
                        <div className="space-y-3">
                          {product.spec_sheets && product.spec_sheets.length > 0 ? (
                            product.spec_sheets.map((sheet: any) => (
                              <a 
                                key={sheet.id} 
                                href={sheet.file_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted border transition-colors group"
                              >
                                <span className="text-sm font-medium">{sheet.title || 'Specification Sheet'}</span>
                                <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                              </a>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">No downloadable documents currently available.</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                       <CardContent className="pt-6">
                          <h4 className="font-semibold mb-3">Available Certifications</h4>
                          <ul className="space-y-2">
                            {specs.documentation?.map((doc: string, i: number) => (
                              <li key={i} className="flex items-center text-sm text-muted-foreground">
                                <Check className="mr-2 h-4 w-4 text-green-500" />
                                {doc}
                              </li>
                            )) || <li className="text-muted-foreground">Standard export documentation included.</li>}
                          </ul>
                       </CardContent>
                    </Card>
                 </div>
              </TabsContent>
            </Tabs>

            {/* Sticky Mobile CTA */}
            <div className="sticky bottom-4 z-40 lg:hidden">
              <Button size="lg" className="w-full shadow-xl bg-primary text-white font-semibold" asChild>
                <Link href={`/rfq?product=${product.id}`}>Request Quote For This Product</Link>
              </Button>
            </div>
            
             {/* Desktop CTA Block (Sticky) */}
             <div className="hidden lg:block sticky top-32">
               <Card className="bg-[var(--hero-bg)] text-white border-none shadow-xl">
                 <CardContent className="p-8 space-y-6 text-center">
                    <h3 className="text-2xl font-semibold">Ready to Order?</h3>
                    <p className="text-white/80">Get a custom quotation including shipping to your destination.</p>
                    <div className="flex flex-col gap-3">
                      <Button size="lg" className="w-full bg-primary hover:bg-primary/90 font-semibold" asChild>
                        <Link href={`/rfq?product=${product.id}`}>Request Quote</Link>
                      </Button>
                      <Button size="lg" variant="outline" className="w-full bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white" asChild>
                        <Link href="https://wa.me/233248209525">
                          <Phone className="mr-2 h-4 w-4" /> WhatsApp Sales
                        </Link>
                      </Button>
                    </div>
                 </CardContent>
               </Card>
             </div>

          </div>
        </div>
      </div>
    </div>
  )
}
