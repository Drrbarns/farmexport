'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  short_desc: z.string().optional(),
  long_desc: z.string().optional(),
  is_featured: z.boolean(),
  is_active: z.boolean(),
  // Specs
  grade_type: z.string().optional(),
  moisture: z.string().optional(),
  purity: z.string().optional(),
  origin: z.string(),
  packaging_options: z.string().optional(), // Comma separated for simplicity in form
  moq: z.string().optional(),
  shelf_life: z.string().optional(),
  lead_time: z.string().optional(),
})

interface ProductFormProps {
  initialData?: any
  productId?: string
}

export function ProductForm({ initialData, productId }: ProductFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const defaultValues = {
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    short_desc: initialData?.short_desc || '',
    long_desc: initialData?.long_desc || '',
    is_featured: initialData?.is_featured ?? false,
    is_active: initialData?.is_active ?? true,
    grade_type: initialData?.specs?.grade_type || '',
    moisture: initialData?.specs?.moisture || '',
    purity: initialData?.specs?.purity || '',
    origin: initialData?.specs?.origin ?? 'Ghana',
    packaging_options: initialData?.specs?.packaging_options?.join(', ') || '',
    moq: initialData?.specs?.moq || '',
    shelf_life: initialData?.specs?.shelf_life || '',
    lead_time: initialData?.specs?.lead_time || '',
  }

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setLoading(true)
    try {
      const productData = {
        name: values.name,
        slug: values.slug,
        short_desc: values.short_desc,
        long_desc: values.long_desc,
        is_featured: values.is_featured,
        is_active: values.is_active,
      }

      let pid = productId

      if (pid) {
        // Update
        const { error } = await supabase.from('products').update(productData).eq('id', pid)
        if (error) throw error
      } else {
        // Create
        const { data, error } = await supabase.from('products').insert(productData).select().single()
        if (error) throw error
        pid = data.id
      }

      // Update Specs
      const specsData = {
        grade_type: values.grade_type,
        moisture: values.moisture,
        purity: values.purity,
        origin: values.origin,
        packaging_options: values.packaging_options?.split(',').map(s => s.trim()).filter(Boolean),
        moq: values.moq,
        shelf_life: values.shelf_life,
        lead_time: values.lead_time,
        product_id: pid,
      }

      // Check if specs exist
      const { data: existingSpecs } = await supabase.from('product_specs').select('id').eq('product_id', pid).single()
      
      if (existingSpecs) {
        await supabase.from('product_specs').update(specsData).eq('product_id', pid)
      } else {
        await supabase.from('product_specs').insert(specsData)
      }

      toast.success('Product saved successfully')
      router.push('/admin/products')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-8">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        Show on homepage
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="short_desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="long_desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description (HTML)</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[200px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          <TabsContent value="specs" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="grade_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade/Type</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moisture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moisture</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purity</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moq"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MOQ</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shelf_life"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shelf Life</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="packaging_options"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Packaging Options (comma separated)</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Product
          </Button>
        </div>
      </form>
    </Form>
  )
}


