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
    // Use nextTick to ensure DOM is fully rendered before GSAP
    this.$nextTick(() => {
      setTimeout(() => {
        if (!this.hasAnimated) {
          this.animateText()
          this.hasAnimated = true
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
      
      // Use GSAP SplitText to split the text into characters and words
      const split = new SplitText(this.$refs.textContainer, {
        type: "chars, words"
      })
      
      // Animate from initial state to final state
      gsap.fromTo(split.chars, 
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power1.out",
          stagger: {
            amount: 0.9,
            from: "start",
            ease: "power1.in"
          },
          delay: 0.3
        }
      )
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