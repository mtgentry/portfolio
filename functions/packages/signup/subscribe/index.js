// Adds a /meet_mason signup to beehiiv. Runs as a DigitalOcean Function so the
// API key stays on the server; the static site only ever sees this endpoint.
function reply(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body
  }
}

async function main(args) {
  if (args.__ow_method && args.__ow_method !== 'post') {
    return reply(405, { error: 'Method not allowed' })
  }

  const { firstName, email } = args

  // UTM tags from the ad link the visitor arrived through. Visitors without
  // them (direct traffic) are attributed to the page itself.
  const utm = (key) => (typeof args[key] === 'string' ? args[key].slice(0, 100) : '')
  const utmSource = utm('utm_source') || 'meet_mason'

  if (!email) {
    return reply(400, { error: 'Email is required' })
  }

  const { BEEHIIV_API_KEY, BEEHIIV_PUBLICATION_ID } = process.env

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    console.error('Missing beehiiv environment variables')
    return reply(500, { error: 'Server configuration error' })
  }

  const customFields = firstName ? [{ name: 'first_name', value: firstName }] : []

  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        utm_source: utmSource,
        utm_medium: utm('utm_medium'),
        utm_campaign: utm('utm_campaign'),
        referring_site: 'masongentry.com/meet_mason',
        custom_fields: customFields
      })
    }
  )

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    console.error('beehiiv API error:', data)
    return reply(502, { error: 'Failed to subscribe' })
  }

  return reply(200, { ok: true })
}

exports.main = main
