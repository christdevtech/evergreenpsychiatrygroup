'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { toast } from '@/components/ui/toast'
import { Loader2, X } from 'lucide-react'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
  bgColor?: string
  newConfirmationMessage?: string
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    bgColor,
    newConfirmationMessage,
  } = props

  // Create an empty default values object based on the form fields
  const getDefaultValues = () => {
    const defaultValues: Record<string, any> = {}

    if (formFromProps.fields) {
      formFromProps.fields.forEach((field) => {
        // Use field.blockName as the key for each form field
        if (field.blockName) {
          defaultValues[field.blockName] = ''
        }
      })
    }

    return defaultValues
  }

  const formMethods = useForm({
    defaultValues: getDefaultValues(),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Record<string, any>) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            const errorMessage = res.errors?.[0]?.message || 'Internal Server Error'

            setError({
              message: errorMessage,
              status: res.status,
            })

            // Show error toast
            toast.error(errorMessage, {
              description: `Error ${res.status || 500}`,
              duration: Infinity,
              action: {
                label: 'Close',
                onClick: () => {},
              },
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          // Reset the form after successful submission with empty values
          reset(getDefaultValues())

          // Show success toast
          if (newConfirmationMessage) {
            toast.success('Thank you for your message', {
              description: newConfirmationMessage,
              duration: Infinity,
              action: {
                label: 'Close',
                onClick: () => {},
              },
              position: 'top-center',
            })
          }

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)

          const errorMessage = 'Something went wrong.'

          setError({
            message: errorMessage,
          })

          // Show error toast
          toast.error(errorMessage, {
            description: 'Please try again later',
            duration: Infinity,
            action: {
              label: 'Close',
              onClick: () => {},
            },
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, confirmationMessage, reset],
  )

  return (
    <div className="container mb-8">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className={cn(bgColor)}>
        <FormProvider {...formMethods}>
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0 grid grid-cols-12 gap-6 md:gap-8 lg:gap-10">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                          className="mb-6 last:mb-0 bg-slate-50"
                          key={index}
                        />
                      )
                    }
                    return null
                  })}
              </div>

              <Button
                form={formID}
                type="submit"
                variant="default"
                disabled={isLoading}
                className="bg-green-600 text-white text-lg px-12 py-6 rounded-lg mt-8"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    Submitting <Loader2 className="animate-spin" />
                  </div>
                ) : (
                  submitButtonLabel
                )}
              </Button>
            </form>
          }
        </FormProvider>
      </div>
    </div>
  )
}
