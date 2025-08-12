<!-- Please remove this file from your project -->
<template lang="pug">
  div.text(ref="textContainer")
</template>

<script>
import { gsap } from 'gsap'

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
      
      // Split text into words first, then wrap each word and split into letters
      const words = this.text.split(' ')
      let htmlContent = ''
      let characterIndex = 0
      
      words.forEach((word, wordIndex) => {
        // Wrap each word in a span with nowrap to prevent breaking
        htmlContent += '<span class="word-wrapper">'
        
        for (let i = 0; i < word.length; i++) {
          const char = word[i]
          htmlContent += `<span class="letter" data-char="${characterIndex}">${char}</span>`
          characterIndex++
        }
        
        htmlContent += '</span>'
        
        // Add space between words (not wrapped) 
        if (wordIndex < words.length - 1) {
          htmlContent += ' '  // Regular space allows line breaks between words
        }
      })
      
      this.$refs.textContainer.innerHTML = htmlContent
      
      // Get all letter elements
      const letterElements = this.$refs.textContainer.querySelectorAll('.letter')
      
      // Group letters by their Y position (line)
      const lettersByLine = {}
      
      letterElements.forEach((letter, index) => {
        const rect = letter.getBoundingClientRect()
        const lineY = Math.round(rect.top) // Round to handle small variations
        
        if (!lettersByLine[lineY]) {
          lettersByLine[lineY] = []
        }
        
        lettersByLine[lineY].push({
          element: letter,
          x: rect.left,
          index: index
        })
      })
      
      // Sort letters within each line by their X position (left to right)
      Object.keys(lettersByLine).forEach(lineY => {
        lettersByLine[lineY].sort((a, b) => a.x - b.x)
      })
      
      // Sort lines by their Y position (top to bottom)
      const sortedLines = Object.keys(lettersByLine).sort((a, b) => parseFloat(a) - parseFloat(b))
      
      // Set initial state for all letters
      letterElements.forEach((letter, index) => {
        // Set initial state - match typetest exactly
        gsap.set(letter, {
          opacity: 0.0,
          y: -20
        })
        
        // Also set positioning CSS
        letter.style.position = 'relative'
        letter.style.display = 'inline-block'
        
        // Ensure parent word-wrapper has proper CSS
        const wordWrapper = letter.parentNode
        if (wordWrapper && wordWrapper.classList.contains('word-wrapper')) {
          wordWrapper.style.display = 'inline-block'
          wordWrapper.style.whiteSpace = 'nowrap'
        }
        
        // Force a reflow to ensure styles are applied
        letter.offsetHeight
      })
      
      // Animate each line from left to right
      sortedLines.forEach((lineY, lineIndex) => {
        const lettersInLine = lettersByLine[lineY]
        
        lettersInLine.forEach((letterData, positionInLine) => {
          const baseDelay = 0.3 + (lineIndex * 0.25) // Each line starts after previous
          const letterDelay = baseDelay + (positionInLine * 0.015) // Letters animate left-to-right
          
          gsap.to(letterData.element, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power1.out",
            delay: letterDelay
          })
        })
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
  
  .word-wrapper
    display: inline-block
    white-space: nowrap

  .letter
    display: inline-block
    position: relative
    will-change: transform, opacity
</style>