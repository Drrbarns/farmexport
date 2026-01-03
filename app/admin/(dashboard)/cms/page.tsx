import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Edit } from 'lucide-react'

export const revalidate = 0

export default async function AdminCMSPage() {
  const supabase = await createClient()
  const { data: sections } = await supabase
    .from('page_sections')
    .select('*')
    .order('page_key')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Content Management</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections?.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="capitalize">{section.page_key?.replace('_', ' ')}</CardTitle>
              <CardDescription>Section: {section.title}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/admin/cms/${section.page_key}?section=${section.title}`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Content
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

