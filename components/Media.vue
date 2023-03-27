<!-- Please remove this file from your project -->
<template lang="pug">
  div.item(:style="{'justify-content': media.position || 'center'}" :class="media.position? 'position' : ''" )
    video(muted v-if="is_video" controls data-aos="fade-up")
      source(:src="mediaPath" type="video/mp4")
      span Your browser does not support the video tag.
    img(:src="mediaPath" v-else data-aos="fade-up")


</template>

<script>

export default {
  props: ['media', 'project_name'],
  computed: {
    is_video() {
      return this.media.name.includes('mp4')
    },
    mediaPath() {
      return `/projects/${this.project_name}/media/${this.media.name}`
    }
  }
}
</script>

<style lang="sass" scoped>

.item
  display: flex
  align-items: center
  min-height: 300px
  height: 100%

.position
  img
    width: 80%

img
  width: 100%

video
  width: 100%

</style>