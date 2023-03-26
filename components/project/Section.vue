<!-- Please remove this file from your project -->
<template lang="pug">
  div.section(v-if="section.title" data-aos="fade-up")
    span.font-weight-bold(v-if="section.title") {{ section.title }}
    p(v-for="text in section.text") {{ text }}
  v-row.section.images(v-else-if="section.images")
    v-col(v-for="image in section.images" :cols="12 / section.images.length" :key="image.name")
      img(:src="`/projects/${$route.params.project}/media/${image.name}`"  data-aos="fade-up")
  v-row.section(v-else)
    v-col(v-for="video in section.videos" :cols="12 / section.videos.length" :key="video.name")
      video(autoplay muted loop data-aos="fade-up")
        source(:src="`/projects/${$route.params.project}/media/${video.name}`" type="video/mp4")
        span Your browser does not support the video tag.

</template>

<script>
export default {
  props: ['section'],
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