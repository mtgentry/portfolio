<template lang="pug">
  v-row(justify="center" align="center" position="relative")
    v-col(cols="12")
      div.d-flex.justify-center
        div.auditImg(v-show="imgLoaded" ref="img")
          img.auditImage(:src="imgSrc" :alt="imgAlt || ''" @mousedown="disableActivePoint")
          AuditPoint(v-for="(point, i) in points" :key="i" :point="point" :i="i+1" v-if="imgLoaded" :height="height" :width="width")
</template>

<script>
export default {
  props: ['imgSrc', 'imgAlt', 'points'],
  data() {
    return {
      imgLoaded: false,
      height: 0,
      width: 0
    }
  },
  mounted() {
    this.fetchImage();
    window.addEventListener('resize', this.updateDimensions);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateDimensions);
  },
  methods: {
    fetchImage() {
      const img = new window.Image();
      img.onload = () => {
        this.imgLoaded = true;
        this.updateDimensions();
      };
      img.onerror = () => {
        // handle the error, based on the requirements
      };
      img.src = this.imgSrc;
    },
    updateDimensions() {
      if (this.$refs.img) {
        this.height = this.$refs.img.clientHeight || 0,
          this.width = this.$refs.img.clientWidth || 0
      }
    },
    disableActivePoint() {
      this.$store.commit('updateState', {
          field: 'auditClicked',
          value: null
        });
    },
  }
}
</script>

<style lang="sass" scoped>
.auditImg
  position: relative
.auditImage
  max-width: 900px
  width: 100%
  height: auto
</style>