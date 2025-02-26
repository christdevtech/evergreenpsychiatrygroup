import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
      <div className="container max-w-3xl py-16 px-4">
        <div className="flex flex-col items-center text-center">
          {/* Animated SVG */}
          <div className="w-64 h-64 mb-8 relative">
            <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              {/* Background circle */}
              <circle cx="100" cy="100" r="80" fill="#f0f9ff" className="animate-pulse" />

              {/* Animated magnifying glass */}
              <g
                className="animate-[spin_15s_linear_infinite]"
                style={{ transformOrigin: '100px 100px' }}
              >
                <circle
                  cx="85"
                  cy="85"
                  r="40"
                  stroke="#0ea5e9"
                  strokeWidth="8"
                  fill="white"
                  className="animate-pulse"
                />
                <line
                  x1="115"
                  y1="115"
                  x2="145"
                  y2="145"
                  stroke="#0ea5e9"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </g>

              {/* 404 text */}
              <text
                x="100"
                y="95"
                fontFamily="sans-serif"
                fontSize="24"
                fontWeight="bold"
                textAnchor="middle"
                fill="#0f172a"
                className="animate-bounce"
              >
                404
              </text>
            </svg>

            {/* Animated particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-sky-500 rounded-full animate-ping" />
            <div
              className="absolute top-1/2 right-1/4 w-3 h-3 bg-sky-400 rounded-full animate-ping"
              style={{ animationDelay: '0.5s' }}
            />
            <div
              className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-sky-300 rounded-full animate-ping"
              style={{ animationDelay: '1s' }}
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Page Not Found</h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg">
            Oops! It seems like the page you&apos;re looking for has gone on vacation. Let&apos;s
            get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="default" size="lg" className="rounded-full">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                Return Home
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/search" className="flex items-center gap-2">
                <Search size={18} />
                Search Site
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
