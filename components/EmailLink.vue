<template lang="pug">
  //- Empty in the server-rendered HTML, so scrapers reading the page source
  //- never see the address; the browser fills it in once the page loads
  a.email-link(v-if="address && link" :href="`mailto:${address}`") {{ address }}
  span.email-link(v-else-if="address") {{ address }}
  span.email-link(v-else aria-hidden="true")
</template>

<script>
// Keeps email addresses out of the HTML that spam bots harvest. Each address
// is stored reversed and base64-encoded, and only decoded in the browser after
// the page loads (most harvesters read raw HTML and never run JavaScript).
// Visitors see a normal address and mailto link. To add an address, encode it:
//   btoa('you@example.com'.split('').reverse().join(''))
const ADDRESSES = {
  site: 'bW9jLnlydG5lZ25vc2FtQHlydG5lZ20=',
  privacy: 'bW9jLm9vaGF5QDE4eXJ0bmVndG0='
}

export default {
  name: 'EmailLink',
  props: {
    // Which address: 'site' (mgentry@…) or 'privacy' (the policy contact)
    name: {
      type: String,
      default: 'site'
    },
    // A mailto link, or plain text (e.g. the bio, where it's meant to be copied)
    link: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      address: ''
    }
  },
  mounted() {
    const encoded = ADDRESSES[this.name]
    if (encoded) this.address = atob(encoded).split('').reverse().join('')
  }
}
</script>
