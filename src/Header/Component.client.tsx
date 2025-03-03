'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Button } from '@heroui/react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  // const pathname = usePathname()

  return (
    <header className="bg-[hsl(var(--header-bg))] relative z-20">
      <div className="container py-4 flex md:flex-col justify-between items-center md:items-stretch gap-1 md:gap-0">
        <div className="grow flex justify-between items-center md:border-b-2 md:pb-4 md:mb-4">
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>

          <div className="bg-white rounded-lg md:rounded-full px-1.5 py-1.5 md:py-1 md:px-1 items-center md:flex md:p-1 gap-1">
            <span className="md:hidden inline px-4">Book Now</span>
            <span className="hidden md:inline px-2 text-sm align-middle text-slate-900 md:text-slate-900">
              Make Appointment
            </span>
            <Button size="sm" radius="full" color="success" className="hidden md:block">
              Contact us
            </Button>
          </div>
        </div>
        <HeaderNav classNames="flex-none" data={data} />
      </div>
    </header>
  )
}
