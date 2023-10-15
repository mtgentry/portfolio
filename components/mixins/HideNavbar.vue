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
      this.$store.commit('updateState', {field: 'backgroundColor', value: this.white.backgroundColor})
      this.$store.commit('updateState', {field: 'textColor', value: this.white.textColor})
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
