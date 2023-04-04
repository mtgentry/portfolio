<!-- Please remove this file from your project -->
<template lang="pug">
  v-row.section
    v-col.pa-0(v-if="section.text" data-aos="fade-up")
      div.text
        span.title(v-if="section.title") {{ section.title }}
        p(v-for="text in section.text") {{ text }}
    v-col.pa-0(v-else-if="section.media" data-aos="fade-up" v-for="media in section.media" :cols="12 / media.length" :key="media.name")
      Media(:media="media" :project_name="$route.params.project")
</template>

<script>
import Media from "@/components/Media.vue";

export default {
  props: ['section'],
  components: {
    Media,
  }
}
</script>

<style lang="sass" scoped>

.section
  padding-bottom: 140px

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