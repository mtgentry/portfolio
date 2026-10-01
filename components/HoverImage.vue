<template lang="pug">
  span.image-wrapper(
    :class="{ 'tap-enabled': tapToReveal }"
    @mouseover="onMouseOver($event)"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove($event)"
    @click="onTap($event)"
  )
    img.inline-image(:src="iconSrc" alt="icon")
    img.hover-image(
      :class="{ 'visible': isHovered, [`hover-image-${id}`]: true }"
      :src="hoverSrc"
      :style="{ transform: `translate3d(${shapeLeft}px, ${shapeTop}px, 0) scale(${grow})`, width: drawWidth + 'px', height: drawHeight + 'px', borderColor: borderColor, outline: edgeColor ? `1px solid ${edgeColor}` : 'none' }"
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
// How far, in px, a tapped-open overlay drifts from its resting spot
const DRIFT_X = 24
const DRIFT_Y = 16

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
    },
    // On touch screens, which have no hover, tap the thumbnail to open the
    // overlay and tap anywhere or scroll to close it
    tapToReveal: {
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
    // Image size after shrinking to fit a small screen (fitScale is 1 on desktop)
    drawWidth() {
      return this.imageWidth * this.fitScale
    },
    drawHeight() {
      return this.imageHeight * this.fitScale
    },
    shapeWidth() {
      return this.drawWidth * this.grow
    },
    shapeHeight() {
      return this.drawHeight * this.grow
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
      fitScale: 1,
      restLeft: null,
      restTop: null,
      driftStart: null,
      cursorX: 0,
      cursorY: 0,
      thumbCenterX: 0,
      thumbCenterY: 0
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.frameId)
    this.removeTapListeners()
  },
  methods: {
    // Touch screens fire emulated mouse events on tap; tap mode ignores them.
    // Checked on each event rather than once on load, so it stays right if the
    // device mode changes (e.g. toggling the phone view in browser dev tools).
    usesTapMode() {
      return this.tapToReveal && window.matchMedia('(hover: none) and (pointer: coarse)').matches
    },
    onTap(event) {
      if (!this.usesTapMode()) return
      if (this.isHovered) {
        this.closeTap()
      } else {
        this.openTap(event.currentTarget)
      }
    },
    openTap(wrapper) {
      const rect = wrapper.getBoundingClientRect()
      this.thumbCenterX = rect.left + (rect.width / 2)
      this.thumbCenterY = rect.top + (rect.height / 2)

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const gap = 24
      // Screen edge margin plus room for the drift, so the image never leaves the screen
      const marginX = 16 + DRIFT_X
      const marginY = 16 + DRIFT_Y

      // Shrink the image if it would not fit beside the thumbnail on screen
      this.fitScale = Math.min(
        1,
        (viewportWidth - marginX * 2) / this.imageWidth,
        (viewportHeight / 2 - rect.height / 2 - gap - marginY) / this.imageHeight
      )

      // Open toward the roomier side: below a thumbnail in the top half of the
      // screen, above one in the bottom half, and away from its horizontal side
      if (this.thumbCenterY < viewportHeight / 2) {
        this.targetTop = Math.min(rect.bottom + gap + DRIFT_Y, viewportHeight - this.drawHeight - marginY)
      } else {
        this.targetTop = Math.max(rect.top - gap - DRIFT_Y - this.drawHeight, marginY)
      }
      if (this.thumbCenterX < viewportWidth / 2) {
        this.targetLeft = viewportWidth - this.drawWidth - marginX
      } else {
        this.targetLeft = marginX
      }

      // Where the image rests; it drifts around this point while open
      this.restLeft = this.targetLeft
      this.restTop = this.targetTop
      this.driftStart = null

      this.imageLeft = this.targetLeft
      this.imageTop = this.targetTop
      if (this.telescope) {
        this.grow = 0
        this.growStart = null
      }
      this.isHovered = true
      this.startEasing()

      // Close on the next tap anywhere or on scroll. Added after this tap has
      // finished so the same tap does not immediately close it.
      setTimeout(() => {
        if (!this.isHovered) return
        this.onDocumentTap = (e) => {
          if (!this.$el.contains(e.target)) this.closeTap()
        }
        this.onScroll = () => this.closeTap()
        document.addEventListener('click', this.onDocumentTap, true)
        window.addEventListener('scroll', this.onScroll, { passive: true })
      })
    },
    closeTap() {
      this.restLeft = null
      this.restTop = null
      this.isHovered = false
      cancelAnimationFrame(this.frameId)
      this.frameId = null
      this.removeTapListeners()
    },
    removeTapListeners() {
      if (this.onDocumentTap) document.removeEventListener('click', this.onDocumentTap, true)
      if (this.onScroll) window.removeEventListener('scroll', this.onScroll)
      this.onDocumentTap = null
      this.onScroll = null
    },
    onMouseOver(event) {
      if (this.usesTapMode()) return
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
      if (this.usesTapMode()) return
      this.isHovered = false
      cancelAnimationFrame(this.frameId)
      this.frameId = null
    },
    startEasing() {
      if (this.frameId) return

      const step = (now) => {
        // With no cursor to follow in tap mode, drift slowly in a figure-eight
        // around the resting spot so the overlay moves like it does on desktop
        if (this.restLeft !== null && this.usesTapMode()) {
          if (this.driftStart === null) this.driftStart = now
          const t = (now - this.driftStart) / 6000 * Math.PI * 2
          this.targetLeft = this.restLeft + Math.sin(t) * DRIFT_X
          this.targetTop = this.restTop + Math.sin(t * 2) * DRIFT_Y
        }

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
      if (this.usesTapMode()) return
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

// Disable hover images on touch devices, unless tap-to-reveal is on
@media (hover: none) and (pointer: coarse)
  .image-wrapper:not(.tap-enabled)
    img.hover-image
      display: none !important

    svg.connector-shape
      display: none !important

  .tap-enabled
    cursor: pointer
    -webkit-tap-highlight-color: transparent
</style>
