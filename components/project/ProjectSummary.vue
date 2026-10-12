<template lang="pug">
  //- Fades in like the rest of the page. It sits near the bottom, where you may
  //- not be able to scroll far enough for the default bottom-anchored trigger,
  //- so it triggers as soon as its top enters the window.
  dl.project-summary(data-aos="fade" data-aos-anchor-placement="top-bottom" data-aos-offset="0")
    div.summary-row(v-for="row in rows" :key="row.label")
      dt {{ row.label }}
      dd {{ row.value }}
</template>

<script>
// Fixed order so every case study answers the same questions in the same place
const FIELDS = [
  { key: 'role', label: 'Role' },
  { key: 'client', label: 'Client' },
  { key: 'agency', label: 'Agency' },
  { key: 'team', label: 'Team' },
  { key: 'built', label: 'Built' },
  { key: 'shipped', label: 'Shipped' },
  // For work that didn't launch (proposals, concepts): say so plainly
  { key: 'status', label: 'Status' },
  { key: 'outcome', label: 'Outcome' }
]

export default {
  name: 'ProjectSummary',
  props: {
    summary: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    rows() {
      return FIELDS
        .filter(field => this.summary?.[field.key])
        .map(field => ({ label: field.label, value: this.summary[field.key] }))
    }
  }
}
</script>

<style lang="sass" scoped>
// Width and alignment come from the row it sits in (see pages/work/_project.vue)
.project-summary
  margin: 0
  display: grid
  grid-template-columns: repeat(3, minmax(0, 1fr))
  gap: 24px 32px

dt
  font-size: 14px
  letter-spacing: 0.02em
  opacity: 0.75
  margin-bottom: 4px

dd
  margin: 0
  font-size: 16px
  line-height: 140%

@media (max-width: 768px)
  .project-summary
    grid-template-columns: 1fr 1fr
    gap: 20px
</style>
