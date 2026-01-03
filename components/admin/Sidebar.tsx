'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BarChart, Box, FileText, Globe, Image, LayoutDashboard, Settings, Users, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const sidebarItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Box },
  { href: '/admin/rfq', label: 'RFQs', icon: FileText },
  { href: '/admin/cms', label: 'Site Content', icon: Globe },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

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

  return (
    <div className="flex h-screen flex-col border-r bg-slate-100/50 w-64 hidden md:flex">
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold">Admin Panel</h2>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-200",
                pathname === item.href ? "bg-slate-200 text-slate-900" : "text-slate-500"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full gap-2" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}





