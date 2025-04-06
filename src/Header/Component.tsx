import { HeaderClient } from './Component.client'
import React from 'react'

// import configPromise from '@payload-config'
// import { getPayload } from 'payload'

import type { Header } from '@/payload-types'

// force data fetching to be dynamic dynamic
export const dynamic = 'force-dynamic'

export async function Header() {
  let headerData: Header

  const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/header?depth=4`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await req.json()
  headerData = data as Header

  return <HeaderClient data={headerData} />
}
