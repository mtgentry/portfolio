<!-- Please remove this file from your project -->
<template lang="pug">
  v-row.section
    v-col(v-if="section.text" data-aos="fade-up")
      div.text
        span.title(v-if="section.title" v-html="section.title" )
        p(v-for="text in section.text" v-html="text")
    v-col(v-else-if="section.media" data-aos="fade-up" v-for="media in section.media" :cols="12 / media.length" :key="media.name")
      Media(:media="media" :project_name="$route.params.project")
    v-col(v-else-if="section.quote" data-aos="fade-up")
      Quote(:quote="section.quote")
    v-col.w-100(v-else-if="section.credits" data-aos="fade-up")
      Credits(:credits="section.credits")
</template>

<script>
import Media from "@/components/Media.vue";
import Quote from "@/components/project/Quote.vue";
import Credits from "@/components/project/Credits.vue";

export default {
  props: ['section'],
  components: {
    Quote,
    Media,
    Credits
  }
}
</script>

<style lang="sass" scoped>

.section
  padding-bottom: 140px
  min-width: 50%


  .title
    font-weight: 500
    font-size: 23px
    line-height: 200%


  p:last-child
    margin-bottom: 0

  @media (max-width: 768px)
    padding-bottom: 90px

.text
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
