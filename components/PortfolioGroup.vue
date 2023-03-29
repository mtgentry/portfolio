<!-- Please remove this file from your project -->
<template lang="pug">
  v-col.portfolio-group(:md="project.cover.multiple ? 6 : 12" cols=12
    :style=`{"justify-content": project.cover.position || 'center'}`)
    PortfolioItem.portfolio-item(:project="project" :style=`{"width": project.cover.width || '100%'}`
      :class="{'mobileFullWidth': !project.cover.mobileInherit}")

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

  @media (max-width: 768px)
    padding-bottom: 90px
    justify-content: end!important

.portfolio-item

  @media (max-width: 768px)
    img
      max-height: 400px

  &.mobileFullWidth
    @media (max-width: 768px)
      width: 100%!important

</style>