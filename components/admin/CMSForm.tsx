'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface CMSFormProps {
  section: any
}

export function CMSForm({ section }: CMSFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [jsonContent, setJsonContent] = useState(JSON.stringify(section.content, null, 2))

  const handleSave = async () => {
    setLoading(true)
    try {
      let parsedContent
      try {
        parsedContent = JSON.parse(jsonContent)
      } catch (e) {
        throw new Error('Invalid JSON format')
      }

      const { error } = await supabase
        .from('page_sections')
        .update({ content: parsedContent, updated_at: new Date().toISOString() })
        .eq('id', section.id)

      if (error) throw error

      toast.success('Content updated successfully')
      router.refresh()
      router.back()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Content (JSON)</Label>
        <Textarea
          value={jsonContent}
          onChange={(e) => setJsonContent(e.target.value)}
          className="font-mono min-h-[500px]"
        />
        <p className="text-sm text-muted-foreground">
          Edit the JSON content structure carefully.
        </p>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </div>
  )
}





