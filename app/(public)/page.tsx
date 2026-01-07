import { createClient } from '@/lib/supabase/server'
import { HomePage } from '@/components/marketing/HomePage'

export const revalidate = 0

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Africma’s & Dakeb Farm LTD | Premium African Agricultural Exporter',
  description: 'Sourcing and exporting Grade A Unrefined Shea Butter, Sesame, Soybeans, and more from Africa to the world. Your trusted partner for ethical and sustainable agro-trade.',
  openGraph: {
    title: 'Africma’s & Dakeb Farm LTD | Premium African Agricultural Exporter',
    description: 'Sourcing and exporting Grade A Unrefined Shea Butter, Sesame, Soybeans, and more from Africa to the world.',
    url: 'https://africmasdakebfarmltd.com',
  },
  alternates: {
    canonical: 'https://africmasdakebfarmltd.com',
  }
}

export default async function Home() {
  let products: any[] = [
    {
      id: '1',
      name: 'Unrefined (Grade A) Shea Butter',
      slug: 'unrefined-shea-butter-grade-a',
      short_desc: 'Premium Grade A unrefined shea butter, sourced directly from African women cooperatives.',
      spec_sheets: []
    },
    {
      id: '2',
      name: 'Shea Butter Oil',
      slug: 'shea-butter-oil',
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
      name: 'Cashew Nut',
      slug: 'cashew-nut',
      short_desc: 'Raw cashew nuts sourced from high-yield farms in Ghana and West Africa.',
      spec_sheets: []
    },
    {
      id: '5',
      name: 'Yellow Corn (Maize)',
      slug: 'yellow-corn',
      short_desc: 'Sun-dried yellow corn, rich in nutrients, suitable for animal feed and human consumption.',
      spec_sheets: []
    },
    {
      id: '6',
      name: 'Unrefined Salt',
      slug: 'unrefined-salt',
      short_desc: 'Natural, unrefined sea salt harvested from the coast, rich in essential minerals.',
      spec_sheets: []
    },
    {
      id: '7',
      name: 'Chili Dry Pepper',
      slug: 'chili-dry-pepper',
      short_desc: 'Spicy, sun-dried chili peppers, perfect for culinary and industrial applications.',
      spec_sheets: []
    },
    {
      id: '8',
      name: 'Peanuts (Groundnuts)',
      slug: 'peanuts-groundnuts',
      short_desc: 'Organic shelled and unshelled peanuts, high in protein and oil content.',
      spec_sheets: []
    },
    {
      id: '9',
      name: 'Sesame Seeds',
      slug: 'sesame-seeds',
      short_desc: 'High-quality white and mixed sesame seeds, rich in oil and flavor.',
      spec_sheets: []
    },
    {
      id: '10',
      name: 'Sesame Oil',
      slug: 'sesame-oil',
      short_desc: 'Pure, golden sesame oil extracted from premium seeds.',
      spec_sheets: []
    },
    {
      id: '11',
      name: 'Baobab Cake (Animal Feed)',
      slug: 'baobab-cake',
      short_desc: 'Nutrient-rich baobab fruit pulp cake, excellent for sustainable animal feed.',
      spec_sheets: []
    },
    {
      id: '12',
      name: 'Premium Local Rice',
      slug: 'local-rice',
      short_desc: 'Aromatic and clean local parboiled rice, stone-free and high quality.',
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
