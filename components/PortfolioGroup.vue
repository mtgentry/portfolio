<!-- Please remove this file from your project -->
<template lang="pug">
  v-col.portfolio-group(:md="project.cover.multiple ? 6 : 12"
    :style="{'justify-content': project.position || 'center'}")
    PortfolioItem(:project="project")

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