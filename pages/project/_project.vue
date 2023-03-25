<template lang="pug">
  v-row(justify="center" align="center" v-if="project")
    v-col(cols="12")
      Top(:text="project.header")
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
  transition: 'fade',
  data() {
    return {
      project: null,
    }
  },
  async fetch() {
    if (this.$store.state.projects) {
      this.project = this.$store.state.projects[this.$route.params.project]
    }

    if (!this.project) {
      this.project = await this.$axios.get(`/projects/${this.$route.params.project}/layout.json`)
        .then((response) => response.data)
    }
    this.$store.commit('changeBackgroundColor', this.project.backgroundColor)
  },

}
</script>
