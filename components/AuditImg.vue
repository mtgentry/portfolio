<template lang="pug">
  v-row(justify="center" align="center" position="relative")
    v-col(cols="12")
      div.d-flex.justify-center
        div.auditImg(v-show="imgLoaded")
          img(:src="imgSrc" alt="" @load="handleLoad")
          AuditPoint(v-for="(point, i) in points" :key="i" :point="point" :i="i")
</template>

<script>
export default {
  props: ['imgSrc', 'imgAlt', 'points'],
  data() {
    return {
      imgLoaded: false,
    }
  },
  methods: {
    handleLoad() {
      this.imgLoaded = true;
    }
  }
}
</script>

<style lang="sass" scoped>
.auditImg
  position: relative
</style>