import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, Users, Package, TrendingUp, 
  DollarSign, ShoppingCart, Truck, AlertTriangle,
  Calendar, CheckCircle2, Clock
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const revalidate = 0

export default async function AdminDashboard() {
  const supabase = await createClient()

  // RFQs Stats
  const { count: rfqCount } = await supabase
    .from('rfqs')
    .select('*', { count: 'exact', head: true })

  const { count: newRfqCount } = await supabase
    .from('rfqs')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'NEW')

  // CRM Stats
  const { count: leadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })

  const { count: newLeadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'NEW')

  const { count: qualifiedLeadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'QUALIFIED')

  const { count: customersCount } = await supabase
    .from('customers')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'ACTIVE')

  // ERP Stats
  const { count: ordersCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })

  const { count: pendingOrdersCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .in('status', ['PENDING', 'CONFIRMED', 'IN_PRODUCTION'])

  const { data: orders } = await supabase
    .from('orders')
    .select('total_amount')

  const totalRevenue = orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0

  const { count: shipmentsInTransit } = await supabase
    .from('shipments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'IN_TRANSIT')

  // Inventory Stats
  const { data: inventory } = await supabase
    .from('inventory')
    .select('available_quantity, reserved_quantity, reorder_level')

  const lowStockCount = inventory?.filter(item => 
    item.reorder_level && item.available_quantity <= item.reorder_level
  ).length || 0

  // Recent Activity
  const { data: recentRfqs } = await supabase
    .from('rfqs')
    .select('rfq_no, company_name, created_at, status')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('order_no, created_at, status, total_amount')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your agricultural export business</p>
      </div>

      {/* Key Metrics Row 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">All-time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customersCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+{leadsCount || 0}</span> leads in pipeline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrdersCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {ordersCount || 0} total orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipmentsInTransit || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Shipments on the way</p>
          </CardContent>
        </Card>
      </div>

      {/* CRM & Sales Pipeline */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newLeadsCount || 0}</div>
            <Link href="/admin/crm/leads">
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                View all →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualifiedLeadsCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Hot prospects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New RFQs</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newRfqCount || 0}</div>
            <Link href="/admin/rfq">
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                Review now →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockCount}</div>
            {lowStockCount > 0 && (
              <Link href="/admin/erp/inventory">
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-orange-600">
                  Check inventory →
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent RFQs</CardTitle>
          </CardHeader>
          <CardContent>
            {recentRfqs && recentRfqs.length > 0 ? (
              <div className="space-y-3">
                {recentRfqs.map((rfq) => (
                  <div key={rfq.rfq_no} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{rfq.company_name || 'Unknown'}</p>
                      <p className="text-xs text-muted-foreground">{rfq.rfq_no}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {new Date(rfq.created_at).toLocaleDateString()}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        rfq.status === 'NEW' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {rfq.status}
                      </span>
                    </div>
                  </div>
                ))}
                <Link href="/admin/rfq">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View All RFQs
                  </Button>
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No RFQs yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders && recentOrders.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.order_no} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="text-sm font-medium font-mono">{order.order_no}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${order.total_amount.toLocaleString()}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
                <Link href="/admin/erp/orders">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View All Orders
                  </Button>
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No orders yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button asChild variant="outline" className="h-auto py-4 flex-col">
              <Link href="/admin/crm/leads/new">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span>Add Lead</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col">
              <Link href="/admin/rfq">
                <FileText className="h-6 w-6 mb-2" />
                <span>Review RFQs</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col">
              <Link href="/admin/erp/orders">
                <Package className="h-6 w-6 mb-2" />
                <span>Manage Orders</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col">
              <Link href="/admin/erp/inventory">
                <AlertTriangle className="h-6 w-6 mb-2" />
                <span>Check Inventory</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
