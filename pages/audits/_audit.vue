<template lang="pug">
  v-row.audit(justify="center" align="center" v-if="audit")
    v-col(cols="12")
      p#fullDescription {{ audit.fullDescription }}
      .points
        AuditImg(:imgSrc="auditImage" :points="audit.points")
    v-col(cols="12")
      div.line
    v-col.d-flex.align-center.flex-column(cols="12")
      div.container
        h1#bottomHeader Want more case studies?
        h2#bottomSubheader Our client-approved case studies offer real-world insights. Subscribe below to receive them as they become available.
    v-col.d-flex.justify-center.align-center.flex-column.py-5(cols="12")
      MailchimpForm.container
    v-col(cols="12")
      Footer
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'auditDetail',
  data() {
    return {
      audit: null,
    }
  },
  computed: {
    ...mapState(['audits']),
    auditImage() {
      return `/domains/agency/audits/${this.audit.name}/media/image.png`
    },
  },
  methods: {
    ...mapActions(['fetchAuditLayout']),
    async getAudit() {
      const auditName = this.$route.params.audit
      let audit = this.audits?.find(a => a.name === auditName)
      if (!audit) {
        audit = {
          name: auditName,
          auditHeader: 'Audit not found',
        }
      }
      this.audit = audit
    },
  },
  async mounted() {
    this.$store.commit('updateState', {field: 'paddingLayout', value: false})
    if (!this.audits) {
      await this.fetchAuditLayout()
    }
    await this.getAudit()
  },
  destroyed() {
    setTimeout(() => {
      this.$store.commit('updateState', {field: 'paddingLayout', value: true})
    }, 1000)
  },
}
</script>

<style lang="sass" scoped>
.audit
  color: #FFFFFF
  padding: 0
#fullDescription
  padding-bottom: 100px
.container
  max-width: 650px

#bottomHeader
  font-size: 30px
  font-weight: 500
  line-height: 148.5%

#bottomSubheader
  font-size: 23px
  font-weight: 400
  line-height: 136.5%

.line
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  &::after
    flex-grow: 1
    background: #535251
    height: 1px
    margin: .5em
    max-width: 650px

.py-5
  padding-bottom: 100px
</style>