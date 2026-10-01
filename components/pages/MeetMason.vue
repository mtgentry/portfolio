<template lang="pug">
  div.portfolio-homepage
    div.container
      div.content
        p.text
          | Hi, I'm Mason
          HoverImage(
            :id="1"
            :style="{ width: '70px' }"
            icon-src="/images/hover_icon_1.png"
            hover-src="/images/hover_big_1.jpg"
            :use-mirroring="true"
            :show-connector-line="true"
            top-color="#769EF4"
            right-color="#477AF0"
            bottom-color="#164EED"
            left-color="#477AF0"
            border-color="transparent"
            edge-color="#1D1E20"
            :fill-opacity="0"
            mid-frame-color="#1D1E20"
            :mid-frame-count="3"
            :telescope="true"
            :tap-to-reveal="true"
          )
          | , a design engineer based in Los Angeles. My experience spans high-growth startups like Timescale, and world-class agencies like TBWA\Chiat\Day
          HoverImage(
            :id="2"
            :style="{ width: '100px' }"
            icon-src="/images/hover_icon_2.png"
            hover-src="/images/hover_big_2.gif"
            :use-mirroring="true"
            :show-connector-line="true"
            top-color="#84DCB8"
            right-color="#6CB697"
            bottom-color="#4A7E68"
            left-color="#6CB697"
            border-color="transparent"
            edge-color="#1D1E20"
            :fill-opacity="0"
            mid-frame-color="#1D1E20"
            :mid-frame-count="3"
            :telescope="true"
            :tap-to-reveal="true"
          )
          | . Along the way, I've shipped work for brands like Disney, Coke, and Nissan.

        p.text
          | I previously built and sold Faucet Face
          HoverImage(
            :id="3"
            :style="{ width: '55px' }"
            icon-src="/images/hover_icon_3.png"
            hover-src="/images/hover_big_3.jpg"
            :use-mirroring="true"
            :show-connector-line="true"
            top-color="#F8EBEB"
            right-color="#F1D5D5"
            bottom-color="#E5A9AA"
            left-color="#F1D5D5"
            border-color="transparent"
            edge-color="#1D1E20"
            :fill-opacity="0"
            mid-frame-color="#1D1E20"
            :mid-frame-count="3"
            :telescope="true"
            :tap-to-reveal="true"
          )
          |  a reusable bottle brand carried by retailers like Urban Outfitters. I also created Color Supply,
          HoverImage(
            :id="4"
            :style="{ width: '109px' }"
            icon-src="/images/hover_icon_4.png"
            hover-src="/images/hover_big_4.jpg"
            :use-mirroring="true"
            :show-connector-line="true"
            top-color="#F9A58E"
            right-color="#F6633A"
            bottom-color="#BF411C"
            left-color="#F6633A"
            border-color="transparent"
            edge-color="#1D1E20"
            :fill-opacity="0"
            mid-frame-color="#1D1E20"
            :mid-frame-count="3"
            :telescope="true"
            :tap-to-reveal="true"
          )
          |  a tool used by thousands of designers worldwide, and write Design by Numbers, a popular
          HoverImage(
            :id="5"
            :style="{ width: '60px' }"
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
            border-color="transparent"
            edge-color="#1D1E20"
            :fill-opacity="0"
            mid-frame-color="#1D1E20"
            :mid-frame-count="3"
            :telescope="true"
            :tap-to-reveal="true"
          )
          |  newsletter read by 9,000+ designers and&nbsp;developers.

        div.body-copy
          p Over the past two years, AI has enabled me to do even more. I've built micro-sites, prototypes, custom tooling, and shipped designs myself instead of handing them off. I also work alongside developers, committing production code to GitHub.
          p Now I'm looking for my next great role. I'm not in a hurry. I want to find the right fit. And that's where you come in.
          p I'm taking on small, scoped design projects with a few early-stage startups. If it goes well, we continue the conversation. If it doesn't, you'll still have a design asset you can use for your business.
          p If you'd like to see how I use design to drive outsized results for startups, sign up below.

        form.signup-form(v-if="!isSubscribed" @submit.prevent="handleSubscribe")
          div.signup-row
            label.signup-field
              span.signup-label Name
              input.signup-input(
                ref="firstNameInput"
                v-model="firstName"
                type="text"
                required
                :disabled="isSubmitting"
              )
            label.signup-field
              span.signup-label Work email
              input.signup-input(
                v-model="email"
                type="email"
                required
                :disabled="isSubmitting"
              )
            button.signup-submit(type="submit" :disabled="isSubmitting")
              | {{ isSubmitting ? 'One moment...' : 'Submit' }}
          p.signup-error(v-if="subscribeError") {{ subscribeError }}
        p.signup-success(v-else) Thanks, {{ firstName }}! You'll hear from me soon.
</template>

<script>
import { gsap } from 'gsap'
import HoverImage from '@/components/HoverImage.vue'

export default {
  name: 'MeetMason',
  components: {
    HoverImage
  },
  head() {
    // Link preview for when /meet_mason is shared on X, iMessage, Slack, etc.
    const title = 'Mason Gentry, design engineer'
    const description = 'Design engineer in Los Angeles. Taking on small, scoped design projects with a few early-stage startups.'
    const url = 'https://masongentry.com/meet_mason'
    const image = 'https://masongentry.com/images/meet_mason_preview.jpg'
    return {
      title: 'Mason Gentry',
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:image', property: 'og:image', content: image },
        { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
        { hid: 'og:image:height', property: 'og:image:height', content: '628' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: image }
      ]
    }
  },
  data() {
    return {
      // DigitalOcean Function that adds the signup to beehiiv (see functions/)
      formEndpoint: '/api/signup/subscribe',
      firstName: '',
      email: '',
      isSubmitting: false,
      isSubscribed: false,
      subscribeError: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.wrapTextNodes()
      this.animatePageLoad()
      this.focusNameWhenVisible()
    })
  },
  beforeDestroy() {
    this.formObserver?.disconnect()
  },
  methods: {
    // Which ad or link brought this visitor, from the UTM tags on the URL
    // (e.g. ?utm_source=x&utm_campaign=founder_keywords), so beehiiv can show it
    adSource() {
      const params = new URLSearchParams(window.location.search)
      const source = {}
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
        if (params.get(key)) source[key] = params.get(key)
      }
      return source
    },
    focusNameWhenVisible() {
      // Put the blinking cursor in the name field once the form scrolls into
      // view. Focusing on load made Safari jump the page down to the form.
      const input = this.$refs.firstNameInput
      if (!input || !('IntersectionObserver' in window)) return

      this.formObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        input.focus({ preventScroll: true })
        this.formObserver.disconnect()
      }, { threshold: 1 })
      this.formObserver.observe(input)
    },
    async handleSubscribe() {
      if (!this.email || this.isSubmitting) return

      this.isSubmitting = true
      this.subscribeError = ''

      try {
        const response = await fetch(this.formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ firstName: this.firstName, email: this.email, ...this.adSource() })
        })
        if (!response.ok) throw new Error(response.statusText)
        this.isSubscribed = true
      } catch (error) {
        this.subscribeError = 'Something went wrong. Please try again.'
      } finally {
        this.isSubmitting = false
      }
    },
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

      // Final width of each image, and how wide its reveal starts
      const finalWidths = [70, 100, 55, 109, 60]
      const startWidths = [44, 44, 44, 40, 44] // 4th image starts narrower

      // Each wrapper takes its final width up front so lines break where they
      // will end up; the reveal is a clip mask opening from startWidth instead
      // of a width change, which used to push icons onto the next line. The
      // same widths are set inline on each HoverImage in the template, so the
      // server-rendered layout already matches before this code runs.
      const clipFor = (hidden) => `inset(0px ${hidden}px 0px 0px round 12px)`
      imageWrappers.forEach((wrapper, index) => {
        gsap.set(wrapper, {
          width: finalWidths[index],
          height: 52,
          opacity: 0,
          clipPath: clipFor(finalWidths[index] - startWidths[index])
        })
      })
      gsap.set(textContent, { opacity: 0 })

      // Create timeline with 1s delay
      const tl = gsap.timeline({ delay: .2 })

      // Individual stagger delays for each image (in seconds from start)
      const staggerDelays = [0, 0.2, 0.4, 0.6, 1.0] // 5th image delayed more

      staggerDelays.forEach((delay, index) => {
        if (!imageWrappers[index]) return

        // Fade in each image with custom timing
        tl.to(imageWrappers[index], {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        }, delay)

        // Then open the mask to the full width. The mask is removed once open,
        // since it would also clip the hover overlay that lives inside the wrapper
        tl.to(imageWrappers[index], {
          clipPath: clipFor(0),
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => gsap.set(imageWrappers[index], { clearProps: 'clipPath' })
        }, delay + 0.15)
      })

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
  color: #1D1E20
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
    // Rebalance the last lines so a paragraph never ends on a single word
    text-wrap: pretty
    line-height: 1.6 !important  // !important to beat the site-wide 140% in layouts/default.vue
    color: #1D1E20
    font-size: 32px !important
    width: 650px
    max-width: 100%

  .text-content
    display: inline
    opacity: 0

  // Negative vertical margins let the images spill past their line instead
  // of pushing it taller, so every line is spaced evenly
  .image-wrapper
    margin-top: -12px
    margin-bottom: -12px
    border-radius: 12px

  .body-copy
    margin-top: 48px

    p
      margin-bottom: 20px
      font-size: 20px
      line-height: 1.6
      color: #1D1E20

  .signup-form
    display: flex
    flex-direction: column
    gap: 18px
    margin-top: 74px
    margin-bottom: 80px

  .signup-row
    display: flex
    align-items: flex-end
    gap: 26px

  .signup-field
    display: flex
    flex: 1
    flex-direction: column
    min-width: 0

  .signup-label
    margin-bottom: 4px
    font-size: 11px
    letter-spacing: 0.06em
    text-transform: uppercase
    color: #948F8B

  .signup-input
    width: 100%
    font-family: inherit
    font-size: 18px
    line-height: 1
    padding: 0 0 8px 0
    border: none
    border-bottom: 1px solid #D6D3CE
    border-radius: 0
    outline: none
    background: transparent
    color: #1D1E20
    transition: border-color 0.15s ease

    &:focus
      border-bottom-color: #1D1E20

    &::placeholder
      font-weight: 300
      color: #B5B1AC

  .signup-submit
    flex: none
    white-space: nowrap
    font-family: inherit
    font-size: 14px
    font-weight: 500
    padding: 8px 16px
    background: #1D1E20
    color: #FFFFFF
    border: none
    border-radius: 8px
    cursor: pointer
    transition: background 0.15s ease

    &:hover
      background: #3A3B3E

    &:disabled
      background: #948F8B
      cursor: not-allowed

  .signup-error
    margin: 0
    font-size: 15px
    color: #B91C1C

  .signup-success
    margin-top: 44px
    margin-bottom: 80px
    font-size: 20px
    color: #1D1E20

// Responsive design
@media (max-width: 768px)
  // 15px total per side: the layout's v-container adds 12px, this adds 3px,
  // and the inner .container's own Vuetify padding is removed
  .portfolio-homepage
    padding: 60px 3px 10px 3px

  .container
    padding-left: 0
    padding-right: 0

  .content p.text
    font-size: 28px !important
    line-height: 1.6 !important

  .content .body-copy p
    font-size: 18px

@media (max-width: 480px)
  .portfolio-homepage
    padding: 40px 3px 10px 3px

  .content .signup-row
    flex-direction: column
    align-items: stretch
    gap: 18px

  .content .signup-submit
    margin-top: 18px

  .content p.text
    font-size: 28px !important
    line-height: 1.6 !important
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
