<template lang="pug">
  div
    div.overlay(ref="scroll" :style="mirrorStyle" )
      div.point(:class="{'mirror': overflow }") {{ i }}
    div.overlay(ref="scroll" :style="primaryStyle")
      div.description(:style="{opacity: isVisible ? 1 : 0}") {{ point.description }}
</template>

<script>
export default {
  props: ['point', 'i', 'height', 'width'],
  data() {
    return {
      isVisible: false,
      overflow: false
    }
  },
  computed: {
    y() {
      return this.point.y / 100 * this.height;
    },
    x() {
      return this.point.x / 100 * this.width;
    },
    mirrorStyle() {
      return {
        top: `${this.y}px`,
        left: `${this.calculateMaxNumberX()}px`
      };
    },
    primaryStyle() {
      return {
        top: `${this.y}px`,
        left: `${this.calculateMaxDescriptionX()}px`
      };
    }
  },
  mounted() {
    this.$parent.updateDimensions();
    window.addEventListener('scroll', this.checkPosition);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkPosition);
  },
  methods: {
    checkPosition() {
      const rect = this.$refs.scroll.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      this.isVisible = rect.top < windowHeight / 3 * 2;
      if (this.isVisible) {
        window.removeEventListener('scroll', this.checkPosition);
      }
    },
    calculateMaxDescriptionX() {
      let descriptionWidth = 240;
      let overflow = this.width - (this.x + descriptionWidth);
      return overflow < 0 ? this.x + overflow : this.x;
    },
    calculateMaxNumberX() {
      let numberWidth = 60;
      let overflow  = this.width - (this.x + numberWidth);
      this.overflow = overflow < 0;
      return overflow < 0 ? this.x - 60 : this.x;
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
  width: 240px
  color: #FFF
  font-family: Inter, serif
  font-size: 17.573px
  transition: opacity 1s ease-in-out
  position: absolute
  top: 60px

.mirror
  border-radius: 100% 0 100% 100% !important
</style>