'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitRFQ(formData: any) {
  const supabase = await createClient()

  // Generate RFQ No (simple timestamp based)
  const rfqNo = `RFQ-${Date.now().toString().slice(-6)}`

  const { error } = await supabase.from('rfqs').insert({
    rfq_no: rfqNo,
    full_name: formData.full_name,
    company_name: formData.company_name,
    email: formData.email,
    phone: formData.phone,
    whatsapp: formData.whatsapp,
    role: formData.role,
    destination_country: formData.destination_country,
    incoterm: formData.incoterm,
    timeline: formData.timeline,
    requested_products: formData.products, // Array of { id, name, qty, packaging }
    compliance_needs: {
      use: formData.intended_use,
      require_coa: formData.require_coa
    },
    notes: formData.notes
  })

  if (error) {
    console.error('RFQ Error:', error)
    return { success: false, message: 'Failed to submit RFQ. Please try again.' }
  }

  // Placeholder for Email Notification (Resend)
  // await resend.emails.send({ ... })

  revalidatePath('/admin/rfq')
  return { success: true, rfqNo }
}

