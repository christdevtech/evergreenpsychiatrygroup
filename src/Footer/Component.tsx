import { FooterClient } from './Component.client'
import React from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Footer } from '@/payload-types'

// import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
// import { CMSLink } from '@/components/Link'
// import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const payload = await getPayload({ config: configPromise })
  const footerData: Footer = await payload.findGlobal({ slug: 'footer', depth: 1 })

  return <FooterClient data={footerData} />
}
