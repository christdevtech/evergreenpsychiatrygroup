'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  A11y,
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  EffectCards,
  EffectCoverflow,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/autoplay'
import 'swiper/css/keyboard'
import 'swiper/css/mousewheel'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-coverflow'

import './MySwiper.css'
import { Testimonial } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import RichText from '../RichText'
import { Star } from 'lucide-react'
import { Avatar } from '../ui/avatar'

export default function MySwiper({
  testimonials,
  testimonialBGColor,
}: {
  testimonials: Testimonial[]
  testimonialBGColor: string | null
}) {
  const swiperParameters = {
    modules: [A11y, Autoplay, Keyboard, Mousewheel, Navigation, EffectCoverflow],
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    speed: 800,
    navigation: true,
    autoplay: { enabled: true, delay: 4800, pauseOnMouseEnter: true },
    keyboard: { enabled: true },
    mousewheel: { enabled: true },
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    spaceBetween: 30,
  }
  return (
    <div className="h-full pb-16">
      <Swiper {...swiperParameters}>
        {testimonials.map((testimonial) => (
          <SwiperSlide
            key={testimonial.id}
            className={cn(
              'p-8 md:p-12 xl:p-16 rounded-2xl h-full flex flex-col gap-4 md:gap-6 xl:gap-8',
              testimonialBGColor,
            )}
          >
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32 border-2 border-white shadow-sm">
                <Media
                  resource={testimonial.image}
                  imgClassName="w-full h-full object-cover"
                  alt={testimonial.name}
                />
              </Avatar>
            </div>
            <div className="my-4 flex-grow">
              <RichText
                data={testimonial.testimony}
                className="text-center text-lg md:text-xl"
                enableGutter={false}
                enableProse={false}
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-xl md:text-2xl font-bold mb-1">{testimonial.name}</h3>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500" />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
