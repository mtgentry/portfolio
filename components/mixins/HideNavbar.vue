<script>
export default {
  data() {
    return {
      lastScrollTop: 0,
      white: {
        backgroundColor: "#ffffff",
        textColor: "#282725"
      },
    }
  },
  mounted() {
    this.$store.commit('updateState', {field: 'backgroundColor', value: this.backgroundColor})
    let vue = this
    window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
      let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > this.lastScrollTop) {
        vue.hideNav()
      } else if (st < this.lastScrollTop) {
        vue.showNav()
      }
      this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      if (!vue.$route.path.includes('work')) return
      vue.rememberScrolled(st > 500)
      // The browser just restored a refresh's scroll position: reveal in place
      if (st > 500 && document.documentElement.classList.contains('start-scrolled')) {
        vue.applyScrolledColors()
      }
      if (st > 500) {
        vue.makeBackgroundWhite()
      } else {
        vue.makeBackgroundBColor()
      }

    }, false);

    // A refresh partway down restores the scroll position without a scroll
    // event, which would leave the top-of-page colors showing. Check where we
    // landed once the page has settled.
    this.$nextTick(this.applyScrolledColors)
    window.addEventListener("load", this.applyScrolledColors)
    // Never leave the content hidden for long if the scroll position doesn't
    // come back (slow connection, or the page got shorter)
    setTimeout(() => document.documentElement.classList.remove('start-scrolled'), 1500)
  },
  beforeDestroy() {
    window.removeEventListener("load", this.applyScrolledColors)
  },
  methods: {
    applyScrolledColors() {
      const st = window.pageYOffset || document.documentElement.scrollTop
      const scrolled = this.$route.path.includes('work') && st > 500
      if (scrolled) {
        this.makeBackgroundWhite()
      }
      // The page opened in its scrolled colors (see start-scrolled). Hand control
      // back once the store matches, or once the page has fully loaded and the
      // scroll position really is above the switch point.
      const root = document.documentElement
      if (root.classList.contains('start-scrolled') && (scrolled || document.readyState === 'complete')) {
        setTimeout(() => root.classList.remove('start-scrolled'), 50)
      }
    },
    // Lets the next refresh of this page open in the right colors before JS runs
    rememberScrolled(scrolled) {
      try {
        if (scrolled) sessionStorage.setItem('scrolledPast', this.$route.path)
        else if (sessionStorage.getItem('scrolledPast') === this.$route.path) sessionStorage.removeItem('scrolledPast')
      } catch (e) {}
    },
    showNav() {
      this.$refs.navbar.$el.classList.remove('hidden')
    },
    hideNav() {
      this.$refs.navbar.$el.classList.add('hidden')
    },
    makeBackgroundWhite() {
      this.$refs.navbar.$el.classList.add('whiteBG')
      const bgColor = this.$store.state.pageBackgroundColor || this.white.backgroundColor
      const txtColor = this.$store.state.pageTextColor || this.white.textColor
      this.$store.commit('updateState', {field: 'backgroundColor', value: bgColor})
      this.$store.commit('updateState', {field: 'textColor', value: txtColor})
    },
    makeBackgroundBColor() {
      let backgroundColor = this.$store.state.project ? this.$store.state.project.backgroundColor : this.$store.state.homeBackgroundColor
      let textColor = this.$store.state.project ? this.$store.state.project.textColor : this.$store.state.homeTextColor
      this.$refs.navbar.$el.classList.remove('whiteBG')
      this.$store.commit('updateState', {field: 'backgroundColor', value: backgroundColor})
      this.$store.commit('updateState', {field: 'textColor', value: textColor})
    },
  },
}
</script>

<style lang="sass">
header
  transform: translateY(0)!important
  transition: transform 300ms linear, background-color 1s ease-in-out, color 1s ease-in-out !important

  &.hidden
    transform: translateY(-100%)!important
</style>
