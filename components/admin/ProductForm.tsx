'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Loader2, Trash2 } from 'lucide-react'
import { createProduct, updateProduct, deleteProduct } from '@/actions/products'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  short_desc: z.string().optional(),
  long_desc: z.string().optional(),
  is_featured: z.boolean(),
  is_active: z.boolean(),
  // Specs
  grade_type: z.string().optional(),
  moisture: z.string().optional(),
  purity: z.string().optional(),
  origin: z.string(),
  packaging_options: z.string().optional(),
  moq: z.string().optional(),
  shelf_life: z.string().optional(),
  lead_time: z.string().optional(),
  documentation: z.string().optional(),
  applications: z.string().optional(),
})

interface ProductFormProps {
  initialData?: any
  productId?: string
}

export function ProductForm({ initialData, productId }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

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
    documentation: initialData?.specs?.documentation?.join(', ') || '',
    applications: initialData?.specs?.applications?.join(', ') || '',
  }

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  // Auto-generate slug from name
  const watchName = form.watch('name')
  const generateSlug = () => {
    const slug = watchName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    form.setValue('slug', slug)
  }

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setLoading(true)
    try {
      const productData = {
        name: values.name,
        slug: values.slug,
        short_desc: values.short_desc || undefined,
        long_desc: values.long_desc || undefined,
        is_featured: values.is_featured,
        is_active: values.is_active,
      }

      const specsData = {
        grade_type: values.grade_type || undefined,
        moisture: values.moisture || undefined,
        purity: values.purity || undefined,
        origin: values.origin,
        packaging_options: values.packaging_options?.split(',').map(s => s.trim()).filter(Boolean),
        moq: values.moq || undefined,
        shelf_life: values.shelf_life || undefined,
        lead_time: values.lead_time || undefined,
        documentation: values.documentation?.split(',').map(s => s.trim()).filter(Boolean),
        applications: values.applications?.split(',').map(s => s.trim()).filter(Boolean),
      }

      let result
      if (productId) {
        result = await updateProduct(productId, { product: productData, specs: specsData })
      } else {
        result = await createProduct({ product: productData, specs: specsData })
      }

      if (result.success) {
        toast.success(productId ? 'Product updated successfully' : 'Product created successfully')
        router.push('/admin/products')
        router.refresh()
      } else {
        toast.error(result.error || 'Failed to save product')
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!productId) return
    
    setDeleting(true)
    try {
      const result = await deleteProduct(productId)
      if (result.success) {
        toast.success('Product deleted successfully')
        router.push('/admin/products')
        router.refresh()
      } else {
        toast.error(result.error || 'Failed to delete product')
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setDeleting(false)
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
          
          <TabsContent value="details" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Unrefined Shea Butter Grade A" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input {...field} placeholder="unrefined-shea-butter-grade-a" />
                      </FormControl>
                      <Button type="button" variant="outline" onClick={generateSlug}>
                        Generate
                      </Button>
                    </div>
                    <FormDescription>
                      Used in the product URL: /products/{field.value || 'slug'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-4 pt-8">
                <FormField
                  control={form.control}
                  name="is_featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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
                
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active</FormLabel>
                        <FormDescription>
                          Visible to public
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="short_desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Brief description for product cards (1-2 sentences)"
                      rows={3}
                    />
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
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      className="min-h-[200px] font-mono text-sm" 
                      {...field} 
                      placeholder="Detailed product description. HTML is supported."
                    />
                  </FormControl>
                  <FormDescription>
                    You can use HTML tags for formatting.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          <TabsContent value="specs" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="grade_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade/Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Grade A (Unrefined)" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Ghana" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="moisture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moisture Content</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., < 1%" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="purity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purity</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 100% Pure" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="moq"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 100 kg" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="shelf_life"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shelf Life</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 24 Months" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lead_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead Time</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 1-2 Weeks" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="packaging_options"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Packaging Options</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="25kg Cartons, 50kg Drums, Bulk options" />
                  </FormControl>
                  <FormDescription>Separate multiple options with commas</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="documentation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documentation Provided</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="COA, MSDS, Phytosanitary Certificate, Certificate of Origin" />
                  </FormControl>
                  <FormDescription>Separate multiple documents with commas</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="applications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Applications</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Cosmetics, Haircare, Food Manufacturing" />
                  </FormControl>
                  <FormDescription>Separate multiple applications with commas</FormDescription>
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between gap-4 pt-4 border-t">
          <div>
            {productId && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="destructive" disabled={deleting}>
                    {deleting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Delete Product
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the product
                      and all associated images and specifications.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {productId ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
