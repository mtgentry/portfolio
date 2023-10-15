<template lang="pug">
  v-row#audits(
    justify="center"
    align="center"
    v-if="auditLayout"
  )
    v-col#header(cols="12")
      h1(v-html="auditLayout.header")
      p.subheader(v-html="auditLayout.subheader")
    v-col.subheader(cols="12")
      span(v-html="auditLayout.header")
    AuditShort(
      v-for="(audit, index) in audits"
      :key="index"
      :audit="audit"
    )
    v-col(cols="12")
      BookCall
    v-col(cols="12")
      Footer
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  created() {
    this.fetchAuditLayout()
  },
  computed: {
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

h1
  font-size: 50px
  font-style: normal
  font-weight: 400

#header
  margin-bottom: 150px

.subheader
  font-size: 24px
  font-style: normal
  font-weight: 400
  line-height: 148.5%
</style>