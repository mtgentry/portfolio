<template lang="pug">
  v-row(justify="center" align="center")
    v-col(cols="12")
      p test

</template>

<script>

export default {
  data() {
    return {
      backgroundColor: '#6CAF82',
    }
  },
  mounted() {
    this.$store.commit('changeBackgroundColor', this.backgroundColor)
  },

}
</script>
