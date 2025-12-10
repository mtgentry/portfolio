<!-- Please remove this file from your project -->
<template lang="pug">
  v-row.section(:class="{ slim: !section.media && !section.imageReveal, 'slim-padding': slim_padding, 'line-section': section.line }")
    v-col(v-if="section.text || section.title" :data-aos="shouldSkipAnimation(section) ? null : (section.animation ? section.animation : 'fade-up')")
      String(:texts="section.text" :size="section.size" :title="section.title" :align="section.align")
    v-col(v-if="section.textBox" :data-aos="section.animation ? section.animation : 'fade-up'")
      TextBox(:textBox="section.textBox")
    v-col(v-else-if="section.media" :data-aos="shouldUseAOS(media) ? (media.animation ? media.animation : 'fade-up') : null"
      :class="{ 'hero-fade-in': !shouldUseAOS(media) }"
      v-for="media in section.media" :cols="media.cols ? media.cols : 12 / section.media.length" :key="media.name")
      Media(:media="media" :project_name="$route.params.project")
    v-col(v-else-if="section.line")
      hr
    v-col(v-else-if="section.quote" :data-aos="section.animation ? section.animation : 'fade-up'")
      Quote(:quote="section.quote")
  


    v-col.w-100(v-else-if="section.credits" :data-aos="section.animation ? section.animation : 'fade-up'")
      Credits(:credits="section.credits")
    v-col.w-100(v-else-if="section.faq" :data-aos="section.animation ? section.animation : 'fade-up'")
      Faq(:faqs="section.faq")
    v-col.w-100(v-else-if="section.button" :data-aos="section.animation ? section.animation : 'fade-up'")
      Button(:button="section.button")
    v-col.w-100(v-else-if="section.form" :data-aos="section.animation ? section.animation : 'fade-up'")
      MailchimpForm
    v-col.w-100(v-else-if="section.svgs" :data-aos="section.animation ? section.animation : 'fade-up'")
      SVGs
    v-col.w-100(v-else-if="section.cta" :data-aos="section.animation ? section.animation : 'fade-up'")
      CTA
    v-col.w-100(v-else-if="section.pricing" :data-aos="section.animation ? section.animation : 'fade-up'")
      Pricing
    v-col.w-100(v-else-if="section.faq2" :data-aos="section.animation ? section.animation : 'fade-up'")
      Faq2
    v-col.w-100(v-else-if="section.planscta" :data-aos="section.animation ? section.animation : 'fade-up'")
      PlansCTA
    v-col.w-100(v-else-if="section.calendly" :data-aos="section.animation ? section.animation : 'fade-up'")
      calendly
    v-col.w-100(v-else-if="section.audit" :data-aos="section.animation ? section.animation : 'fade-up'")
      audit
    v-col.w-100(v-else-if="section.beforeafter" :data-aos="section.animation ? section.animation : 'fade-up'")
      beforeafter
    v-col(v-else-if="section.imageReveal" :data-aos="section.animation ? section.animation : 'fade-up'")
      ImageReveal(:imageName="section.imageReveal.imageName" :width="section.imageReveal.width" :project_name="$route.params.project")
    v-col(v-else-if="section.media" :data-aos="media.animation === 'disable' ? null : (media.animation ? media.animation : 'fade-up')")





</template>

<script>
import Media from "@/components/Media.vue";
import Quote from "@/components/project/Quote.vue";
import Credits from "@/components/project/Credits.vue";
import Faq from "@/components/project/Faq.vue";
import Button from "@/components/project/Button.vue";
import String from "@/components/project/String.vue";
import SVGs from "@/components/SVGs.vue";
import CTA from "@/components/CTA.vue";
import Pricing from "@/components/Pricing.vue";
import Faq2 from "@/components/Faq2.vue";
import PlansCTA from "@/components/PlansCTA.vue";
import TextBox from "@/components/project/TextBox.vue";
import ImageReveal from "@/components/ImageReveal.vue";

export default {
  props: {
    section: {
      type: Object,
      required: true
    },
    slim_padding: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TextBox,
    String,
    Quote,
    Media,
    Credits,
    Faq,
    Button,
    SVGs,
    Pricing,
    CTA,
    ImageReveal
  },
  methods: {
    shouldUseAOS(media) {
      // Check if this is the first section with media (hero image)
      // Get all sections from parent component
      const sections = this.$parent.project?.layout || []
      const currentSectionIndex = sections.findIndex(s => s === this.section)

      // If this is the first section, don't use AOS (return false)
      return currentSectionIndex !== 0
    },
    shouldSkipAnimation(section) {
      // Skip animation for agency credits, client credits, etc.
      if (section.text && Array.isArray(section.text)) {
        return section.text.some(text =>
          text.includes('Agency:') ||
          text.includes('Client:') ||
          text.includes('Personal Project')
        )
      }
      return false
    }
  }
}
</script>

<style lang="sass">

.section
  // padding-top: 15px  // Commented out to reduce spacing
  min-width: 50%

  &:first-child
    padding-top: 80px

  // Sections with media (images, videos, etc.)
  &:not(.slim)
    padding-top: 65px  // Increased from 50px
    padding-bottom: 65px  // Increased from 50px
    // border: 1px solid black !important  // DEBUG: Visualize media section boundary

  @media (max-width: 768px)
    padding-top: 10px

    &:first-child
      padding-top: 20px

    // For sections with only media, use minimal padding
    &:not(.slim)
      padding-top: 0px

      &:first-child
        padding-top: 10px
  

  &.slim-padding
    padding-top: 10px

  &.line-section
    padding-top: 0
    padding-bottom: 0
    margin-top: 15px

    + .section
      padding-top: 5px
      margin-top: -5px  // Pull section closer to rule above

      p
        margin-top: 0 !important

  // rule line
  &:nth-child(7).slim-padding
    // Removed height: 100px to fix excessive spacing

  // what you get
  &:nth-child(8).slim-padding 
    

  p:last-child
    margin-bottom: 0

  @media (max-width: 768px)
    padding-bottom: 5px
    
    // Reduce spacing for sections with media (not slim class)
    &:not(.slim)
      padding-bottom: 0px

.slim
  max-width: 659px
  width: 100%
  // border: 2px solid orange !important  // DEBUG: Visualize section boundary

  // Only add space when followed by another slim section
  + .slim
    margin-top: 80px

  .col, .v-col
    padding: 0 12px  // Keep horizontal padding, remove vertical

.images
  display: flex
  align-items: center
  justify-content: center

  img
    width: 100%

.text
  [data-aos=fade-up]
    transform: translate3d(0, 30px, 0)

// rule line styling moved to global styles in layouts/default.vue

// Hero image fade-in animation (no scroll trigger)
.hero-fade-in
  opacity: 0
  animation: heroFadeIn 1s ease-out 0.5s forwards

@keyframes heroFadeIn
  from
    opacity: 0
    transform: translateY(30px)
  to
    opacity: 1
    transform: translateY(0)

// Reduce column padding on mobile - target all variations
@media (max-width: 768px)
  .col, .v-col, [class*="col-"]
    padding-top: 0 !important
    padding-bottom: 0 !important
    margin-top: 0 !important
    margin-bottom: 0 !important
    
  // Target AOS elements specifically  
  .aos-init, .aos-animate
    padding-top: 0 !important
    padding-bottom: 0 !important
    margin-top: 0 !important
    margin-bottom: 0 !important
    
  // DEBUG: Add colored borders to specific selectors (COMMENTED OUT)
  // h3
  //   border: 2px solid red !important
  //   
  // .text-left
  //   border: 2px solid blue !important
  //   
  // .slim
  //   border: 2px solid green !important
  //   
  // .section:not(.slim)
  //   border: 2px solid orange !important

</style>

