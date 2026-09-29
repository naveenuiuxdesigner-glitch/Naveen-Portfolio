import { useEffect, useState } from 'react'

// Your local time in Hyderabad, updated every minute. A small human touch for remote teams.
export function LocalTime({ timeZone }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(now)
  return <time dateTime={now.toISOString()}>{time} IST</time>
}
