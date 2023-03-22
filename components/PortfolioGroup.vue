<!-- Please remove this file from your project -->
<template lang="pug">
  v-row.portfolio-group
    v-col(:md="items.length === 2 ? 6 : 12" v-for="n in items.length" :key="n")
      PortfolioItem(:item="items[n-1]")


</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    }
  },
}
</script>

<style lang="sass" scoped>
  .portfolio-group
    margin: 64px 0
</style>