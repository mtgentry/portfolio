<!-- Please remove this file from your project -->
<template lang="pug">
  v-col.portfolio-group(:md="project.cover.multiple ? 6 : 12"
    :style=`{"justify-content": project.cover.position || 'center'}`)
    PortfolioItem(:project="project" :style=`{"width": project.cover.width || '100%'}`)

</template>

<script>

export default {
  props: ['project'],
}
</script>

<style lang="sass" scoped>
.portfolio-group
  padding-bottom: 170px
  display: flex
</style>