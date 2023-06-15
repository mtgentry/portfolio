<!-- Please remove this file from your project -->
<template lang="pug">
  v-row.section(:class="{ slim: !section.media, 'slim-padding': slim_padding }")
    v-col(v-if="section.text" :data-aos="section.animation ? section.animation : 'fade-up'")
      String(:texts="section.text" :size="section.size" :title="section.title")
    v-col(v-else-if="section.media" :data-aos="media.animation ? media.animation : 'fade-up'" v-for="media in section.media" :cols="12 / media.length" :key="media.name")
      Media(:media="media" :project_name="$route.params.project")
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
    v-col.w-100(v-else-if="section.plans" :data-aos="section.animation ? section.animation : 'fade-up'")
      Plans
    v-col.w-100(v-else-if="section.cta" :data-aos="section.animation ? section.animation : 'fade-up'")
      CTA
    v-col.w-100(v-else-if="section.pricing" :data-aos="section.animation ? section.animation : 'fade-up'")
      Pricing


</template>

<script>
import Media from "@/components/Media.vue";
import Quote from "@/components/project/Quote.vue";
import Credits from "@/components/project/Credits.vue";
import Faq from "@/components/project/Faq.vue";
import Button from "@/components/project/Button.vue";
import String from "@/components/project/String.vue";
import SVGs from "@/components/SVGs.vue";
import Plans from "@/components/Plans.vue";
import CTA from "@/components/CTA.vue";
import Pricing from "@/components/Pricing.vue";

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
  padding-bottom: 140px
  min-width: 50%

  &.slim-padding
    padding-bottom: 0px

  p:last-child
    margin-bottom: 0

  @media (max-width: 768px)
    padding-bottom: 90px

.slim
  max-width: 659px

.images
  display: flex
  align-items: center
  justify-content: center

  img
    width: 100%

.text
  [data-aos=fade-up]
    transform: translate3d(0, 30px, 0)

</style>
