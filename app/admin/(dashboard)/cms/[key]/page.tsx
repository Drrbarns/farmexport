import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { CMSForm } from '@/components/admin/CMSForm'

export const revalidate = 0

interface EditCMSPageProps {
  params: { key: string }
  searchParams: { section?: string }
}

export default async function EditCMSPage({ params, searchParams }: EditCMSPageProps) {
  const supabase = await createClient()
  const { key } = params
  const sectionTitle = searchParams.section

  let query = supabase
    .from('page_sections')
    .select('*')
    .eq('page_key', key)

  if (sectionTitle) {
    query = query.eq('title', sectionTitle)
  }

  const { data: section } = await query.single()

  if (!section) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 capitalize">Edit {key.replace('_', ' ')} Content</h1>
      <CMSForm section={section} />
    </div>
  )
}

