<template lang="pug">
  v-row#audits(
    justify="center"
    align="center"
    v-if="auditLayout"
  )
    v-col(lg="12")
      h1(v-html="formattedHeader")
      p(v-html="formattedSubheader")
    v-col(lg="12")
      p(v-html="formattedAuditHeader")
    AuditShort(
      v-for="(audit, index) in audits"
      :key="index"
      :audit="audit"
    )
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  created() {
    this.fetchAuditLayout()
  },
  computed: {
    formattedHeader() {
      return this.auditLayout?.header
    },
    formattedSubheader() {
      return this.auditLayout?.subheader
    },
    formattedAuditHeader() {
      return this.auditLayout?.auditHeader
    },
    ...mapState(['audits', 'auditLayout'])
  },
  methods: {
    ...mapActions(['fetchAuditLayout'])
  }
}
</script>

<style lang="sass" scoped>
$audits-color: #FFFFFF
$audits-padding-top: 200px

#audits
  color: $audits-color
  padding-top: $audits-padding-top
</style>