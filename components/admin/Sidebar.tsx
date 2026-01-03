'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  BarChart, Box, FileText, Globe, Image, LayoutDashboard, 
  Settings, Users, LogOut, UserCheck, Package, 
  TrendingUp, Warehouse, Truck, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const sidebarItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  
  // CRM Section
  { section: 'CRM', items: [
    { href: '/admin/crm/leads', label: 'Leads', icon: TrendingUp },
    { href: '/admin/crm/customers', label: 'Customers', icon: Users },
  ]},
  
  // ERP Section
  { section: 'ERP', items: [
    { href: '/admin/erp/orders', label: 'Orders', icon: Package },
    { href: '/admin/erp/inventory', label: 'Inventory', icon: Warehouse },
    { href: '/admin/erp/shipments', label: 'Shipments', icon: Truck },
  ]},
  
  // Content Management
  { section: 'Content', items: [
    { href: '/admin/products', label: 'Products', icon: Box },
    { href: '/admin/rfq', label: 'RFQs', icon: FileText },
    { href: '/admin/cms', label: 'Site Content', icon: Globe },
    { href: '/admin/gallery', label: 'Gallery', icon: Image },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
  ]},
  
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast.success('Signed out successfully')
      router.push('/')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out')
    }
  }

  const renderNavItems = (items: typeof sidebarItems) => {
    return items.map((item, index) => {
      if ('section' in item && item.items) {
        // Render section with nested items
        return (
          <div key={item.section} className="space-y-1">
            {index > 0 && <Separator className="my-2" />}
            <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {item.section}
            </h3>
            {item.items.map((subItem) => (
              <Link
                key={subItem.href}
                href={subItem.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-200",
                  pathname.startsWith(subItem.href) ? "bg-slate-200 text-slate-900" : "text-slate-500"
                )}
              >
                <subItem.icon className="h-4 w-4" />
                {subItem.label}
              </Link>
            ))}
          </div>
        )
      }
      
      // Render regular item
      if ('href' in item) {
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-200",
              pathname === item.href ? "bg-slate-200 text-slate-900" : "text-slate-500"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      }
      
      return null
    })
  }

  const sidebarContent = (
    <>
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold">Admin Panel</h2>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {renderNavItems(sidebarItems)}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full gap-2" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen flex-col border-r bg-slate-100/50 w-64">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-40 bg-white shadow-lg"
          >
            <BarChart className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-slate-100/50">
          <div className="flex h-screen flex-col">
            {sidebarContent}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}





