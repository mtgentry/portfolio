<script>
export default {
  data() {
    return {
      lastScrollTop: 0,
      oldBackgroundColor: null,
    }
  },
  mounted() {
    this.$store.commit('changeBackgroundColor', this.backgroundColor)
    let vue = this
    window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
      let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > this.lastScrollTop) {
        vue.hideNav()
      } else if (st < this.lastScrollTop) {
        vue.showNav()
      }
      if (vue.$route.path === '/') return
      if (st > 500) {
        vue.makeBackgroundWhite()
      } else if (st > 0 && st <= 500) {
        vue.makeBackgroundBColor()
      }
      this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
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
      this.$store.commit('changeBackgroundColor', "#ffffff")
    },
    makeBackgroundBColor() {
      if (this.$store.state.backgroundColor !== "#ffffff") this.oldBackgroundColor = this.$store.state.backgroundColor
      this.$store.commit('changeBackgroundColor', this.oldBackgroundColor)
    },
  },
}
</script>

<style lang="sass">
header
  transform: translateY(0)!important

  &.hidden
    transition: transform 300ms linear
    transform: translateY(-100%)!important
</style>