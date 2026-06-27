import type { Metadata } from 'next'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../importMap'

// Next.js 15+ — params and searchParams are Promises.
// searchParams values are string | string[] (Payload does not expect undefined).
type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export async function generateMetadata({ params, searchParams }: Args): Promise<Metadata> {
  return generatePageMetadata({ config, params, searchParams })
}

export default async function AdminPage({ params, searchParams }: Args) {
  return RootPage({ config, importMap, params, searchParams })
}
