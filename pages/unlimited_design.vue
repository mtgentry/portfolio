<template lang="pug">
  v-row(justify="center" align="center" v-if="project")
    v-col(cols="12")
      Section(v-for="(section, i) in project.layout"
        :section="section" :key="section.name" :style="{color: i === 0 ? textColor : 'inherit'}")
    v-col(cols="12")
      Footer

</template>

<script>
import Section from "@/components/project/Section.vue";
import Footer from "@/components/Footer.vue";
import {mapState} from "vuex";

export default {
  components: {
    Section,
    Footer
  },
  fetchOnServer: false,
  transition: 'fade',
  async head() {
  this.$store.commit('setLoading', false)
    this.project = await this.$axios.get(`/pages/${this.$route.name}/layout.json`)
      .then((response) => response.data)
    this.$store.commit('setBackgroundColor', this.project.backgroundColor)
    this.$store.commit('setTextColor', this.project.textColor)
    // this.$store.commit('setProject', this.project)

    return {
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.project.seo_description
        }
      ]
    }
  },
  data() {
    return {
      project: null,
    }
  },
  computed: {
    ...mapState(['textColor'])
  },
}
</script>

<style lang="sass" scoped>
.row
  padding-top: 100px
.col
  display: flex
  align-items: center
  flex-direction: column
</style>
