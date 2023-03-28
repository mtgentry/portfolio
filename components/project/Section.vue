<!-- Please remove this file from your project -->
<template lang="pug">
  div.section
    div.text(v-if="section.text")
      span.font-weight-bold(v-if="section.title" data-aos="fade-up") {{ section.title }}
      p(v-for="text in section.text" data-aos="fade-up") {{ text }}
    v-row(v-else-if="section.media" data-aos="fade-up")
      v-col(v-for="media in section.media" :cols="12 / media.length" :key="media.name")
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
  padding-bottom: 185px

  .text
    color: #282725
    padding: 0 400px

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