import React from 'react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Patient Intake Form - Evergreen Psychiatry',
  description: 'Complete your patient registration form online',
}

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
