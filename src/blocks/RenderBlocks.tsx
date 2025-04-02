import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ImageTextBlock } from '@/blocks/ImageTextBlock/Component'
import { FullWidthImageText } from '@/blocks/FullWidthImageText/Component'
import { ConditionsBlock } from '@/blocks/ConditionsBlock/Component'
import { FAQBlock } from '@/blocks/FAQBlock/Component'
import { PillarsBlock } from '@/blocks/PillarsBlock/Component'
import { CoreServicesBlock } from '@/blocks/CoreServicesBlock/Component'
import { EmergenciesBlock } from '@/blocks/EmergenciesBlock/Component'
import { StaffBlock } from './StaffBlock/Component'
import { BookingBlock } from './BookingBlock/Component'
import { AnchorBlock } from './AnchorBlock/Component'
import { PatientRegistrationBlock } from './PatientRegistrationBlock/Component'
import { ServiceTabsBlock } from './ServiceTabsBlock/Component'
import { ConditionsTreatedBlock } from './ConditionsTreatedBlock/Component'
import { TestimonialsBlock } from './TestimonialsBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  imageTextBlock: ImageTextBlock,
  fullWidthImageText: FullWidthImageText,
  conditionsBlock: ConditionsBlock,
  faqBlock: FAQBlock,
  pillarsBlock: PillarsBlock,
  coreServicesBlock: CoreServicesBlock,
  emergenciesBlock: EmergenciesBlock,
  staff: StaffBlock,
  staffBlock: StaffBlock,
  bookingBlock: BookingBlock,
  anchorBlock: AnchorBlock,
  patientRegistrationBlock: PatientRegistrationBlock,
  serviceTabsBlock: ServiceTabsBlock,
  conditionsTreatedBlock: ConditionsTreatedBlock,
  testimonialsBlock: TestimonialsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index} className={`z-${index + 1}`}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
