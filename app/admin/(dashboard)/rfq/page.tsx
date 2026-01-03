import { createClient } from '@/lib/supabase/server'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export const revalidate = 0

export default async function AdminRFQPage() {
  const supabase = await createClient()
  const { data: rfqs } = await supabase
    .from('rfqs')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inbound RFQs</h1>
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>RFQ No</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Products</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rfqs?.map((rfq) => (
              <TableRow key={rfq.id}>
                <TableCell>{new Date(rfq.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="font-mono text-xs">{rfq.rfq_no}</TableCell>
                <TableCell>{rfq.company_name}</TableCell>
                <TableCell>
                   <div className="flex flex-col text-sm">
                      <span>{rfq.full_name}</span>
                      <span className="text-muted-foreground text-xs">{rfq.email}</span>
                   </div>
                </TableCell>
                <TableCell>
                  <Badge variant={rfq.status === 'NEW' ? 'default' : 'secondary'}>
                    {rfq.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                   {/* Simplified view of requested products */}
                   {Array.isArray(rfq.requested_products) 
                     ? rfq.requested_products.length + ' Items' 
                     : 'Details in View'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

