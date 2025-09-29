import { usePathname } from 'next/navigation'
import React from 'react'

export default function Header() {
    const pathname = usePathname()
    const isDashboard = pathname.startsWith("/dashboard")
  return (
    <header>
       
    </header>
  )
}
