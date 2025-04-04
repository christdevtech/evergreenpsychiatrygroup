'use client'

import React from 'react'

export default function IntakePage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://intake.automedsys.net/registration/patient?clientid=E1FE212CC1EF4D299249ACECB647701B"
        className="w-full h-full border-0"
        title="Patient Intake Form"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
