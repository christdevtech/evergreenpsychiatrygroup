import { FooterClient } from './Component.client'
import React from 'react'

// import configPromise from '@payload-config'
// import { getPayload } from 'payload'

import type { Footer } from '@/payload-types'

//force dynamic
export const dynamic = 'force-dynamic'

export async function Footer() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/footer?depth=4`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await req.json()
  const footerData = data as Footer

  return <FooterClient data={footerData} />
}
