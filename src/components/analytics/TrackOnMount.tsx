'use client'

import { useEffect } from 'react'
import { trackMarketingEvent, type MarketingEventName, type EventProperties } from '@/lib/analytics'

interface Props {
  event: MarketingEventName
  props?: EventProperties
}

/** Fire a single analytics event when the component mounts. Use for page-level events. */
export default function TrackOnMount({ event, props = {} }: Props) {
  useEffect(() => {
    trackMarketingEvent(event, props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
