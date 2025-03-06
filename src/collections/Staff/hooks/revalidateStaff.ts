import { Staff } from '@/payload-types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidateStaff: CollectionAfterChangeHook<Staff> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('staff-sitemap')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Staff> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/staff/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('pages-sitemap')
  }

  return doc
}
