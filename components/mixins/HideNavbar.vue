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
    this.$store.commit('setBackgroundColor', this.backgroundColor)
    let vue = this
    window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
      let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > this.lastScrollTop) {
        vue.hideNav()
      } else if (st < this.lastScrollTop) {
        vue.showNav()
      }
      this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      if (vue.$route.path === '/') return
      if (st > 500) {
        vue.makeBackgroundWhite()
      } else if (st > 0 && st <= 500) {
        vue.makeBackgroundBColor()
      }

    }, false);
  },
  methods: {
    showNav() {
      this.$refs.navbar.$el.classList.remove('hidden')
    },
    hideNav() {
      this.$refs.navbar.$el.classList.add('hidden')
    },
    makeBackgroundWhite() {
      this.$refs.navbar.$el.classList.add('whiteBG')
      this.$store.commit('setBackgroundColor', this.white.backgroundColor)
      this.$store.commit('setTextColor', this.white.textColor)
    },
    makeBackgroundBColor() {
      this.$refs.navbar.$el.classList.remove('whiteBG')
      this.$store.commit('setBackgroundColor', this.$store.state.project.backgroundColor)
      this.$store.commit('setTextColor',  this.$store.state.project.textColor)
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