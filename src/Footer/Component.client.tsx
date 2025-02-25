'use client'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import type { Footer } from '@/payload-types'
import { FacebookIcon, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

const socialIcons = {
  linkedin: Linkedin,
  facebook: FacebookIcon,
  twitter: Twitter,
  instagram: Instagram,
}

interface FooterClientProps {
  data: Footer
}

export function FooterClient({ data }: FooterClientProps) {
  return (
    <footer className="mt-auto bg-[hsl(var(--header-bg))]  text-white">
      {/* Logo and Description Section */}
      <div className="container py-12">
        <div className="mb-12">
          <Link href="/" className="mb-6">
            <Logo />
          </Link>
        </div>

        {/* Links Columns Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div className="col-span-2">
            <p className="md:max-w-[400px] text-gray-300 text-lg">{data.description}</p>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">{data.columnOne.title}</h3>
            <ul className="space-y-2">
              {data.columnOne.links?.map((item, i) => (
                <li key={i}>
                  <CMSLink
                    className="text-gray-300 hover:text-white transition-colors"
                    {...item.link}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">{data.columnTwo.title}</h3>
            <ul className="space-y-2">
              {data.columnTwo.links?.map((item, i) => (
                <li key={i}>
                  <CMSLink
                    className="text-gray-300 hover:text-white transition-colors"
                    {...item.link}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section with Copyright and Social Links */}
        <div className="border-t border-gray-50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-100 text-sm lg:text-base">
              {`${data.copyrightText} - ${new Date().getFullYear()} )`}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Bottom Links */}
              <nav className="flex gap-4">
                {data.bottomLinks?.map((item, i) => (
                  <CMSLink
                    key={i}
                    className="text-gray-100 hover:text-white transition-colors text-sm lg:text-base"
                    {...item.link}
                  />
                ))}
              </nav>

              {/* Social Icons */}
              <div className="flex gap-2 justify-center md:justify-start">
                {data.socialLinks?.map((social, i) => {
                  const Icon = socialIcons[social.platform]
                  return (
                    <Link
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-100 hover:text-white transition-colors h-22 w-22 rounded-full bg-slate-700 hover:bg-slate-900 p-2"
                    >
                      <Icon size={18} />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
