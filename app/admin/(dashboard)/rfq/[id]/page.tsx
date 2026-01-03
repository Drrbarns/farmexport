import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RFQStatusForm } from '@/components/admin/RFQStatusForm'

export const revalidate = 0

interface RFQDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function RFQDetailPage({ params }: RFQDetailPageProps) {
  const supabase = await createClient()
  const { id } = await params
  const { data: rfq } = await supabase
    .from('rfqs')
    .select('*')
    .eq('id', id)
    .single()

  if (!rfq) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">RFQ Details</h1>
          <p className="text-muted-foreground">RFQ #{rfq.rfq_no}</p>
        </div>
        <Badge variant={rfq.status === 'NEW' ? 'default' : 'secondary'}>
          {rfq.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="font-medium">{rfq.full_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Company</p>
              <p className="font-medium">{rfq.company_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium">{rfq.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="font-medium">{rfq.phone}</p>
            </div>
            {rfq.whatsapp && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
                <p className="font-medium">{rfq.whatsapp}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <p className="font-medium">{rfq.role}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Destination Country</p>
              <p className="font-medium">{rfq.destination_country}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Incoterm</p>
              <p className="font-medium">{rfq.incoterm || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Timeline</p>
              <p className="font-medium">{rfq.timeline}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Submitted</p>
              <p className="font-medium">{new Date(rfq.created_at).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requested Products</CardTitle>
        </CardHeader>
        <CardContent>
          {Array.isArray(rfq.requested_products) && rfq.requested_products.length > 0 ? (
            <div className="space-y-4">
              {rfq.requested_products.map((product: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <p className="font-semibold">{product.product_name || product.name}</p>
                  {product.quantity && (
                    <p className="text-sm text-muted-foreground">
                      Quantity: {product.quantity} {product.unit}
                    </p>
                  )}
                  {product.packaging && (
                    <p className="text-sm text-muted-foreground">
                      Packaging: {product.packaging}
                    </p>
                  )}
                  {product.notes && (
                    <p className="text-sm text-muted-foreground">
                      Notes: {product.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No products specified</p>
          )}
        </CardContent>
      </Card>

      {rfq.compliance_needs && Object.keys(rfq.compliance_needs).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Compliance Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm bg-slate-50 p-4 rounded-lg overflow-auto">
              {JSON.stringify(rfq.compliance_needs, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {rfq.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{rfq.notes}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Internal Management</CardTitle>
        </CardHeader>
        <CardContent>
          <RFQStatusForm rfqId={rfq.id} currentStatus={rfq.status} currentNotes={rfq.internal_notes} />
        </CardContent>
      </Card>
    </div>
  )
}

