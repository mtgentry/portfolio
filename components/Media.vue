<!-- Please remove this file from your project -->
<template lang="pug">
  div#video.d-flex(v-if="is_video" :style=`{'justify-content': media.position || ''}`)
    video.item(muted playsinline loop ref="video" :style=`{"width": media.width || "100%"}`)
      source(:src="mediaPath" type="video/mp4")
      span Your browser does not support the video tag.
  div(v-else)
    div.aspect-container(:style=`{'justify-content': media.position || ''}`)
      img.item( :src="mediaPath" :style=`{'width': media.width || '100%'}`
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
      if (this.media.name.startsWith('http')) {
        return this.media.name;
      }
      let domain = process.env.IS_AGENCY ? 'agency' : 'portfolio';
      return `/domains/${domain}/${this.pageType}/${this.project_name_or_work}/media/${this.media.name}`;
    },

    pageType() {
      if (this.project_name) {
        return 'work'
      } else if (this.$route.name) {
        return 'pages'
      }
    },
    project_name_or_work() {
      return this.project_name || this.$route.name
    }
  },
  methods: {
    load() {
      this.loaded = true
      if (this.project_name === 'francescas') {
        this.$store.commit('updateState', {field: 'loading', value: false})
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

//add grow effect on main page
#main
  $animation-time: 0.5s
  $scale: scale3d(1.03, 1.03, 1.03)

  .item
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)
    transform-style: preserve-3d
    transition: transform $animation-time ease-in-out

    &:hover
      will-change: transform
      transform: translate3d(0px, 0px, 0px) $scale rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)

  .custom-fade-in
    transition: opacity 1s ease-in-out, transform $animation-time ease-in-out

.item
  width: 100%

  @media (max-width: 768px)
    width: unset!important
    max-width: 100%!important

.custom-fade-in
  min-height: 50vh
  opacity: 0
  transition: opacity 1s ease-in-out

  @media (max-width: 768px)
    min-height: unset

  &.loaded
    opacity: 1

.aspect-container
  overflow: hidden
  display: flex
</style>
