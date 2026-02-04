<template lang="pug">
  span.image-wrapper(
    @mouseover="onMouseOver($event)"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove($event)"
  )
    img.inline-image(:src="iconSrc" alt="icon")
    img.hover-image(
      :class="{ 'visible': isHovered, [`hover-image-${id}`]: true }"
      :src="hoverSrc"
      :style="{ top: imageTop + 'px', left: imageLeft + 'px', width: imageWidth + 'px', height: imageHeight + 'px', borderColor: borderColor }"
    )
    svg.connector-shape(
      v-if="showConnectorLine && isHovered"
      :style="{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 998 }"
    )
      // Right face - visible when image is to the LEFT of thumbnail
      polygon(
        v-if="imageLeft + imageWidth < thumbCenterX"
        :points="`${thumbCenterX},${thumbCenterY} ${imageLeft + imageWidth},${imageTop} ${imageLeft + imageWidth},${imageTop + imageHeight}`"
        :fill="rightColor"
        fill-opacity="0.9"
      )
      // Left face - visible when image is to the RIGHT of thumbnail
      polygon(
        v-if="imageLeft > thumbCenterX"
        :points="`${thumbCenterX},${thumbCenterY} ${imageLeft},${imageTop} ${imageLeft},${imageTop + imageHeight}`"
        :fill="leftColor"
        fill-opacity="0.9"
      )
      // Bottom face - visible when image is ABOVE thumbnail
      polygon(
        v-if="imageTop + imageHeight < thumbCenterY"
        :points="`${thumbCenterX},${thumbCenterY} ${imageLeft},${imageTop + imageHeight} ${imageLeft + imageWidth},${imageTop + imageHeight}`"
        :fill="bottomColor"
        fill-opacity="0.9"
      )
      // Top face - visible when image is BELOW thumbnail
      polygon(
        v-if="imageTop > thumbCenterY"
        :points="`${thumbCenterX},${thumbCenterY} ${imageLeft},${imageTop} ${imageLeft + imageWidth},${imageTop}`"
        :fill="topColor"
        fill-opacity="0.9"
      )
</template>

<script>
export default {
  name: 'HoverImage',
  props: {
    id: {
      type: Number,
      required: true
    },
    iconSrc: {
      type: String,
      required: true
    },
    hoverSrc: {
      type: String,
      required: true
    },
    imageWidth: {
      type: Number,
      default: 300
    },
    imageHeight: {
      type: Number,
      default: 300
    },
    useMirroring: {
      type: Boolean,
      default: false
    },
    showConnectorLine: {
      type: Boolean,
      default: false
    },
    topColor: {
      type: String,
      default: '#ff0000'
    },
    rightColor: {
      type: String,
      default: '#ccc'
    },
    bottomColor: {
      type: String,
      default: '#000000'
    },
    leftColor: {
      type: String,
      default: '#0000ff'
    },
    borderColor: {
      type: String,
      default: '#2805FF'
    }
  },
  data() {
    return {
      isHovered: false,
      imageTop: 0,
      imageLeft: 0,
      cursorX: 0,
      cursorY: 0,
      thumbCenterX: 0,
      thumbCenterY: 0
    }
  },
  methods: {
    onMouseOver(event) {
      this.isHovered = true
      this.updateThumbCenter(event)
      this.updateImagePosition(event)
    },
    onMouseLeave() {
      this.isHovered = false
    },
    onMouseMove(event) {
      this.updateThumbCenter(event)
      this.updateImagePosition(event)
    },
    updateThumbCenter(event) {
      // Get the bounding rectangle of the thumbnail wrapper
      const rect = event.currentTarget.getBoundingClientRect()
      this.thumbCenterX = rect.left + (rect.width / 2)
      this.thumbCenterY = rect.top + (rect.height / 2)
    },
    updateImagePosition(event) {
      const offset = 20

      // Track cursor position
      this.cursorX = event.clientX
      this.cursorY = event.clientY

      // Mirroring behavior
      if (this.useMirroring) {
        // Calculate cursor offset from thumbnail center
        const cursorOffsetX = event.clientX - this.thumbCenterX
        const cursorOffsetY = event.clientY - this.thumbCenterY

        // Amplify the offset for more dramatic movement
        const amplifier = 10
        const amplifiedOffsetX = cursorOffsetX * amplifier
        const amplifiedOffsetY = cursorOffsetY * amplifier

        // Position the big image's CENTER at the mirrored position
        // As cursor approaches center, big image also approaches center
        // When cursor crosses center, flip is seamless
        const mirroredCenterX = this.thumbCenterX - amplifiedOffsetX
        const mirroredCenterY = this.thumbCenterY - amplifiedOffsetY

        // Convert center position to top-left corner (what imageLeft/imageTop represent)
        this.imageLeft = mirroredCenterX - (this.imageWidth / 2)
        this.imageTop = mirroredCenterY - (this.imageHeight / 2)
      } else {
        // Original behavior for non-mirroring images
        const spaceBelow = window.innerHeight - event.clientY

        if (spaceBelow < this.imageHeight + offset) {
          this.imageTop = event.clientY - this.imageHeight - offset
        } else {
          this.imageTop = event.clientY + offset
        }

        this.imageLeft = event.clientX - (this.imageWidth / 2)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.inline-image
  height: 52px
  width: auto
  display: block

img.hover-image
  width: 300px
  height: 300px
  border: 3px solid #2805FF
  position: fixed
  z-index: 999
  opacity: 0
  transition: opacity .2s ease-in-out
  pointer-events: none
  object-fit: cover

img.visible
  opacity: 1
</style>
