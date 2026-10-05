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
  { key: 'team', label: 'Team' },
  { key: 'built', label: 'Built' },
  { key: 'shipped', label: 'Shipped' },
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
// Same column as the text sections: a 674px box with copy inset 12px
.project-summary
  width: 100%
  max-width: 674px
  margin: 8px 0 80px
  padding: 0 12px
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
