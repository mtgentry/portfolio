<!-- Please remove this file from your project -->
<template lang="pug">
  video.item(muted v-if="is_video" controls :style=`{"width": media.width || "100%", 'justify-content': media.position || ''}`)
    source(:src="mediaPath" type="video/mp4")
    span Your browser does not support the video tag.
  img.item(v-else :src="mediaPath" :style=`{'width': media.width || '100%', 'justify-content': media.position || ''}`
    @load="load" :class="{'custom-fade-in': this.project_name === 'francescas', 'loaded': loaded}")

</template>

<script>

export default {
  props: ['media', 'project_name'],
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    is_video() {
      return this.media.name.includes('mp4')
    },
    mediaPath() {
      return `/work/${this.project_name}/media/${this.media.name}`
    }
  },
  methods: {
    load() {
      this.loaded = true
      this.$AOS.refresh()
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

.custom-fade-in
  min-height: 50vh
  opacity: 0
  transition: opacity 1s ease-in-out

  &.loaded
    opacity: 1
</style>