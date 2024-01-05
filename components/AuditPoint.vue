<template lang="pug">
 // div
 //   div.overlay(ref="scroll" :style="mirrorStyle" @mousedown="onPointClick")
 //     div.point(:class="{'mirror': overflow }") {{ i }}
 //   div.overlay(ref="scroll" :style="primaryStyle" @mousedown="disablePoint")
   //   div.description(:class="{isMiddleViewport: isMiddleViewport, isActive: auditClicked === this.i}") {{ point.description }}
</template>

<script>
import {mapState} from "vuex";

export default {
  props: ['point', 'i', 'height', 'width'],
  data() {
    return {
      isMiddleViewport: false,
      overflow: false
    }
  },
  computed: {
    ...mapState(['auditClicked']),
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
    },
  },
  mounted() {
    this.$parent.updateDimensions();
    window.addEventListener('scroll', this.checkPosition);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkPosition);
  },
  methods: {
    updateAuditClicked(value) {
      this.$store.commit('updateState', {
        field: 'auditClicked',
        value: value
      });
    },
    onPointClick() {
      if (this.auditClicked === this.i) {
        this.updateAuditClicked(null)
      } else {
        this.updateAuditClicked(this.i)
      }
    },
    disablePoint() {
      this.updateAuditClicked(null)
    },
    calculateMaxNumberX() {
      let numberWidth = 60;
      let overflow = this.width - (this.x + numberWidth);
      this.overflow = overflow < 0;
      return overflow < 0 ? this.x - 60 : this.x;
    },
    calculateMaxDescriptionX() {
      let descriptionWidth = 240;
      let overflow = this.width - (this.x + descriptionWidth);
      return overflow < 0 ? this.x + overflow : this.x;
    },
    checkPosition() {
      const rect = this.$refs.scroll.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      this.isMiddleViewport = rect.top < windowHeight / 3 * 2;
      if (this.isMiddleViewport) {
        window.removeEventListener('scroll', this.checkPosition);
      }
    },
  }
}
</script>

<style lang="sass" scoped>
.overlay
  position: absolute
  .point
    z-index: 1

.point
  height: 50px
  width: 50px
  display: flex
  justify-content: center
  align-items: center
  background-color: #1F00DC
  border-radius: 0 100% 100% 100%
  font-size: 25px
  font-family: Resist Sans, serif
  padding-bottom: 4px

.description
  background-color: #1F00DC
  padding: 15px
  width: 240px
  color: #FFF
  font-family: Resist Sans, serif
  font-size: 15px
  position: absolute
  top: 60px
  opacity: 0

.mirror
  border-radius: 100% 0 100% 100% !important

.isMiddleViewport
  opacity: 1 !important
  transition: opacity 1s ease-in

  @media(max-width: 1100px)
    opacity: 0 !important
    transition: opacity 0s ease-in

.isActive
  @media(max-width: 1100px)
    opacity: 1 !important
    transition: opacity 0.5s ease-in
    z-index: 2
</style>