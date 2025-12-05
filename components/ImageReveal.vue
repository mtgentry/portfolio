<template lang="pug">
  div.wrapper
    div.image-container(:class="{ 'revealed': isRevealed }" :style="{ width: width || '100%' }")
      img(:src="`/domains/portfolio/work/${project_name}/media/${imageName}`" :alt="imageName")
    button.reveal-button(@click="toggleReveal")
      | {{ isRevealed ? 'Hide Full Site' : 'View Full Site' }}
</template>

<script>
export default {
  name: "ImageReveal",
  props: {
    imageName: {
      type: String,
      required: true
    },
    project_name: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      isRevealed: false
    }
  },
  methods: {
    toggleReveal() {
      this.isRevealed = !this.isRevealed;
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  gap: 20px

.image-container
  width: 100%
  overflow: hidden
  max-height: 87vh  // Show top 87% of viewport by default
  transition: max-height 0.8s ease-in-out
  position: relative

  &.revealed
    max-height: 10000px  // Reveal full image

  &::after
    content: ''
    position: absolute
    bottom: 0px
    left: 0
    right: 0
    height: 75px
    background: linear-gradient(to bottom, transparent, white)
    pointer-events: none
    transition: opacity 0.3s ease

  &.revealed::after
    opacity: 0  // Hide gradient when fully revealed

  img
    width: 100%
    display: block

.reveal-button
  padding: 10px 20px
  font-size: 16px
  cursor: pointer
  border: 1px solid black
  background-color: transparent
  transition: opacity 0.3s ease

  &:hover
    opacity: 0.7
</style>
