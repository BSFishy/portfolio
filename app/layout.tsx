import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Centered from '@/layout/Centered'

export const metadata: Metadata = {
  title: 'Matt Provost',
  description: 'My portfolio',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Centered>{children}</Centered>
  )
}
