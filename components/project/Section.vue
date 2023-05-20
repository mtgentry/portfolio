<!-- Please remove this file from your project -->
<template lang="pug">
  v-row.section(:class="{ slim: !section.media, 'slim-padding': slim_padding }")
    v-col(v-if="section.text" data-aos="fade-up")
      String(:texts="section.text" :size="section.size" :title="section.title")
    v-col(v-else-if="section.media" data-aos="fade-up" v-for="media in section.media" :cols="12 / media.length" :key="media.name")
      Media(:media="media" :project_name="$route.params.project")
    v-col(v-else-if="section.quote" data-aos="fade-up")
      Quote(:quote="section.quote")
    v-col.w-100(v-else-if="section.credits" data-aos="fade-up")
      Credits(:credits="section.credits")
    v-col.w-100(v-else-if="section.faq" data-aos="fade-up")
      Faq(:faqs="section.faq")
    v-col.w-100(v-else-if="section.button" data-aos="fade-up")
      Button(:button="section.button")
</template>

<script>
import Media from "@/components/Media.vue";
import Quote from "@/components/project/Quote.vue";
import Credits from "@/components/project/Credits.vue";
import Faq from "@/components/project/Faq.vue";
import Button from "@/components/project/Button.vue";
import String from "@/components/project/String.vue";

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
    Button
  }
}
</script>

<style lang="sass" scoped>

.section
  padding-bottom: 140px
  min-width: 50%

  &.slim-padding
    padding-bottom: 20px

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
