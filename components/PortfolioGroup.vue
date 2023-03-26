<!-- Please remove this file from your project -->
<template lang="pug">
  v-col(:md="project.cover.multiple ? 6 : 12")
    PortfolioItem(:project="project")

</template>

<script>

export default {
  props: ['project'],
}
</script>

<style lang="sass" scoped>
.portfolio-group
  margin: 64px 0
</style>