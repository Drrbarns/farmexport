'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send, CheckCircle2 } from 'lucide-react'
import * as motion from "framer-motion/client"

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSent(true)
    }

    if (isSent) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 space-y-4 bg-primary/5 rounded-2xl border-2 border-primary/20"
            >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground max-w-xs">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <Button
                    variant="outline"
                    onClick={() => setIsSent(false)}
                    className="mt-4"
                >
                    Send Another Message
                </Button>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border shadow-sm h-full">
            <div className="space-y-2 mb-6">
                <h3 className="text-xl font-semibold">Send us a message</h3>
                <p className="text-sm text-muted-foreground">
                    Fill out the form below and we'll direct your inquiry to the right department.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@company.com" required />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Product Inquiry, Partnership, etc." required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    placeholder="How can we help you today?"
                    className="min-h-[150px] resize-none"
                    required
                />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                    <>Sending...</>
                ) : (
                    <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                    </>
                )}
            </Button>
        </form>
    )
}
