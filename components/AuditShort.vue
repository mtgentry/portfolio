<template lang="pug">
  v-col
    router-link(:to="{ name: 'audits-audit', params: { audit: audit.name }}")
      v-img(:src="getLogoUrl")
      p {{audit.name}}
      p {{audit.description}}
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