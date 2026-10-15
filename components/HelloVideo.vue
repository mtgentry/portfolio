<template lang="pug">
  //- One <video> in a circle that moves between a large centered view ("open")
  //- and a small bubble in the top-right corner ("mini"), so playback never
  //- restarts. Custom controls: the circle plays/pauses, and a ring around it
  //- shows progress.
  div.hello-video(v-if="hello && mode !== 'closed' && mode !== 'pending'" :class="`is-${mode}`")
    //- Blurs the page behind the open video; GSAP animates its focus
    div.hello-backdrop(ref="backdrop" @click="minimize")
    div.hello-player(ref="player" role="dialog" :aria-modal="mode === 'open' ? 'true' : 'false'"
      :aria-label="`A video message for ${hello.name}`" tabindex="-1" @keydown.esc="minimize")
      div.hello-circle(ref="circle")
        //- Poster as a plain image, so it shows as soon as it downloads instead
        //- of waiting for the video element to set itself up
        img.hello-media(v-if="hello.poster && !started" :src="src(hello.poster)" alt="" fetchpriority="high")
        video.hello-media(ref="video" :src="src(hello.video)" :class="{ 'is-hidden': !started && hello.poster }"
          playsinline preload="metadata" @play="playing = true; started = true" @pause="playing = false"
          @ended="onEnded" @timeupdate="onTime" @loadedmetadata="onTime")
          track(v-if="hello.captions" ref="track" kind="captions" srclang="en" label="English" :src="src(hello.captions)")
        //- The whole circle is the play/pause control
        button.hello-toggle(type="button" @click="togglePlay" :aria-label="playing ? 'Pause video' : ended ? 'Replay video' : 'Play video'")
          span.hello-play-icon(v-if="!playing" aria-hidden="true")
            svg(viewBox="0 0 24 24" width="100%" height="100%")
              //- Restart: a counterclockwise arrow around a circle
              g(v-if="ended" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round")
                path(d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8")
                path(d="M3 3v5h5")
              path(v-else d="M8 5.5v13l11-6.5z" fill="currentColor")
        //- Progress ring: a dark track with a light arc that fills as it plays
        svg.hello-ring(viewBox="0 0 100 100" aria-hidden="true")
          circle.hello-ring-track(cx="50" cy="50" r="48.5")
          circle.hello-ring-progress(cx="50" cy="50" r="48.5" pathLength="1"
            :style="{ strokeDashoffset: 1 - progress, opacity: progress > 0 ? 1 : 0 }")
      //- Open: name, captions and controls under the circle
      div.hello-details(v-if="mode === 'open'" ref="details")
        p.hello-title Hi {{ hello.name }}
        p.hello-caption(v-if="caption" aria-live="polite") {{ caption }}
        p.hello-message(v-else-if="hello.message") {{ hello.message }}
        div.hello-controls
          button.hello-button(type="button" @click="toggleMute" :aria-label="muted ? 'Unmute' : 'Mute'")
            svg(width="18" height="18" viewBox="0 0 24 24" aria-hidden="true")
              path(d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor")
              path(v-if="!muted" d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round")
              path(v-else d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round")
          button.hello-button(type="button" @click="minimize" aria-label="Minimize video")
            svg(width="18" height="18" viewBox="0 0 24 24" aria-hidden="true")
              path(d="M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round")
          button.hello-button(type="button" @click="close" aria-label="Close video")
            svg(width="18" height="18" viewBox="0 0 24 24" aria-hidden="true")
              path(d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round")
      //- Mini: small expand and close buttons along the bubble's bottom edge
      div.hello-mini-controls(v-else ref="miniControls")
        button.hello-button.small(type="button" @click="expand" aria-label="Expand video")
          svg(width="14" height="14" viewBox="0 0 16 16" aria-hidden="true")
            path(d="M9.5 3H13v3.5M6.5 13H3V9.5M13 3L9 7M3 13l4-4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round")
        button.hello-button.small(type="button" @click="close" aria-label="Close video")
          svg(width="14" height="14" viewBox="0 0 16 16" aria-hidden="true")
            path(d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round")
</template>

<script>
// Personal video for /hello_<name> visits (see components/pages/HelloPage.vue
// and static/domains/portfolio/hello_there/hellos.json). Lives in the layout so it stays on
// screen, minimized, while the visitor browses case studies.
//
// Motion is GSAP: an entrance timeline (the page pulls out of focus, then the
// circle, then the name and buttons), and a FLIP move between the open view and
// the corner bubble that curves slightly and settles. Mode classes (is-open,
// is-mini) set where things end up; GSAP only animates getting there.
import { mapState } from 'vuex'
import { gsap } from 'gsap'

// Let the portfolio load and settle underneath before the video fades in
const OPEN_DELAY = 1500
// The backdrop's blurred ("in focus" on the video) and clear states
const FOCUSED = { '--blur': '16px', '--tint': 0.55 }
const UNFOCUSED = { '--blur': '0px', '--tint': 0 }

export default {
  name: 'HelloVideo',
  data() {
    return {
      playing: false,
      ended: false,
      muted: false,
      progress: 0,
      caption: '',
      // Has playback begun? Until then the poster image shows instead of the video
      started: false,
      reduceMotion: false
    }
  },
  computed: {
    ...mapState({
      hello: state => state.hello,
      mode: state => state.helloMode
    })
  },
  watch: {
    mode(mode, previous) {
      if (mode === 'pending') return this.openSoon()
      if (mode === 'open' && previous === 'pending') this.$nextTick(this.enter)
      this.lockScroll(mode === 'open')
      if (mode === 'open') this.focusPlayer()
      if (mode !== 'closed') this.$nextTick(this.watchCaptions)
    }
  },
  mounted() {
    this.reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (this.mode === 'pending') this.openSoon()
    if (this.mode === 'open') {
      this.$nextTick(this.enter)
      this.lockScroll(true)
      this.focusPlayer()
    }
    this.$nextTick(this.watchCaptions)
  },
  beforeDestroy() {
    clearTimeout(this.openTimer)
    this.killMotion()
    this.lockScroll(false)
  },
  methods: {
    src(file) {
      return `/domains/portfolio/hello_there/${file}`
    },
    openSoon() {
      clearTimeout(this.openTimer)
      this.openTimer = setTimeout(() => {
        if (this.mode === 'pending') this.setMode('open')
      }, OPEN_DELAY)
    },
    setMode(mode) {
      this.$store.commit('updateState', { field: 'helloMode', value: mode })
    },
    // Reduced motion (an OS setting) removes movement: no zoom, rise, arc or
    // pulse. Fades and the blur stay, since nothing moves in them; the move
    // between the open view and the corner becomes a crossfade.
    // move(seconds) is a duration for movement only: 0 when reduced.
    move(seconds) {
      return this.reduceMotion ? 0 : seconds
    },
    killMotion() {
      this.motion?.kill()
      this.motion = null
    },
    // The name, caption and buttons under the open circle
    detailItems() {
      return this.$refs.details ? [...this.$refs.details.querySelectorAll('.hello-title, .hello-caption, .hello-message, .hello-button')] : []
    },
    miniItems() {
      return this.$refs.miniControls ? [...this.$refs.miniControls.children] : []
    },
    // Entrance: the page pulls out of focus, then the circle fades and zooms in
    // from 90%, then the name and buttons rise in one after another
    enter() {
      const { backdrop, player, circle } = this.$refs
      if (!backdrop || !player || !circle) return
      this.killMotion()
      const rise = this.reduceMotion ? 0 : 8
      this.motion = gsap.timeline()
        .set(backdrop, { visibility: 'visible' })
        .fromTo(backdrop, UNFOCUSED, { ...FOCUSED, duration: 1.1, ease: 'power2.inOut' }, 0)
        .fromTo(player, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: 'power1.out' }, 0.25)
        .fromTo(circle, { scale: this.reduceMotion ? 1 : 0.9 }, { scale: 1, duration: 0.8, ease: 'power3.out' }, 0.25)
        .fromTo(this.detailItems(), { autoAlpha: 0, y: rise },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.6)
    },
    // FLIP: measure the circle where it is now, switch modes, measure where it
    // lands, then animate from the old spot. y eases out while x eases in and
    // out, so the circle leaves vertically first and the path bows into a gentle
    // arc (about 100px over a full-screen trip) instead of a straight diagonal.
    // A small pulse settles it at the end. With reduced motion it crossfades
    // instead: fade out, switch, fade back in where it lands.
    async moveTo(mode) {
      const { circle, player } = this.$refs
      if (this.reduceMotion) {
        await gsap.to(player, { autoAlpha: 0, duration: 0.2, ease: 'power1.in' })
        this.setMode(mode)
        await this.$nextTick()
        if (mode === 'open') gsap.set(this.detailItems(), { autoAlpha: 0 })
        if (mode === 'mini') gsap.set(this.miniItems(), { autoAlpha: 0 })
        return gsap.timeline().to(player, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' })
      }
      const first = circle.getBoundingClientRect()
      gsap.set(circle, { clearProps: 'transform,scale' })
      this.setMode(mode)
      await this.$nextTick()
      if (mode === 'open') gsap.set(this.detailItems(), { autoAlpha: 0, y: 8 })
      if (mode === 'mini') gsap.set(this.miniItems(), { autoAlpha: 0, scale: 0.6 })
      const last = circle.getBoundingClientRect()
      gsap.set(circle, {
        transformOrigin: '0 0',
        x: first.left - last.left,
        y: first.top - last.top,
        scale: first.width / last.width
      })
      const duration = 0.75
      return gsap.timeline()
        .to(circle, { x: 0, duration, ease: 'power2.inOut' }, 0)
        // Minimizing arcs (y leads); expanding goes straight back to center,
        // since an arc there read as "drop, then slide over"
        .to(circle, { y: 0, duration, ease: mode === 'mini' ? 'sine.out' : 'power2.inOut' }, 0)
        .to(circle, { scale: 1, duration, ease: 'power2.inOut' }, 0)
        .to(circle, { scale: 1.035, duration: 0.12, ease: 'power1.out', transformOrigin: '50% 50%' })
        .to(circle, { scale: 1, duration: 0.22, ease: 'power2.inOut' })
    },
    async minimize() {
      if (this.mode !== 'open') return
      this.killMotion()
      const { backdrop } = this.$refs
      // Page comes back into focus while the name and buttons fade first
      gsap.to(backdrop, { ...UNFOCUSED, duration: 0.7, ease: 'power2.inOut',
        onComplete: () => gsap.set(backdrop, { visibility: 'hidden' }) })
      await gsap.to(this.detailItems(), { autoAlpha: 0, duration: 0.15, ease: 'power1.in' })
      if (this.mode !== 'open') return
      this.motion = await this.moveTo('mini')
      this.motion.to(this.miniItems(), { autoAlpha: 1, scale: 1, duration: 0.3, stagger: this.move(0.05),
        ease: this.reduceMotion ? 'power1.out' : 'back.out(2)' }, '-=0.25')
    },
    async expand() {
      if (this.mode !== 'mini') return
      this.killMotion()
      const { backdrop } = this.$refs
      await gsap.to(this.miniItems(), { autoAlpha: 0, scale: this.reduceMotion ? 1 : 0.6, duration: 0.12, ease: 'power1.in' })
      if (this.mode !== 'mini') return
      gsap.set(backdrop, { visibility: 'visible' })
      gsap.to(backdrop, { ...FOCUSED, duration: 0.9, ease: 'power2.inOut' })
      this.motion = await this.moveTo('open')
      this.motion.to(this.detailItems(), { autoAlpha: 1, y: 0, duration: 0.4, stagger: this.move(0.06), ease: 'power2.out' }, this.reduceMotion ? 0.1 : 0.4)
    },
    close() {
      this.$refs.video?.pause()
      this.killMotion()
      const { backdrop, player } = this.$refs
      gsap.to(backdrop, { ...UNFOCUSED, duration: 0.5, ease: 'power2.inOut' })
      gsap.to(player, { autoAlpha: 0, duration: 0.25, ease: 'power1.in',
        onComplete: () => this.setMode('closed') })
      this.showPortfolioUrl()
    },
    // Once the video is closed, /hello_<name> is just the portfolio: show its
    // real address so a refresh or a copied link doesn't bring the video back.
    // replaceState swaps the URL without a reload or a new history entry (Back
    // still goes wherever they came from). Case study URLs are already right.
    showPortfolioUrl() {
      if (!/^\/hello_/.test(window.location.pathname)) return
      const section = this.hello?.section || 'work'
      window.history.replaceState(window.history.state, '', `/${section}`)
    },
    togglePlay() {
      const video = this.$refs.video
      if (!video) return
      if (video.paused) {
        this.ended = false
        video.play()?.catch(() => {})
      } else {
        video.pause()
      }
    },
    toggleMute() {
      const video = this.$refs.video
      if (!video) return
      video.muted = !video.muted
      this.muted = video.muted
    },
    onTime() {
      const video = this.$refs.video
      this.progress = video?.duration ? video.currentTime / video.duration : 0
    },
    onEnded() {
      this.ended = true
      this.progress = 1
    },
    // Captions show as text under the circle (they'd be clipped inside it)
    watchCaptions() {
      const track = this.$refs.track?.track
      if (!track || track._helloWatched) return
      track.mode = 'hidden'
      track._helloWatched = true
      track.addEventListener('cuechange', () => {
        const cue = track.activeCues?.[0]
        this.caption = cue ? cue.text : ''
      })
    },
    focusPlayer() {
      this.$nextTick(() => this.$refs.player?.focus({ preventScroll: true }))
    },
    // The open view covers the page; don't let it scroll underneath.
    // overflow: hidden alone doesn't stop scrolling in iOS Safari, so the body
    // is also pinned in place at its scroll position, then put back exactly
    // where it was on unlock.
    lockScroll(lock) {
      if (typeof document === 'undefined') return
      const html = document.documentElement
      const body = document.body
      if (lock && this.lockedScrollY == null) {
        this.lockedScrollY = window.scrollY
        html.style.overflow = 'hidden'
        Object.assign(body.style, { position: 'fixed', top: `-${this.lockedScrollY}px`, left: '0', right: '0' })
      } else if (!lock && this.lockedScrollY != null) {
        const y = this.lockedScrollY
        this.lockedScrollY = null
        html.style.overflow = ''
        Object.assign(body.style, { position: '', top: '', left: '', right: '' })
        window.scrollTo(0, y)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
// Fits the width and, on short screens (phones turned sideways), the height:
// ~200px is left for the name and buttons under the circle
$open-size: min(400px, calc(100vw - 96px), calc(100vh - 200px))
$mini-size: 132px
$mini-size-phone: 92px

.hello-backdrop
  position: fixed
  inset: 0
  z-index: 1100
  // Blur the portfolio instead of covering it, so the work stays visible behind
  // the video. Light tint in the site's off-white keeps the circle in front.
  // GSAP animates --blur and --tint (rack focus); hidden until it does.
  --blur: 0px
  --tint: 0
  visibility: hidden
  pointer-events: none
  background: rgba(248, 247, 244, var(--tint))
  -webkit-backdrop-filter: blur(var(--blur))
  backdrop-filter: blur(var(--blur))

  .is-open &
    pointer-events: auto

  // No blur support: a stronger off-white overlay instead
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))
    background: rgba(248, 247, 244, calc(var(--tint) * 1.65))

// Centered when open; slides to the top-right corner when minimized. Only
// position, size and transform change, so the same video keeps playing.
.hello-player
  position: fixed
  z-index: 1101
  top: 50%
  left: 50%
  width: $open-size
  transform: translate(-50%, -50%)
  display: flex
  flex-direction: column
  align-items: center
  color: #F8F7F4
  outline: none

  .is-mini &
    // Same gap from the top and the right edge
    top: 24px
    left: calc(100% - 24px)
    width: $mini-size
    transform: translate(-100%, 0)

.hello-circle
  position: relative
  width: 100%
  aspect-ratio: 1
  border-radius: 50%
  // Same as the ring track, so any subpixel gap reads as ring, not page
  background: #1D1E20
  box-shadow: 0 20px 50px rgba(0, 0, 0, .3)

  .is-mini &
    box-shadow: 0 10px 30px rgba(0, 0, 0, .25)

.hello-media
  position: absolute
  // Video stays invisible behind the poster image until it starts playing
  &.is-hidden
    opacity: 0
  // Tucked just under the ring's inner edge. The ring scales with the circle
  // (its stroke is 3% of the width), so this inset must scale too: a fixed
  // inset left a white sliver between video and ring at the small sizes.
  inset: 2.5%
  width: 95%
  height: 95%
  object-fit: cover
  border-radius: 50%
  background: #1D1E20

.hello-toggle
  position: absolute
  inset: 0
  border-radius: 50%
  display: grid
  place-items: center
  color: #F8F7F4
  cursor: pointer

  &:focus-visible
    outline: 2px solid #F8F7F4
    outline-offset: 4px

.hello-play-icon
  display: block
  // About 16% of the circle (64px on the 400px view) so the face stays
  // visible; the minimums keep it readable on the small bubble
  width: max(12px, 9%)
  height: max(12px, 9%)
  padding: max(5px, 3.5%)
  box-sizing: content-box
  border-radius: 50%
  // The site's near-black, mostly opaque so it matches the other buttons
  // instead of picking up color from the video behind it
  background: rgba(29, 30, 32, .85)
  backdrop-filter: blur(6px)

  // As an inline element the svg sat on a text line, and on the small bubble
  // the line height pushed the triangle ~6px below center
  svg
    display: block

.hello-ring
  position: absolute
  inset: 0
  width: 100%
  height: 100%
  // Start the progress at 12 o'clock
  transform: rotate(-90deg)
  pointer-events: none
  // The wider progress stroke pokes a hair past the edge of the box
  overflow: visible

  circle
    fill: none
    stroke-width: 3

.hello-ring-track
  stroke: #1D1E20

.hello-ring-progress
  stroke: #F8F7F4
  // A touch wider than the track so its smoothed edges cover the dark track
  // completely, instead of leaving a dark hairline along both sides
  stroke-width: 3.6 !important
  stroke-dasharray: 1
  stroke-linecap: round
  transition: stroke-dashoffset .25s linear

.hello-details
  margin-top: 22px
  text-align: center

.hello-title
  color: #1D1E20
  margin: 0 !important
  font-size: 22px !important
  font-weight: 600 !important
  text-align: center !important

.hello-caption, .hello-message
  color: #1D1E20
  margin: 8px 0 0 !important
  font-size: 16px !important
  text-align: center !important
  opacity: .85

.hello-controls
  display: flex
  justify-content: center
  gap: 8px
  margin-top: 14px

.hello-mini-controls
  position: absolute
  bottom: -14px
  left: 50%
  transform: translateX(-50%)
  display: flex
  gap: 6px

.hello-button
  display: grid
  place-items: center
  width: 40px
  height: 40px
  border-radius: 50%
  color: #F8F7F4
  // The site's near-black (same as the ring and text), solid so the buttons
  // read over any page content
  background: #1D1E20
  transition: background-color .2s

  // Hover only where there is a pointer, so taps don't leave it stuck on
  @media (hover: hover)
    &:hover
      background: #3A3C40

  &:focus-visible
    outline: 2px solid #F8F7F4
    outline-offset: 2px

  // Over the page, not the backdrop: solid so it reads on any background
  &.small
    position: relative
    width: 30px
    height: 30px
    background: #1D1E20
    box-shadow: 0 4px 12px rgba(0, 0, 0, .25)

    // Looks 30px, but takes taps 44px tall (Apple's minimum touch target).
    // Sideways it grows only 3px, so the two buttons' areas meet in the 6px
    // gap between them without overlapping.
    &::before
      content: ''
      position: absolute
      inset: -7px -3px

@media (max-width: 768px)
  .hello-video.is-mini .hello-player
    top: 16px
    left: calc(100% - 16px)
    width: $mini-size-phone

// Reduced motion: GSAP durations drop to 0 (see d()); the ring jumps too
@media (prefers-reduced-motion: reduce)
  .hello-ring-progress
    transition: none
</style>
