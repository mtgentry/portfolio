<!-- Please remove this file from your project -->
<template lang="pug">
  div.text-wrapper
    div.text(ref="textContainer") {{ text }}
</template>

<script>
import { gsap } from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'

gsap.registerPlugin(SplitText)

export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hasAnimated: false
    }
  },
  mounted() {
    // Clear animation flag on page refresh
    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('headerAnimationPlayed')
    })
    
    // Check if animation has already played this session
    const hasPlayedThisSession = sessionStorage.getItem('headerAnimationPlayed')
    
    // Set animation flag immediately (before other components check it)
    if (!hasPlayedThisSession) {
      sessionStorage.setItem('textAnimationPlaying', 'true')
    } else {
      sessionStorage.setItem('textAnimationPlaying', 'false')
    }
    
    // Wait for fonts to load before running SplitText
    this.$nextTick(() => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          this.initializeAnimation(hasPlayedThisSession)
        })
      } else {
        // Fallback for browsers without font loading API
        setTimeout(() => {
          this.initializeAnimation(hasPlayedThisSession)
        }, 500)
      }
    })
  },
  beforeDestroy() {
    // Use GSAP to handle the fade out instead of CSS transitions
    if (this.$refs.textContainer) {
      gsap.to(this.$refs.textContainer, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.out"
      })
    }
  },
  methods: {
    initializeAnimation(hasPlayedThisSession) {
      if (!hasPlayedThisSession && !this.hasAnimated) {
        this.animateText()
        this.hasAnimated = true
        sessionStorage.setItem('headerAnimationPlayed', 'true')
      } else {
        // If animation was skipped, ensure text is visible
        gsap.set(this.$refs.textContainer, { opacity: 1 })
      }
    },
    animateText() {
      if (!this.text) return
      
      // Set initial opacity to 10%
      gsap.set(this.$refs.textContainer, { opacity: 0.1 })
      
      // Use GSAP SplitText with mask for character reveals
      SplitText.create(this.$refs.textContainer, {
        type: "chars, words, lines",
        linesClass: "line",
        mask: "lines",
        onSplit: (self) => {
          // Animate the container to full opacity and characters from below
          gsap.to(this.$refs.textContainer, {
            opacity: 1,
            duration: 1.5,
            ease: "power1.out",
            delay: 0.4
          })
          
          gsap.from(self.chars, {
            duration: 0.8,
            yPercent: 100,
            stagger: {
              amount: 0.4,
              from: "start"
            },
            ease: "power1.out",
            delay: 0.4
          })
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .text-wrapper
    padding-top: 200px
    padding-bottom: 160px
    min-height: 300px
    
    @media (max-width: 768px)
      padding-top: 70px
      padding-bottom: 50px
      display: flex
      align-items: center
      justify-content: flex-start

  .text
    font-size: 50px
    line-height: 66px
    overflow: visible
    text-align: left
    max-width: 90vw
    word-spacing: 0.1em
    
    // Prevent initial flash before animation
    opacity: 0
    
    // Improve text wrapping for better phrase breaks
    hyphens: none
    word-break: keep-all
    overflow-wrap: break-word
    
    @media (max-width: 768px)
      font-size: 42px
      line-height: 120%
</style>