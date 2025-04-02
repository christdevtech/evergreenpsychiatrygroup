'use client'

import React, { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType; classNames?: string }> = ({
  data,
  classNames,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([])

  const navItems = data?.navItems || []
  const dropdownClasses =
    'text-lg px-2 py-1 rounded-md transition-colors text-white font-semibold no-underline hover:no-underline'
  const dropdownItemClasses =
    'text-lg px-2 py-1 rounded-md transition-colors font-semibold underline underline-offset-4 no-underline hover:no-underline'

  const toggleDropdown = (index: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  const handleMobileItemClick = () => {
    setIsMobileMenuOpen(false)
    setOpenDropdowns([])
  }

  return (
    <div className={cn(classNames)}>
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative ml-2 p-0 focus:outline-none group flex justify-end items-center"
          aria-label="Toggle mobile menu"
        >
          <div className="relative z-10">
            {isMobileMenuOpen ? (
              <X color="white" className="h-6 w-6" />
            ) : (
              <Menu color="white" className="h-6 w-6" />
            )}
          </div>
          {/* Button hover effect */}
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            'fixed inset-0 backdrop-blur-sm bg-black/60 z-40 transition-all duration-500',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Content */}
        <div
          className={cn(
            'fixed top-0 left-0 h-full w-[300px] sm:w-[400px] bg-gradient-to-b from-teal-950 to-emerald-950 z-50 transform transition-all duration-500 ease-out shadow-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          {/* Decorative top gradient */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          <nav className="flex flex-col gap-6 mt-16 p-6 relative">
            {/* Background decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full blur-3xl" />

            {navItems.map(({ link, dropdown, type, id }) => {
              if (type === 'link') {
                return (
                  <div
                    key={`1-${id}`}
                    onClick={handleMobileItemClick}
                    className="relative group overflow-hidden rounded-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                    <CMSLink
                      {...link?.link}
                      appearance="link"
                      className="relative block px-4 pt-2 pb-4 text-white/90 hover:text-white transition-colors duration-300 text-xl"
                    />
                  </div>
                )
              }
              if (type === 'dropdown') {
                const isOpen = openDropdowns.includes(id ? id : 'all')

                return (
                  <div key={`2-${id}`} className="space-y-3">
                    <button
                      onClick={() => toggleDropdown(id || '')}
                      className="w-full px-4 py-2 flex items-center justify-between text-white/90 hover:text-white transition-colors duration-300 group rounded-lg relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />

                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMobileItemClick()
                        }}
                      >
                        <CMSLink
                          {...dropdown?.link}
                          appearance="link"
                          className="relative text-xl text-white/90 hover:text-white"
                        />
                      </div>

                      <ChevronDown
                        className={cn(
                          'w-6 h-6 transition-transform duration-500',
                          isOpen ? 'rotate-180' : '',
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-500 ease-in-out',
                        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
                      )}
                    >
                      <div className="pl-4 space-y-2 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-violet-500/50 before:via-cyan-500/50 before:to-violet-500/50">
                        {dropdown?.links?.map(({ link }, j) => (
                          <div
                            key={`3-${j}`}
                            onClick={handleMobileItemClick}
                            className="relative group/item overflow-hidden rounded-lg"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 translate-x-[-100%] group-hover/item:translate-x-0 transition-transform duration-300" />
                            <CMSLink
                              {...link}
                              appearance="link"
                              className="relative block px-4 py-2 text-white/80 hover:text-white transition-colors duration-300 text-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </nav>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-2 items-center justify-between">
        {navItems.map(({ link, dropdown, type, id }, i) => {
          if (type === 'link') {
            return <CMSLink key={i} {...link?.link} appearance="link" className={dropdownClasses} />
          }
          if (type === 'dropdown' && dropdown?.links) {
            return (
              <div key={`4-${id}`} className="relative group">
                <CMSLink
                  {...dropdown.link}
                  appearance="link"
                  className={cn(
                    dropdownClasses,
                    'flex gap-2 items-center cursor-pointer group-hover:text-gray-200',
                  )}
                >
                  <ChevronDown className="w-4 h-4 transition-transform duration-500 ease-in-out group-hover:rotate-180" />
                </CMSLink>

                {/* Dropdown Content */}
                <div className="absolute left-0 top-full pt-2 opacity-0 -translate-y-2 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <div className="bg-white rounded-xl p-2 min-w-56 shadow-lg backdrop-blur-sm bg-opacity-90 border border-white/20">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 rounded-xl bg-white/5 backdrop-blur-xl -z-10" />
                    <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-xl blur-xl -z-20 group-hover:animate-pulse" />

                    {/* Links */}
                    <div className="relative space-y-1">
                      {dropdown.links?.map(({ link }) => (
                        <div
                          key={`5-${id}`}
                          className="relative rounded-lg overflow-hidden group/item"
                        >
                          {/* Hover Effect Background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 ease-in-out" />

                          <CMSLink
                            {...link}
                            appearance="link"
                            className={cn(
                              dropdownItemClasses,
                              'relative z-10 block py-2 px-3 text-gray-900 group-hover/item:text-white transition-colors duration-300 ease-in-out',
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </nav>
    </div>
  )
}
