<template lang="pug">
  v-col(lg="4")
    router-link(:to="{ name: 'audits-audit', params: { audit: audit.name }}")
      v-img(:src="getLogoUrl")
      p#name.mt-3.mb-1 {{audit.name}}
      p#description {{audit.description}}
</template>
<script>
export default {
  props: ['audit'],
  computed: {
    getLogoUrl() {
      return `/domains/agency/audits/${this.audit.name}/media/logo.png`
    }
  }
}
</script>

<style lang="sass" scoped>
#name
  font-size: 19px
  font-style: normal
  font-weight: 500
  line-height: normal

#description
  font-size: 16px
  font-style: normal
  font-weight: 400
  line-height: normal
</style>