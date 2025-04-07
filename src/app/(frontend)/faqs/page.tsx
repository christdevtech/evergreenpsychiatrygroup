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

  const faqs: Faq[] = faqDocs.docs
  const emergenciesData: EmergenciesBlockType = {
    blockType: 'emergenciesBlock',
    padding: 'py-16 md:py-24',
    backgroundColor: 'bg-teal-600',
    title: 'Emergency and Support <br />Resources',

    titleClasses: [
      'text-3xl',
      'md:text-4xl',
      'font-semibold',
      'text-white',
      'md:text-center',
      'mb-12',
    ],

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
                text: 'Evergreen Psychiatry Group offers outpatient clinic services only with limited office hours. Patients are seen on an appointment basis only. In case of an emergency, please browse our emergency resources to find a service that suits your needs. ',
                type: 'text',
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
      'md:text-center',
      'mb-16',
      'lg:w-7/10',
      'md:w-4/5',
      'font-medium',
      'md:mx-auto',
    ],
    subtitle: 'Emergencies',

    subtitleClasses: ['text-2xl', 'md:text-3xl', 'font-semibold', 'text-white', 'mb-12'],

    subText: {
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

    subTextClasses: ['text-xl', 'md:text-2xl', 'text-white', 'mb-12'],

    emergencyCases: {
      title: 'Sample Emergency Cases',

      titleClasses: ['text-xl', 'md:text-2xl', 'lg:text-3xl', 'font-semibold', 'text-white'],

      cases: [
        {
          text: 'Thinking of harming yourself or dying',
          id: '67e46c993b1b99004bf3e8ad',
        },

        {
          text: 'Thinking of hurting others',
          id: '67e46ca03b1b99004bf3e8af',
        },

        {
          text: 'Sudden or different reactions to prescribed medications',
          id: '67e46ca73b1b99004bf3e8b1',
        },
      ],
    },

    suicideHotline: {
      title: 'National Suicide Prevention Lifeline',

      titleClasses: ['text-xl', 'md:text-2xl', 'lg:text-3xl', 'font-semibold', 'text-white'],

      phoneNumbers: [
        {
          number: '1-800-TALK (8255) / 1-800-273-8255',
          id: '67e46cb33b1b99004bf3e8b3',
        },

        {
          number: '1-800-SUICIDE / 1-800-784-2433',
          id: '67e46cbd3b1b99004bf3e8b5',
        },
      ],
    },

    localizedResources: [
      {
        title: 'Guilford County Human Resources',

        titleClasses: ['text-2xl', 'md:text-3xl', 'font-semibold', 'text-white', 'mb-8'],

        description: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'For 24/7 walk-up access to mental health services for Guilford County children (4+), adolescents, and adults, please visit the new Guilford County Behavioural Health Center for immediate assistance with mental health and substance abuse issues.',
                    type: 'text',
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

        descriptionClasses: ['text-xl', 'md:text-2xl', 'text-white', 'font-light', 'mb-4'],

        resources: [
          {
            icon: {
              id: '67e4dfa3cfeef98b11172cb0',
              alt: 'location Icon',
              filename: 'locationCyan.svg',
              mimeType: 'image/svg+xml',
              filesize: 624,
              width: 84,
              height: 108,

              sizes: {
                thumbnail: {
                  url: null,
                },

                square: {
                  url: null,
                },

                small: {
                  url: null,
                },

                medium: {
                  url: null,
                },

                large: {
                  url: null,
                },

                xlarge: {
                  url: null,
                },

                og: {
                  url: null,
                },
              },
              createdAt: '2025-03-27T05:18:27.304Z',
              updatedAt: '2025-03-27T05:18:27.304Z',
              url: '/api/media/file/locationCyan.svg',
              thumbnailURL: null,
            },
            link: '#',
            text: '931 Third Street in Greensboro, NC.',
            id: '67e474932e9f3cd63ae56985',
          },

          {
            icon: {
              id: '67e4dfa2cfeef98b11172cac',
              alt: 'Phone Icon',
              filename: 'phoneCyan.svg',
              mimeType: 'image/svg+xml',
              filesize: 753,
              width: 79,
              height: 80,

              sizes: {
                thumbnail: {
                  url: null,
                },

                square: {
                  url: null,
                },

                small: {
                  url: null,
                },

                medium: {
                  url: null,
                },

                large: {
                  url: null,
                },

                xlarge: {
                  url: null,
                },

                og: {
                  url: null,
                },
              },
              createdAt: '2025-03-27T05:18:26.987Z',
              updatedAt: '2025-03-27T05:18:26.987Z',
              url: '/api/media/file/phoneCyan.svg',
              thumbnailURL: null,
            },
            link: 'tel:(336) 890-2700',
            text: '24-hour Helpline at (336) 890-2700',
            id: '67e474ae2e9f3cd63ae5698a',
          },
        ],
        id: '67e472532e9f3cd63ae56975',
      },

      {
        title: 'Wake County Human Services',

        titleClasses: ['text-2xl', 'md:text-3xl', 'font-semibold', 'text-white', 'mb-8'],

        description: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Wake County Human Services consolidates programs including social services, public health, mental health, job training, child support, housing, and transportation. They can provide information and assistance regarding county mental health programs.',
                    type: 'text',
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

        descriptionClasses: ['text-xl', 'md:text-2xl', 'text-white', 'font-light', 'mb-4'],

        resources: [
          {
            icon: {
              id: '67e4dfa2cfeef98b11172cac',
              alt: 'Phone Icon',
              filename: 'phoneCyan.svg',
              mimeType: 'image/svg+xml',
              filesize: 753,
              width: 79,
              height: 80,

              sizes: {
                thumbnail: {
                  url: null,
                },

                square: {
                  url: null,
                },

                small: {
                  url: null,
                },

                medium: {
                  url: null,
                },

                large: {
                  url: null,
                },

                xlarge: {
                  url: null,
                },

                og: {
                  url: null,
                },
              },
              createdAt: '2025-03-27T05:18:26.987Z',
              updatedAt: '2025-03-27T05:18:26.987Z',
              url: '/api/media/file/phoneCyan.svg',
              thumbnailURL: null,
            },
            link: 'tel:919-212-7000',
            text: ' Helpline : 919-212-7000',
            id: '67e474ee2e9f3cd63ae5698d',
          },

          {
            icon: {
              id: '67e4dfa2cfeef98b11172ca8',
              alt: 'Web Link',
              filename: 'Cursor Square.svg',
              mimeType: 'image/svg+xml',
              filesize: 1251,
              width: 142,
              height: 142,

              sizes: {
                thumbnail: {
                  url: null,
                },

                square: {
                  url: null,
                },

                small: {
                  url: null,
                },

                medium: {
                  url: null,
                },

                large: {
                  url: null,
                },

                xlarge: {
                  url: null,
                },

                og: {
                  url: null,
                },
              },
              createdAt: '2025-03-27T05:18:26.648Z',
              updatedAt: '2025-03-27T05:18:26.648Z',
              url: '/api/media/file/Cursor%20Square.svg',
              thumbnailURL: null,
            },
            link: 'https://www.wake.gov',
            text: 'www.wake.gov',
            id: '67e475082e9f3cd63ae56992',
          },
        ],
        id: '67e4734e2e9f3cd63ae5697f',
      },
    ],
    id: '67e46c593b1b99004bf3e8ab',
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
