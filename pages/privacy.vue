<template lang="pug">
  div.privacy-page
    div.container
      h1 Privacy policy
      p.updated Last updated October 12, 2026

      p This site is run by Mason Gentry. This page explains what I collect, why, and what you can do about it.

      h2 What I collect
      p #[strong If you sign up on /founders:] your name and email address. I use them to send you a short series of emails over the next few days, then occasional updates. My emails are sent through beehiiv, which stores your name and email for that purpose.
      p #[strong When you visit the site:] I use Google Analytics to see how people use the site, and the X (Twitter) pixel to measure whether my ads on X lead to signups. Both use cookies or similar technology and may collect information like your IP address, browser, and the pages you visit.

      h2 What I don't do
      p I don't sell your information or share it with anyone else for their own marketing.

      h2 Your choices
      p Every email has an unsubscribe link. To have your information deleted, or with any questions, email me at #[a(:href="`mailto:${email}`") {{ email }}].
      p You can limit tracking by blocking cookies in your browser, or opt out of personalized ads in your X settings.
</template>

<script>
export default {
  name: 'PrivacyPage',
  head() {
    return {
      title: 'Privacy policy'
    }
  },
  data() {
    return {
      email: 'mtgentry81@yahoo.com'
    }
  },
  // This policy is for masongentry.com only; the agency site shares these pages
  asyncData({ error }) {
    if (process.env.IS_AGENCY) {
      return error({ statusCode: 404, message: 'Page not found' })
    }
  },
  mounted() {
    // The layout's background is shared store state; match /founders
    this.$store.commit('updateState', {field: 'backgroundColor', value: '#F8F7F4'})
    this.$store.commit('updateState', {field: 'textColor', value: '#1D1E20'})
    this.$store.commit('updateState', {field: 'pageBackgroundColor', value: null})
    this.$store.commit('updateState', {field: 'pageTextColor', value: null})
  }
}
</script>

<style lang="sass" scoped>
.privacy-page
  background-color: #F8F7F4
  color: #1D1E20
  min-height: 100vh
  padding: 120px 40px 80px

.container
  max-width: 650px
  padding-left: 0
  padding-right: 0

h1
  font-size: 32px
  font-weight: 600
  margin-bottom: var(--space-xs)

h2
  font-size: 20px
  font-weight: 600
  margin-top: var(--space-l)
  margin-bottom: var(--space-xs)

p
  font-size: 18px !important
  line-height: 1.6 !important
  margin-bottom: var(--space-s) !important

.updated
  color: #948F8B
  font-size: 14px !important

a
  color: inherit
  text-decoration: underline !important

@media (max-width: 768px)
  .privacy-page
    padding: 90px 15px 60px
</style>
