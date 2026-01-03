import { createClient } from '@/lib/supabase/server'
import { HomePage } from '@/components/marketing/HomePage'

export const revalidate = 0

export default async function Home() {
  let products: any[] = [
    {
      id: '1',
      name: 'Unrefined (Grade A) Shea Butter',
      slug: 'unrefined-shea-butter-grade-a',
      short_desc: 'Premium Grade A unrefined shea butter, sourced directly from Ghanaian women cooperatives.',
      spec_sheets: []
    },
    {
      id: '2',
      name: 'Shea Oil',
      slug: 'shea-oil',
      short_desc: 'Pure, unrefined shea oil extracted from premium shea nuts.',
      spec_sheets: []
    },
    {
      id: '3',
      name: 'Premium Grade Soybean',
      slug: 'premium-grade-soybean',
      short_desc: 'High-quality, non-GMO soybeans suitable for food processing and industrial use.',
      spec_sheets: []
    },
    {
      id: '4',
      name: 'Baobab Oil',
      slug: 'baobab-oil',
      short_desc: 'Cold-pressed baobab oil rich in vitamins and antioxidants.',
      spec_sheets: []
    }
  ]

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (supabaseUrl && supabaseUrl !== 'https://example.supabase.co' && supabaseKey && supabaseKey !== 'public-anon-key') {
      const supabase = await createClient()

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*, spec_sheets(file_url)')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: true })

      if (!productsError && productsData && productsData.length > 0) {
        products = productsData
      }
    }
  } catch (error) {
    console.error('Supabase connection error:', error)
  }

  return <HomePage products={products} />
}
