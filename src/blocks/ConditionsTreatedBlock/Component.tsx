import React from 'react'
import { Circle } from 'lucide-react'
import { cn } from '@/utilities/ui'

// Define the types for our block since it's not yet in payload-types
interface ConditionItem {
  name: string
}

interface ColumnSettings {
  default: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}

interface ConditionsTreatedBlockProps {
  backgroundColor?: string
  padding?: string
  title?: string
  titleClasses?: string[]
  subtitle?: string
  subtitleClasses?: string[]
  columns?: ColumnSettings
  conditions?: ConditionItem[]
  conditionItemClasses?: string[]
}

type Props = ConditionsTreatedBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const ConditionsTreatedBlock: React.FC<Props> = (props) => {
  const {
    backgroundColor = 'bg-teal-700',
    padding = 'py-16 md:py-24',
    title = 'Additional conditions we treat',
    titleClasses = ['text-4xl', 'md:text-5xl', 'font-bold', 'mb-6', 'text-white'],
    subtitle = 'At Evergreen Psychiatry we extend our care to a broader range of mental health conditions to support your mental wellbeing.',
    subtitleClasses = ['text-xl', 'md:text-2xl', 'mb-12', 'text-white', 'text-center', 'mx-auto'],
    columns = { default: '1', sm: '2', md: '2', lg: '3', xl: '4', '2xl': '4' },
    conditions = [],
    conditionItemClasses = ['text-white', 'text-lg', 'mb-4', 'flex', 'items-center', 'gap-2'],
    className,
  } = props

  // Generate the grid columns class based on the columns settings
  const gridColsClass = [
    `grid-cols-${columns.default || '1'}`,
    columns.sm ? `sm:grid-cols-${columns.sm}` : '',
    columns.md ? `md:grid-cols-${columns.md}` : '',
    columns.lg ? `lg:grid-cols-${columns.lg}` : '',
    columns.xl ? `xl:grid-cols-${columns.xl}` : '',
    columns['2xl'] ? `2xl:grid-cols-${columns['2xl']}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={cn('relative', backgroundColor, padding, className)}>
      <div className="container">
        {title && <h2 className={cn(titleClasses)}>{title}</h2>}

        {subtitle && (
          <div className="flex justify-center max-w-4xl mx-auto">
            <p className={cn(subtitleClasses)}>{subtitle}</p>
          </div>
        )}

        {conditions && conditions.length > 0 && (
          <div className={cn('grid gap-6 lg:gap-12 gap-y-8', gridColsClass)}>
            {conditions.map((condition, index) => (
              <div key={index} className={cn(conditionItemClasses, 'flex items-start gap-4')}>
                <Circle fill="currentColor" className="mt-1 min-w-4 min-h-4 w-4 h-4" />
                <span>{condition.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
