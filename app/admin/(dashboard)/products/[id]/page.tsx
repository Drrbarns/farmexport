import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ProductForm } from '@/components/admin/ProductForm'

export const revalidate = 0

interface EditProductPageProps {
  params: { id: string }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const supabase = await createClient()
  const { id } = params

  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      specs:product_specs(*)
    `)
    .eq('id', id)
    .single()

  if (!product) {
    notFound()
  }

  // Flatten specs array to single object if it comes as array
  const formattedProduct = {
    ...product,
    specs: Array.isArray(product.specs) ? product.specs[0] : product.specs
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm initialData={formattedProduct} productId={id} />
    </div>
  )
}

