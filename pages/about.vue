<template lang="pug">
  //- The same bio as the root, plus the footer the grids and case studies end
  //- with. The root itself stays as it is.
  div.about-page
    PortfolioHomepage
    v-row
      Footer
</template>

<script>
// /about: the same bio as the root (masongentry.com), so every portfolio
// version (/work, /projects, /portfolio) can link to an About without sending
// people to the bare domain. Its logo and the nav's Work link lead back to the
// version the visitor came from (see rememberedSection in utils/sections.js).
import PortfolioHomepage from "@/components/pages/PortfolioHomepage.vue"
import Footer from "@/components/Footer.vue"

export default {
  components: {
    PortfolioHomepage,
    Footer
  },
  validate() {
    return !process.env.IS_AGENCY
  },
  head() {
    return {
      title: 'About',
      // Same content as the root: tell search engines the root is the original,
      // so the bio is listed once
      link: [{ hid: 'canonical', rel: 'canonical', href: 'https://masongentry.com/' }]
    }
  }
}
</script>

<style lang="sass" scoped>
// The footer below already has the email, so drop the bio's "Say hello" line
// here. The root keeps it (no footer there).
.about-page ::v-deep .email-contact
  display: none
</style>
