import React from 'react'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Faq, FAQBlock as FAQBlockType } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// force dynamic
export const dynamic = 'force-dynamic'

type Props = FAQBlockType & {
  className?: string
}

export const FAQBlock: React.FC<Props> = async (props) => {
  const {
    backgroundColor,
    title,
    description,
    link,
    linkClasses,
    className,
    populateBy,
    categories,
    faqs: selectedFaqs,
    limit,
  } = props

  let faqs: Faq[] = []
  const categoriesToShow = categories?.map((category) => {
    if (typeof category === 'object') {
      return category.id
    }
    return category
  })
  if (populateBy === 'categories') {
    const payload = await getPayload({ config: configPromise })
    if (categoriesToShow?.length && categoriesToShow.length > 0) {
      const faqsToShow = await payload.find({
        collection: 'faqs',
        where: {
          category: {
            in: categoriesToShow,
          },
        },
        depth: 2,
        limit: limit || 6,
      })
      faqs = faqsToShow.docs
    } else {
      const faqsToShow = await payload.find({
        collection: 'faqs',
        depth: 2,
        limit: limit || 6,
      })
      faqs = faqsToShow.docs
    }
  } else {
    faqs = selectedFaqs?.map((faq) => faq as Faq) || []
  }

  return (
    <div className={cn('py-16 md:py-24', backgroundColor || 'bg-white', className)}>
      <div className={cn('container')}>
        <div>
          {title && <h2 className="text-3xl md:text-4xl font-bold md:text-center mb-6">{title}</h2>}

          {description && (
            <div className="mb-10 md:text-center text-lg md:text-xl">
              <RichText data={description} enableGutter={false} enableProse={false} />
            </div>
          )}

          {faqs && faqs.length > 0 && (
            <Accordion type="single" collapsible className="mb-10 divide-y-2 divide-white/90">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="py-6 ">
                  <AccordionTrigger className="text-left md:text-xl lg:text-2xl font-semibold px-4">
                    <span className="text-left font-medium text-xl md:text-2xl lg:text-3xl text-slate-900">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-2">
                    <RichText
                      data={faq.answer}
                      enableGutter={false}
                      enableProse={false}
                      className="text-base md:text-lg lg:text-xl"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {link && (
            <div className="flex justify-center">
              <CMSLink
                {...link}
                appearance={'link'}
                className={cn('inline-flex items-center justify-center text-xl', linkClasses)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
