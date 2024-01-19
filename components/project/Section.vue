<!-- Please remove this file from your project -->
<template lang="pug">
  v-row.section(:class="{ slim: !section.media, 'slim-padding': slim_padding }")
    v-col(v-if="section.text || section.title" :data-aos="section.animation ? section.animation : 'fade-up'")
      String(:texts="section.text" :size="section.size" :title="section.title" :align="section.align")
    v-col(v-if="section.textBox" :data-aos="section.animation ? section.animation : 'fade-up'")
      TextBox(:textBox="section.textBox")
    v-col(v-else-if="section.media" :data-aos="media.animation ? media.animation : 'fade-up'"
      v-for="media in section.media" :cols="media.cols ? media.cols : 12 / media.length" :key="media.name")
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
    CTA
  }
}
</script>

<style lang="sass" scoped>

.section
  padding-top: 10px
  min-width: 50%
  

  &.slim-padding
    padding-top: 10px


  // rule line
  &:nth-child(7).slim-padding 
    
    height: 100px

  // what you get
  &:nth-child(8).slim-padding 
    

  p:last-child
    margin-bottom: 0

  @media (max-width: 768px)
    padding-bottom: 90px

.slim
  max-width: 659px
  width: 100%

.images
  display: flex
  align-items: center
  justify-content: center

  img
    width: 100%

.text
  [data-aos=fade-up]
    transform: translate3d(0, 30px, 0)

// rule line 
hr
  border-color: #83807C
  border: .5px solid #83807C

</style>

