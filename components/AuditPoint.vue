<template lang="pug">
  div.overlay(ref="scroll" :style="{top: `${point.x}px`, left: `${point.y}px`}")
    div.point {{i}}
    div.description(:style="{opacity: isVisible ? 1 : 0}") {{point.description}}
</template>

<script>
export default {
  props: ['point', 'i'],
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.checkPosition)
    this.checkPosition()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkPosition)
  },
  methods: {
    checkPosition() {
      const rect = this.$refs.scroll.getBoundingClientRect();
      if (rect.bottom === 0) {
        return;
      }
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const isInView = rect.top < windowHeight / 3 * 2;
      this.isVisible = isInView;
      if (isInView) {
        window.removeEventListener('scroll', this.checkPosition);
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.overlay
  position: absolute

.point
  height: 60px
  width: 60px
  display: flex
  justify-content: center
  align-items: center
  background-color: #1F00DC
  border-radius: 0 100% 100% 100%
  font-size: 28.996px
  font-family: Inter, serif

.description
  background-color: #1F00DC
  padding: 15px
  margin-left: 50px
  width: 240px
  color: #FFF
  font-family: Inter, serif
  font-size: 17.573px
  transition: opacity 1s ease-in-out
</style>