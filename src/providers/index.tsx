import React from 'react'

// import { HeaderThemeProvider } from './HeaderTheme'
// import { ThemeProvider } from './Theme'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toast'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute={'class'} defaultTheme={'light'}>
        {children}
        <Toaster />
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
