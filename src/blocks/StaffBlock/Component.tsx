import type { Staff, StaffBlock as StaffBlockProps } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { CollectionStaff } from '@/components/CollectionStaff'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

export const StaffBlock: React.FC<StaffBlockProps & { id?: string }> = async (props) => {
  const {
    id,
    title,
    introContent,
    populateBy,
    roles,
    limit: limitFromProps,
    selectedDocs,
    seeMoreLink,
    link,
    sectionBGColor,
    cardBGColor,
    padding,
  } = props

  const limit = limitFromProps || 20
  let staff: Staff[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedRoles = roles?.map((role) => role) || []

    const fetchedStaff = await payload.find({
      collection: 'staff',
      depth: 2, // Increase depth to get related specialties and locations
      limit,
      ...(flattenedRoles.length > 0
        ? {
            where: {
              role: {
                in: flattenedRoles,
              },
            },
          }
        : {}),
    })

    staff = fetchedStaff.docs as Staff[]
  } else if (populateBy === 'selection' && selectedDocs?.length) {
    // console.log('selectedDocs:', selectedDocs) to check the default populated fields
    // Handle the relationship field structure properly
    const filteredSelectedStaff = selectedDocs
      .map((staffMember) => {
        if (
          typeof staffMember === 'object' &&
          staffMember.value &&
          typeof staffMember.value === 'object'
        ) {
          return staffMember.value as Staff
        }
        return null
      })
      .filter(Boolean) as Staff[]

    staff = filteredSelectedStaff
  }

  return (
    <div className={cn(padding, sectionBGColor)} id={`block-${id}`}>
      {(title || introContent) && (
        <div className="container text-center mb-16">
          {title && <h2 className="text-2xl md:text-3xl font-bold mb-8 lg:mb-12">{title}</h2>}
          {introContent && (
            <RichText
              className="ms-0 max-w-[48rem] m-auto text-lg"
              data={introContent}
              enableGutter={false}
            />
          )}
        </div>
      )}
      <CollectionStaff staff={staff} cardBGColor={cardBGColor} />
      {seeMoreLink && link?.url && (
        <div className="container text-center mt-16">
          <Button
            asChild
            className={
              'bg-white text-black border-2 border-black hover:bg-black hover:text-white px-10 py-5 text-lg rounded-full'
            }
          >
            <Link href={link.url} className="flex items-center gap-2 hover:gap-4 transition-all">
              {link.label || 'See More'} <ArrowRight className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
