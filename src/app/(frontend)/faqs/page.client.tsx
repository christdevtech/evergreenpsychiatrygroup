'use client'

import { Category, Faq } from '@/payload-types'
import React, { useState, useMemo } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { X } from 'lucide-react'

interface FaqClientProps {
  faqs: Faq[]
}

const FaqClient: React.FC<FaqClientProps> = ({ faqs }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Extract unique categories from FAQs on the client side
  const categories = useMemo(() => {
    const categorySet = new Set<Category>()

    faqs.forEach((faq) => {
      if (faq.category && typeof faq.category !== 'string') {
        categorySet.add(faq.category)
      }
    })

    return Array.from(categorySet)
  }, [faqs])

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      // Filter by category if one is selected
      if (selectedCategory && faq.category !== selectedCategory) {
        return false
      }

      // Filter by search query if one exists
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const questionMatch = faq.question?.toLowerCase().includes(query)

        // Extract text from rich text content for searching
        let answerMatch = false

        // Helper function to recursively extract text from rich text nodes
        const extractTextFromNode = (node: any): string => {
          if (!node) return ''

          // Direct text node
          if (node.type === 'text' && typeof node.text === 'string') {
            return node.text
          }

          // Node with children (like paragraphs, lists, etc.)
          if (node.children && Array.isArray(node.children)) {
            return node.children.map(extractTextFromNode).join(' ')
          }

          return ''
        }

        if (typeof faq.answer === 'object' && faq.answer.root) {
          // Extract all text from the rich text structure
          const extractedText = extractTextFromNode(faq.answer.root)
          answerMatch = extractedText.toLowerCase().includes(query)
        } else if (typeof faq.answer === 'string') {
          // Handle the case where answer might be a string (though unlikely based on the type)
          answerMatch = (faq.answer as string).toLowerCase().includes(query)
        }

        return questionMatch || answerMatch
      }

      return true
    })
  }, [faqs, selectedCategory, searchQuery])

  return (
    <div className="pt-16 lg:pt-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-600 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-stretch">
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <div
              onClick={() => setSearchQuery('')}
              className="flex items-center justify-center border border-gray-300 rounded-lg p-1 aspect-square"
            >
              <X className="w-6 h-6" />
            </div>
          </div>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 lg:mb-12">
            <Button
              variant={'default'}
              onClick={() => setSelectedCategory(null)}
              className={cn(
                'text-sm hover:bg-teal-400',
                selectedCategory === null ? 'bg-teal-600' : '',
              )}
            >
              All
            </Button>

            {categories.map((category) => (
              <Button
                key={category.id}
                variant={'default'}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'text-sm hover:bg-teal-400',
                  selectedCategory === category ? 'bg-teal-600' : '',
                )}
              >
                {category.title}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="w-full bg-slate-100 py-6 md:py-10 lg:py-16">
        <div className="container">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border border-gray-200 rounded-lg p-2"
                >
                  <AccordionTrigger className="text-left font-medium px-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    {typeof faq.answer === 'object' && (
                      <RichText data={faq.answer} enableGutter={false} />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No FAQs found matching your criteria.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSelectedCategory(null)
                  setSearchQuery('')
                }}
              >
                Clear filters
              </Button>
            </div>
          )}{' '}
        </div>
      </div>
    </div>
  )
}

export default FaqClient
