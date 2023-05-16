<!-- Please remove this file from your project -->
<template lang="pug">
  div.aspect-container
    video.item(muted v-if="is_video" playsinline loop ref="video"
      :style=`{"width": media.width || "100%", 'justify-content': media.position || ''}`)
      source(:src="mediaPath" type="video/mp4")
      span Your browser does not support the video tag.
    img.item(v-else :src="mediaPath" :style=`{'width': media.width || '100%', 'justify-content': media.position || ''}`
      @load="load" :class="{'custom-fade-in': this.project_name === 'francescas', 'loaded': loaded}")
    div.text-center.pt-1(v-if="media.title" v-html="media.title")

</template>

<script>

export default {
  props: ['media', 'project_name'],
  data() {
    return {
      loaded: false,
      playVisibleVideosTimeout: null,
    }
  },
  mounted() {
    if (!this.$refs.video) {
      return
    }
    window.addEventListener("scroll", () => {
      clearTimeout(this.playVisibleVideosTimeout);
      this.playVisibleVideosTimeout = setTimeout(this.playVisibleVideos, 100);
    }, {passive: true});

    window.addEventListener("resize", this.playVisibleVideos);
    window.addEventListener("DOMContentLoaded", this.playVisibleVideos);

    this.$refs.video.controls = this.isIos()

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
      if (this.project_name === 'francescas') {
        this.$store.commit('setLoading', false)
      }
      setTimeout(() => {
        this.$AOS.refresh()
      }, 1000)
    },
    playVisibleVideos() {
      if (this.elementIsVisible(this.$refs.video)) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    },

    elementIsVisible(el) {
      let rect = el.getBoundingClientRect();
      return (rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.left <= (window.innerWidth || document.documentElement.clientWidth));
    },

    isIos() {
      const platformExpression = /iPhone/i;
      const rejectedExpression = /Android|CriOS|FxiOS|EdgiOS/i;
      const agent = navigator.userAgent;
      if (rejectedExpression.test(agent)) {
        return false;
      }
      return platformExpression.test(agent)
    }
  }
}
</script>

<style lang="sass" scoped>

.item
  width: 100%

  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)
  transform-style: preserve-3d
  transition: transform 0.5s ease-in-out

  &:hover
    will-change: transform
    transform: translate3d(0px, 0px, 0px) scale3d(1.1, 1.1, 1.1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)


  @media (max-width: 768px)
    width: unset!important
    max-width: 100%!important

.custom-fade-in
  min-height: 50vh
  opacity: 0
  transition: opacity 1s ease-in-out, transform 0.5s ease-in-out

  @media (max-width: 768px)
    min-height: unset

  &.loaded
    opacity: 1

.aspect-container
  overflow: hidden
  display: flex
</style>
