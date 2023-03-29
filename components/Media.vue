<!-- Please remove this file from your project -->
<template lang="pug">
  video.item(muted v-if="is_video" controls :style=`{"width": media.width || "100%", 'justify-content': media.position || ''}`)
    source(:src="mediaPath" type="video/mp4")
    span Your browser does not support the video tag.
  img.item(v-else :src="mediaPath" :style=`{'width': media.width || '100%', 'justify-content': media.position || ''}`)

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
  width: 100%

  @media (max-width: 768px)
    width: unset!important
    max-width: 100%!important


</style>