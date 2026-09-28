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
      :style="{ transform: `translate3d(${shapeLeft}px, ${shapeTop}px, 0) scale(${grow})`, width: imageWidth + 'px', height: imageHeight + 'px', borderColor: borderColor, outline: edgeColor ? `1px solid ${edgeColor}` : 'none' }"
    )
    svg.connector-shape(
      v-if="showConnectorLine && isHovered"
      :style="{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 998 }"
    )
      // Right face - visible when image is to the LEFT of thumbnail
      polygon(
        v-if="shapeLeft + shapeWidth < thumbCenterX"
        :points="`${thumbCenterX},${thumbCenterY} ${shapeLeft + shapeWidth},${shapeTop} ${shapeLeft + shapeWidth},${shapeTop + shapeHeight}`"
        :fill="rightColor"
        :fill-opacity="fillOpacity"
        :stroke="edgeColor"
        stroke-width="1"
      )
      // Left face - visible when image is to the RIGHT of thumbnail
      polygon(
        v-if="shapeLeft > thumbCenterX"
        :points="`${thumbCenterX},${thumbCenterY} ${shapeLeft},${shapeTop} ${shapeLeft},${shapeTop + shapeHeight}`"
        :fill="leftColor"
        :fill-opacity="fillOpacity"
        :stroke="edgeColor"
        stroke-width="1"
      )
      // Bottom face - visible when image is ABOVE thumbnail
      polygon(
        v-if="shapeTop + shapeHeight < thumbCenterY"
        :points="`${thumbCenterX},${thumbCenterY} ${shapeLeft},${shapeTop + shapeHeight} ${shapeLeft + shapeWidth},${shapeTop + shapeHeight}`"
        :fill="bottomColor"
        :fill-opacity="fillOpacity"
        :stroke="edgeColor"
        stroke-width="1"
      )
      // Evenly spaced cross-sections between the thumbnail and the image. A slice
      // at fraction t sits t of the way along each line from the thumbnail center
      // to an image corner, so it is also t of the image's size.
      template(v-if="midFrameColor")
        rect(
          v-for="t in midFrameFractions"
          :key="t"
          :x="thumbCenterX + (shapeLeft - thumbCenterX) * t"
          :y="thumbCenterY + (shapeTop - thumbCenterY) * t"
          :width="shapeWidth * t"
          :height="shapeHeight * t"
          fill="none"
          :stroke="midFrameColor"
          stroke-width="0.5"
        )
      // Top face - visible when image is BELOW thumbnail
      polygon(
        v-if="shapeTop > thumbCenterY"
        :points="`${thumbCenterX},${thumbCenterY} ${shapeLeft},${shapeTop} ${shapeLeft + shapeWidth},${shapeTop}`"
        :fill="topColor"
        :fill-opacity="fillOpacity"
        :stroke="edgeColor"
        stroke-width="1"
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
    },
    // Opacity of the colored connector shape between the icon and the image
    fillOpacity: {
      type: Number,
      default: 0.9
    },
    // Optional 1px line traced along every edge of the overlay; off unless set
    edgeColor: {
      type: String,
      default: null
    },
    // Optional outlines of evenly spaced cross-sections of the overlay; off unless set
    midFrameColor: {
      type: String,
      default: null
    },
    midFrameCount: {
      type: Number,
      default: 1
    },
    // Grow the overlay out of the thumbnail on first hover instead of popping in
    telescope: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // The overlay as drawn: the image's rectangle scaled toward the thumbnail
    // center by `grow`, so at 0 it is a point on the thumbnail and at 1 it is
    // the full image. The connector shapes and frames are drawn from this too.
    shapeLeft() {
      return this.thumbCenterX + (this.imageLeft - this.thumbCenterX) * this.grow
    },
    shapeTop() {
      return this.thumbCenterY + (this.imageTop - this.thumbCenterY) * this.grow
    },
    shapeWidth() {
      return this.imageWidth * this.grow
    },
    shapeHeight() {
      return this.imageHeight * this.grow
    },
    midFrameFractions() {
      // e.g. 3 frames sit at 1/4, 2/4 and 3/4 of the way to the image
      return Array.from({ length: this.midFrameCount }, (_, i) => (i + 1) / (this.midFrameCount + 1))
    }
  },
  data() {
    return {
      isHovered: false,
      imageTop: 0,
      imageLeft: 0,
      // Where the image is heading; imageTop/imageLeft ease toward these each frame
      targetTop: 0,
      targetLeft: 0,
      frameId: null,
      grow: 1,
      growStart: null,
      cursorX: 0,
      cursorY: 0,
      thumbCenterX: 0,
      thumbCenterY: 0
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.frameId)
  },
  methods: {
    onMouseOver(event) {
      const wasHovered = this.isHovered
      this.isHovered = true
      this.updateThumbCenter(event)
      this.updateImagePosition(event)

      // Start exactly under the cursor rather than gliding in from wherever it was last
      if (!wasHovered) {
        this.imageLeft = this.targetLeft
        this.imageTop = this.targetTop
        if (this.telescope) {
          this.grow = 0
          this.growStart = null
        }
        this.startEasing()
      }
    },
    onMouseLeave() {
      this.isHovered = false
      cancelAnimationFrame(this.frameId)
      this.frameId = null
    },
    startEasing() {
      if (this.frameId) return

      const step = (now) => {
        // Close a fraction of the gap each frame so the mirrored movement,
        // which jumps 10px per pixel of cursor travel, glides instead of stepping
        const ease = 0.25
        this.imageLeft += (this.targetLeft - this.imageLeft) * ease
        this.imageTop += (this.targetTop - this.imageTop) * ease

        // Telescope out over growDuration with an ease-out cubic
        if (this.grow < 1) {
          const growDuration = 350
          if (this.growStart === null) this.growStart = now
          const progress = Math.min(1, (now - this.growStart) / growDuration)
          this.grow = 1 - Math.pow(1 - progress, 3)
        }

        this.frameId = requestAnimationFrame(step)
      }
      this.frameId = requestAnimationFrame(step)
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
        this.targetLeft = mirroredCenterX - (this.imageWidth / 2)
        this.targetTop = mirroredCenterY - (this.imageHeight / 2)
      } else {
        // Original behavior for non-mirroring images
        const spaceBelow = window.innerHeight - event.clientY

        if (spaceBelow < this.imageHeight + offset) {
          this.targetTop = event.clientY - this.imageHeight - offset
        } else {
          this.targetTop = event.clientY + offset
        }

        this.targetLeft = event.clientX - (this.imageWidth / 2)
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
  top: 0
  left: 0
  z-index: 999
  transform-origin: 0 0
  will-change: transform
  opacity: 0
  transition: opacity .2s ease-in-out
  pointer-events: none
  object-fit: cover

img.visible
  opacity: 1

// Disable hover images on touch devices
@media (hover: none) and (pointer: coarse)
  img.hover-image
    display: none !important

  svg.connector-shape
    display: none !important
</style>
