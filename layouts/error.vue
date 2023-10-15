<template lang="pug">
  v-container#error(fluid)
    v-row
      v-col
        h1(v-if="error.statusCode === 404") {{ pageNotFound }}
        h1(v-else) {{ otherError }}

</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    this.$store.commit('updateState', {field: 'loading', value: false})
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped lang="sass">
#error
  padding-top: 100px
  color: #fff
</style>
