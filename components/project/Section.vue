<!-- Please remove this file from your project -->
<template lang="pug">
  div.section(v-if="section.title" data-aos="fade-up")
    span.font-weight-bold(v-if="section.title") {{ section.title }}
    p(v-for="text in section.text") {{ text }}
  v-row(v-else-if="section.media")
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
  padding: 130px 163px 0 163px
  color: #282725

.images
  display: flex
  align-items: center
  justify-content: center

  img
    width: 100%


</style>