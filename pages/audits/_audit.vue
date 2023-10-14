<template lang="pug">
  v-row.audit(justify="center" align="center" v-if="audit")
    v-col(cols="12")
      p {{ audit.fullDescription }}
      .points
        AuditImg(:imgSrc="auditImage" :points="audit.points")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'auditDetail',
  data() {
    return {
      audit: null,
    }
  },
  computed: {
    ...mapState({
      audits: state => state.audits,
    }),
    auditImage() {
      return `/domains/agency/audits/${this.audit.name}/media/image.png`
    },
  },
  methods: {
    async fetchAuditLayout() {
      const auditName = this.$route.params.audit
      if (!this.audits) {
        await this.$store.dispatch('fetchAuditLayout')
      }
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
    await this.fetchAuditLayout()
  },
}
</script>

<style lang="sass" scoped>
.audit
  color: #FFFFFF
  padding-top: 200px
</style>