<template lang="pug">
  div.test-page
    div.container
      div.content
        p.text
          | Hi, I'm Mason
          HoverImage(
            :id="1"
            icon-src="/images/hover_icon_1.png"
            hover-src="/images/hover_big_1.jpg"
            :use-mirroring="true"
            :show-connector-line="true"
            top-color="#769EF4"
            right-color="#477AF0"
            bottom-color="#164EED"
            left-color="#477AF0"
            border-color="#477AF0"
          )
          | . I'm a designer and founder based in Los Angeles. My experience spans high-growth startups and global firms including Boston Consulting Group and TBWA\Chiat\Day
          HoverImage(
            :id="2"
            icon-src="/images/hover_icon_2.png"
            hover-src="/images/hover_big_2.gif"
            :use-mirroring="true"
            :show-connector-line="true"
            top-color="#84DCB8"
            right-color="#6CB697"
            bottom-color="#4A7E68"
            left-color="#6CB697"
            border-color="#6CB697"
          )
          | . Along the way, I've shipped work for brands like Disney, Coke, and Nissan.

        p.text
          | I previously built and sold Faucet Face a glass
          HoverImage(
            :id="3"
            icon-src="/images/hover_icon_3.png"
            hover-src="/images/hover_big_3.jpg"
            :use-mirroring="true"
            :show-connector-line="true"
            top-color="#F8EBEB"
            right-color="#F1D5D5"
            bottom-color="#E5A9AA"
            left-color="#F1D5D5"
            border-color="#F1D5D5"
          )
          |  bottle brand carried by retailers like Urban Outfitters and Fab. I also created Color Supply,
          HoverImage(
            :id="4"
            icon-src="/images/hover_icon_4.png"
            hover-src="/images/hover_big_4.jpg"
            :use-mirroring="true"
            :show-connector-line="true"
            top-color="#F9A58E"
            right-color="#F6633A"
            bottom-color="#BF411C"
            left-color="#F6633A"
            border-color="#F6633A"
          )
          |  a tool used by thousands of designers worldwide, and write Design by Numbers, a popular
          HoverImage(
            :id="5"
            icon-src="/images/hover_icon_5.png"
            hover-src="/images/hover_big_5.gif"
            :image-width="350"
            :image-height="250"
            :use-mirroring="true"
            :show-connector-line="true"
            top-color="#F8D9AE"
            right-color="#F1B456"
            bottom-color="#C79445"
            left-color="#F1B456"
            border-color="#F1B456"
          )
          |  newsletter for 9,000+ designers and developers.

        p.text
          | In my spare time, I'm renovating
          HoverImage(
            :id="6"
            icon-src="/images/hover_icon_6.png"
            hover-src="/images/hover_big_6.gif"
            :use-mirroring="true"
            :show-connector-line="true"
            top-color="#616368"
            right-color="#2C2E31"
            bottom-color="#1D1E20"
            left-color="#2C2E31"
            border-color="#2C2E31"
          )
          |  and restoring
          HoverImage(
            :id="7"
            icon-src="/images/hover_icon_7.png"
            hover-src="/images/hover_big_7.gif"
            :use-mirroring="true"
            :show-connector-line="true"
            top-color="#769EF4"
            right-color="#477AF0"
            bottom-color="#164EED"
            left-color="#477AF0"
            border-color="#477AF0"
          )
          |  this 1908 Craftsman. The project is definitely on schedule and expected to be completed by 2050.
</template>

<script>
import { gsap } from 'gsap'
import HoverImage from '@/components/HoverImage.vue'

export default {
  name: 'TestPage',
  layout: 'default',
  components: {
    HoverImage
  },
  head() {
    return {
      title: 'Animation Test'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.wrapTextNodes()
      this.animatePageLoad()
    })
  },
  methods: {
    wrapTextNodes() {
      // Wrap text nodes in spans so we can animate them separately from images
      const paragraphs = document.querySelectorAll('p.text')
      paragraphs.forEach(p => {
        const nodes = Array.from(p.childNodes)
        nodes.forEach(node => {
          if (node.nodeType === 3 && node.textContent.trim()) { // Text node
            const span = document.createElement('span')
            span.className = 'text-content'
            span.textContent = node.textContent
            p.replaceChild(span, node)
          }
        })
      })
    },
    animatePageLoad() {
      const imageWrappers = document.querySelectorAll('.image-wrapper')
      const textContent = document.querySelectorAll('.text-content')

      // Set initial states - mask reveals from 44px wide, all 52px tall
      gsap.set(imageWrappers, { width: 44, height: 52, opacity: 0 })
      gsap.set(textContent, { opacity: 0 })

      // Create timeline with 1s delay
      const tl = gsap.timeline({ delay: .2 })

      // Fade in image quickly first
      tl.to(imageWrappers, {
        opacity: 1,
        duration: 0.3,
        stagger: 0.3, // Each image animates 0.3s after the previous (2nd at 0.3s, 3rd at 0.6s, 4th at 0.9s, 5th at 1.2s, 6th at 1.5s, 7th at 1.8s)
        ease: "power2.out"
      })
      // Animate each wrapper to its unique final dimensions
      .to(imageWrappers[0], {
        width: 70,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, "<0.15") // First image (after Mason)
      .to(imageWrappers[1], {
        width: 100,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, "<0.2") // Second image (after TBWA\Chiat\Day)
      .to(imageWrappers[2], {
        width: 55,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, "<0.2") // Third image (after glass)
      .to(imageWrappers[3], {
        width: 109,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, "<0.2") // Fourth image (after Color Supply)
      .to(imageWrappers[4], {
        width: 60,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, "<0.2") // Fifth image (after popular)
      .to(imageWrappers[5], {
        width: 77,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, "<0.2") // Sixth image (after renovating)
      .to(imageWrappers[6], {
        width: 80,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, "<0.2") // Seventh image (after restoring)

      // Then fade in text after images complete
      .to(textContent, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "+=0.3")
    }
  }
}
</script>

<style lang="sass" scoped>
.test-page
  background-color: #F8F7F4
  color: #000000
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: flex-start
  padding: 80px 40px 100px 40px

.container
  max-width: 650px

.content
  p.text
    margin-bottom: 24px
    line-height: 1.7
    color: #000000
    font-size: 32px !important
    width: 650px

  .text-content
    display: inline
    opacity: 0

// Responsive design
@media (max-width: 768px)
  .test-page
    padding: 60px 20px 80px 20px

  .content p.text
    font-size: 16px

@media (max-width: 480px)
  .test-page
    padding: 40px 20px 60px 20px

  .content p.text
    font-size: 14px
</style>

<style lang="sass">
// Global styles needed for GSAP animations to target HoverImage components
.image-wrapper
  position: relative
  display: inline-block
  margin: 0 5px 0 8px
  padding: 0
  line-height: 0
  vertical-align: middle
  overflow: hidden
  border-radius: 15px
  opacity: 0
</style>