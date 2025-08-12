<template lang="pug">
  div.test-page
    div.container
      div.text(ref="textContainer") Designer of intuitive, beautiful, and useful digital products. I like building things that make people's lives easier.
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'TestPage',
  layout: 'default',
  head() {
    return {
      title: 'Animation Test'
    }
  },
  mounted() {
    // Use nextTick to ensure DOM is fully rendered before GSAP
    this.$nextTick(() => {
      setTimeout(() => {
        this.animateText()
      }, 100)
    })
  },
  methods: {
    animateText() {
      const textContainer = this.$refs.textContainer
      const originalText = textContainer.textContent
      
      if (!originalText) return
      
      // Split text into words first, then wrap each word and split into letters
      const words = originalText.split(' ')
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
      
      textContainer.innerHTML = htmlContent
      
      // Get all letter elements
      const letterElements = textContainer.querySelectorAll('.letter')
      
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
      
      // ENSURE LETTERS START HIDDEN - Direct CSS without !important
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
.test-page
  background-color: #282725
  color: #FFFFFF
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: flex-start
  padding-left: 40px

.container
  max-width: 800px
  padding: 0

.text
  font-size: 50px
  line-height: 66px
  font-weight: 400
  overflow: visible
  text-align: left

.word-wrapper
  display: inline-block
  white-space: nowrap

.letter
  display: inline-block
  position: relative
  will-change: transform, opacity

// Responsive design
@media (max-width: 768px)
  .text
    font-size: 36px
    line-height: 48px
  
  .container
    padding: 20px

@media (max-width: 480px)
  .text
    font-size: 28px
    line-height: 38px
</style>