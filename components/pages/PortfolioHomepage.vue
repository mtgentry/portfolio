<template lang="pug">
  div.portfolio-homepage
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

        p.email-contact
          | Say hello:
          span.email-text {{ reversedEmail }}
</template>

<script>
import { gsap } from 'gsap'
import HoverImage from '@/components/HoverImage.vue'

export default {
  name: 'PortfolioHomepage',
  components: {
    HoverImage
  },
  head() {
    return {
      title: 'Mason Gentry'
    }
  },
  data() {
    return {
      emailParts: ['mgentry', '@', 'masongentry', '.', 'com']
    }
  },
  computed: {
    reversedEmail() {
      return this.emailParts.join('')
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

      // Check which images are in viewport
      const visibleImageCount = Array.from(imageWrappers).filter(wrapper => {
        const rect = wrapper.getBoundingClientRect()
        return rect.top < window.innerHeight && rect.bottom > 0
      }).length

      // Set initial states - mask reveals from 44px wide, all 52px tall
      gsap.set(imageWrappers, { width: 44, height: 52, opacity: 0 })
      gsap.set(imageWrappers[3], { width: 40, height: 52, opacity: 0 }) // 4th image starts narrower
      gsap.set(textContent, { opacity: 0 })

      // Create timeline with 1s delay
      const tl = gsap.timeline({ delay: .2 })

      // Individual stagger delays for each image (in seconds from start)
      const staggerDelays = [0, 0.2, 0.4, 0.6, 1.0, 1.2, 1.4] // 5th image delayed more

      // Fade in each image with custom timing
      staggerDelays.forEach((delay, index) => {
        if (imageWrappers[index]) {
          tl.to(imageWrappers[index], {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          }, delay)
        }
      })

      // Animate each wrapper to its unique final dimensions
      tl.to(imageWrappers[0], {
        width: 70,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, staggerDelays[0] + 0.15) // First image (after Mason)
      .to(imageWrappers[1], {
        width: 100,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, staggerDelays[1] + 0.15) // Second image (after TBWA\Chiat\Day)
      .to(imageWrappers[2], {
        width: 55,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, staggerDelays[2] + 0.15) // Third image (after glass)
      .to(imageWrappers[3], {
        width: 109,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, staggerDelays[3] + 0.15) // Fourth image (after Color Supply)
      .to(imageWrappers[4], {
        width: 60,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, staggerDelays[4] + 0.15) // Fifth image (after popular)
      .to(imageWrappers[5], {
        width: 77,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, staggerDelays[5] + 0.15) // Sixth image (after renovating)
      .to(imageWrappers[6], {
        width: 80,
        height: 52,
        duration: 0.4,
        ease: "power2.out"
      }, staggerDelays[6] + 0.15) // Seventh image (after restoring)

      // Calculate when the last visible image completes
      // Get the stagger delay for the last visible image
      const lastVisibleImageDelay = staggerDelays[visibleImageCount - 1] || 0
      // Last visible image completes at: its stagger delay + 0.15 (width delay) + 0.4 (width duration)
      const lastVisibleImageTime = lastVisibleImageDelay + 0.15 + 0.4

      // Fade in text after last visible image completes
      tl.to(textContent, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, lastVisibleImageTime + 0.01)
    }
  }
}
</script>

<style lang="sass" scoped>
.portfolio-homepage
  background-color: #F8F7F4
  color: #000000
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: flex-start
  padding: 80px 40px 10px 40px

.container
  max-width: 650px

.content
  p.text
    margin-bottom: 24px
    line-height: 1.7
    color: #000000
    font-size: 32px !important
    width: 650px
    max-width: 100%

  .text-content
    display: inline
    opacity: 0

  p.email-contact
    margin-top: 60px
    margin-bottom: 10px
    font-size: 14px
    color: #999
    opacity: 0.6

    .email-text
      margin-left: 4px
      user-select: all

// Responsive design
@media (max-width: 768px)
  .portfolio-homepage
    padding: 60px 20px 10px 20px

  .content p.text
    font-size: 28px !important
    line-height: 1.7 !important

@media (max-width: 480px)
  .portfolio-homepage
    padding: 40px 20px 10px 20px

  .content p.text
    font-size: 28px !important
    line-height: 1.7 !important
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
