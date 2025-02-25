import { HeaderClient } from './Component.client'
import React from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Header } from '@/payload-types'

export async function Header() {
  const payload = await getPayload({ config: configPromise })
  const headerData: Header = await payload.findGlobal({ slug: 'header', depth: 1 })

  return <HeaderClient data={headerData} />
}
