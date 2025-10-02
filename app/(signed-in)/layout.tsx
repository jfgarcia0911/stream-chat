'use client'
import UserSyncWrapper from '@/components/UserSyncWrapper'
import React from 'react'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <UserSyncWrapper>{children}</UserSyncWrapper>
  )
}
