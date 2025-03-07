import { Button } from '@payloadcms/ui'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const index = () => {
  return (
    <div className="relative py-24 md:py-32">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/professionals.png"
          alt="Mental Health Professionals"
          fill
          className="object-cover"
        />
      </div>

      <div className="container relative z-10">
        <div className="w-full md:w-3/5 lg:w-1/2">
          <div className="backdrop-blur-md bg-white/30 p-8 md:p-12 rounded-xl border border-white/20 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Professional Support When You Need It Most
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-800 mb-8">
              New patients are currently being accepted for both in-person and telepsychiatry
              visits.
            </p>
            <Link href="/contact">
              <Button className="bg-teal-600 text-white py-4 px-12 rounded-full  hover:bg-slate-700 transition-colors">
                Make an appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
