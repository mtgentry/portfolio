<script>
export default {
  data() {
    return {
      lastScrollTop: 0,
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
      } // else was horizontal scroll
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