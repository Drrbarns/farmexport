'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { updatePageSection } from '@/actions/cms'

interface CMSFormProps {
  section: any
}

export function CMSForm({ section }: CMSFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [jsonContent, setJsonContent] = useState(JSON.stringify(section.content, null, 2))
  const [jsonValid, setJsonValid] = useState(true)
  const [jsonError, setJsonError] = useState<string | null>(null)

  const validateJson = (value: string) => {
    try {
      JSON.parse(value)
      setJsonValid(true)
      setJsonError(null)
      return true
    } catch (e: any) {
      setJsonValid(false)
      setJsonError(e.message)
      return false
    }
  }

  const handleChange = (value: string) => {
    setJsonContent(value)
    validateJson(value)
  }

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonContent)
      setJsonContent(JSON.stringify(parsed, null, 2))
      setJsonValid(true)
      setJsonError(null)
    } catch (e: any) {
      toast.error('Cannot format: Invalid JSON')
    }
  }

  const handleSave = async () => {
    if (!validateJson(jsonContent)) {
      toast.error('Please fix JSON errors before saving')
      return
    }

    setLoading(true)
    try {
      const parsedContent = JSON.parse(jsonContent)
      
      const result = await updatePageSection(section.id, parsedContent)

      if (result.success) {
        toast.success('Content updated successfully')
        router.refresh()
        router.back()
      } else {
        toast.error(result.error || 'Failed to update content')
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold capitalize">
            {section.page_key?.replace('_', ' ')} - {section.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            Edit the JSON content structure for this section
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={formatJson}>
          Format JSON
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Content (JSON)</Label>
          <div className="flex items-center gap-2 text-sm">
            {jsonValid ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-green-600">Valid JSON</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-600">Invalid JSON</span>
              </>
            )}
          </div>
        </div>
        
        <Textarea
          value={jsonContent}
          onChange={(e) => handleChange(e.target.value)}
          className={`font-mono text-sm min-h-[500px] ${
            !jsonValid ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
          spellCheck={false}
        />
        
        {jsonError && (
          <p className="text-sm text-red-500 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {jsonError}
          </p>
        )}
        
        <div className="bg-muted p-4 rounded-md">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Tips:</strong>
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Ensure all strings are wrapped in double quotes</li>
            <li>Arrays use square brackets: ["item1", "item2"]</li>
            <li>Objects use curly braces: {"{"}"key": "value"{"}"}</li>
            <li>No trailing commas after the last item</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={loading || !jsonValid}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </div>
  )
}
