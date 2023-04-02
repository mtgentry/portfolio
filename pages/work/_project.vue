<template lang="pug">
  v-row(justify="center" align="center" v-if="project")
    v-col(cols="12")
      Top(:text="project.header")
    v-col(cols="12")
      Section(v-for="section in project.layout" :section="section" :key="section.name")


</template>

<script>
import Top from '~/components/project/Top.vue'
import Section from "@/components/project/Section.vue";

export default {
  components: {
    Section,
    Top,
  },
  fetchOnServer: true,
  transition: 'fade',
  async head() {
    this.$store.commit('setLoading', false)
    if (this.$store.state.projects) {
      this.project = this.$store.state.projects[this.$route.params.project]
    }

    if (!this.project) {
      this.project = await this.$axios.get(`/work/${this.$route.params.project}/layout.json`)
        .then((response) => response.data)
    }
    this.$store.commit('setBackgroundColor', this.project.backgroundColor)
    this.$store.commit('setTextColor', this.project.textColor)
    this.$store.commit('setProject', this.project)
    return {
      title: this.project.cover.title,
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

}
</script>

<style lang="sass" scoped>
  .col
    display: flex
    align-items: center
    flex-direction: column
</style>