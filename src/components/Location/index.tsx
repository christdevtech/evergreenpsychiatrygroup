import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { Location } from '@/payload-types'

const index = ({ location }: { location: Location }) => {
  return (
    <div className="flex flex-col w-full">
      {location.title && (
        <h2 className={cn('text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-white')}>
          In {location.title}
        </h2>
      )}
      <hr className={cn('w-full h-0.5 mb-6', 'bg-slate-200')} />

      {location.address && (
        <div className="flex items-start mb-4">
          <div className="mr-3 mt-1">
            <Image
              src={'/assets/location.svg'}
              alt="Location Address Icon"
              width={32}
              height={32}
              className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            />
          </div>

          <p className={cn('text-lg md:text-xl lg:text-2xl', 'text-white')}>{location.address}</p>
        </div>
      )}

      <div className="flex items-center mb-4">
        <div className="mr-3 mt-1">
          <Image
            src={'/assets/phone.svg'}
            height={32}
            width={32}
            alt="Location Phone Icon"
            className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
          />
        </div>

        <p className={cn('text-lg md:text-xl lg:text-2xl', 'text-white')}>{location.phone}</p>
      </div>

      {location.hours && (
        <div className="flex items-center">
          <div className="mr-3 mt-1">
            <Image
              src={'/assets/calendar.svg'}
              height={32}
              width={32}
              alt="Location Hours Icon"
              className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            />
          </div>

          <p className={cn('text-lg md:text-xl lg:text-2xl', 'text-white')}>{location.hours}</p>
        </div>
      )}
    </div>
  )
}

export default index
