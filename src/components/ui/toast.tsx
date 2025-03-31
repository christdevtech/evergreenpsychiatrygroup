'use client'

import { Toaster as SonnerToaster, toast } from 'sonner'

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          title: 'group-[.toast]:text-foreground',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          error:
            'group-[.toaster]:bg-red-50 group-[.toaster]:text-red-600 group-[.toaster]:border-red-200',
          success:
            'group-[.toaster]:bg-green-50 group-[.toaster]:text-green-600 group-[.toaster]:border-green-200',
          closeButton: 'group-[.toast]:text-foreground',
        },
      }}
      closeButton
      position="top-right"
      richColors
      {...props}
    />
  )
}

export { Toaster, toast }
