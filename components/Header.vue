<!-- Please remove this file from your project -->
<template lang="pug">
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
    
    // Use nextTick to ensure DOM is fully rendered before GSAP
    this.$nextTick(() => {
      setTimeout(() => {
        if (!hasPlayedThisSession && !this.hasAnimated) {
          this.animateText()
          this.hasAnimated = true
          sessionStorage.setItem('headerAnimationPlayed', 'true')
        } else {
          // If animation was skipped, ensure text is visible
          gsap.set(this.$refs.textContainer, { opacity: 1 })
        }
      }, 100)
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
  .text
    font-size: 50px
    line-height: 66px
    padding-top: 200px
    padding-bottom: 160px
    min-height: 300px
    overflow: visible
    text-align: left
</style>