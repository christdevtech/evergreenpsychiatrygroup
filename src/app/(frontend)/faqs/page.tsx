import FaqClient from './page.client'
import { Faq, Location, EmergenciesBlock as EmergenciesBlockType } from '@/payload-types'
import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import { Button } from '@payloadcms/ui'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { EmergenciesBlock } from '@/blocks/EmergenciesBlock/Component'

//force dynamic
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Frequently Asked Questions | Evergreen Psychiatry Group',
  description:
    'Find answers to common questions about our services, appointments, and mental health care.',
}

export default async function Faqs() {
  const payload = await getPayload({ config: payloadConfig })

  const faqDocs = await payload.find({
    collection: 'faqs',
    limit: 300,
    depth: 2,
  })

  const locationDocs = await payload.find({
    collection: 'locations',
    depth: 2,
  })

  const faqs: Faq[] = faqDocs.docs
  const locations: Location[] = locationDocs.docs
  const emergenciesData: EmergenciesBlockType = {
    blockType: 'emergenciesBlock',
    padding: 'py-16 md:py-24',
    backgroundColor: 'bg-teal-600',
    title: 'Emergencies',

    titleClasses: ['text-4xl', 'font-semibold', 'text-white', 'text-center', 'mb-12'],

    mainText: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Evergreen Psychiatry Group offers outpatient clinic services only with limited office hours. Patients are seen On An Appointment Basis Only. ',
                type: 'text',
                version: 1,
              },

              {
                detail: 0,
                format: 1,
                mode: 'normal',
                style: '',
                text: 'If you are suicidal, It is important that you contact 911 and Go to the Emergency Room Immediately.',
                type: 'text',
                version: 1,
              },

              {
                type: 'linebreak',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },

    mainTextClasses: [
      'text-xl',
      'md:text-2xl',
      'text-white',
      'text-center',
      'mb-16',
      'lg:w-7/10',
      'w-4/5',
    ],

    emergencyCases: {
      title: 'Sample Emergency Cases',

      titleClasses: ['text-2xl', 'md:text-3xl', 'text-white', 'mb-6'],

      cases: [
        {
          text: 'Thinking of harming yourself or dying',
          id: '67c74bb381564529d20c6ea1',
        },

        {
          text: 'Thinking of hurting others',
          id: '67c74bc981564529d20c6ea3',
        },

        {
          text: 'Sudden or different reactions to prescribed medications',
          id: '67c74bd081564529d20c6ea5',
        },
      ],
    },

    suicideHotline: {
      title: 'National Suicide Prevention Lifeline',

      titleClasses: ['text-2xl', 'md:text-3xl', 'text-white', 'mb-6'],

      phoneNumbers: [
        {
          number: '1-800-TALK (8255) / 1-800-273-8255',
          id: '67c74bd981564529d20c6ea7',
        },

        {
          number: '1-800-SUICIDE / 1-800-784-2433',
          id: '67c74be281564529d20c6ea9',
        },
      ],
    },
  }
  return (
    <div>
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
      <FaqClient faqs={faqs} />
      <EmergenciesBlock {...emergenciesData} />
      <div className="bg-cyan-100 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-16 xl:gap-24">
            <div className="col-span-3 flex flex-col gap-4 md:gap-8 lg:gap-12 justify-center">
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-slate-900">
                New patients are currently being accepted for both in-person and telepsychiatry
                visits.
              </h3>
              <Link href="/contact">
                <Button className="bg-white text-slate-900 py-2 px-6 md:py-4 md:px-12 rounded-full hover:text-white hover:bg-slate-700 transition-colors">
                  Make an appointment
                </Button>
              </Link>
            </div>
            <div className="col-span-2">
              <div className="relative w-full aspect-square rounded-full overflow-hidden">
                <Image
                  src="/assets/happyClient.png"
                  className="object-cover"
                  alt="Happy Client"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
