<template lang="pug">
  v-row(justify="center" align="center" v-if="project")
    div.project-header-container(:style="{height: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5vh'}")
      div.project-header(v-html="project.header" 
        :style="{color: textColor, maxWidth: '80%', fontSize: '40px', lineHeight: '130%', fontWeight: '300'}")
    v-col(cols="12")
      Section(v-for="section in project.layout" :section="section" :key="section.name")
    Footer

</template>

<script>
import Section from "@/components/project/Section.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from 'vuex';

export default {
  components: {
    Section,
    Footer
  },
  fetchOnServer: true,
  transition: 'fade',
  async head() {
    if (this.$store.state.projects) {
      this.project = this.$store.state.projects[this.$route.params.project]
    }

    if (!this.project) {
      this.project = await this.$axios.get(`/work/${this.$route.params.project}/layout.json`)
        .then((response) => response.data)
    }
    this.$store.commit('updateState', {field: 'backgroundColor', value: this.project.backgroundColor})
    this.$store.commit('updateState', {field: 'textColor', value: this.project.textColor})
    this.$store.commit('updateState', {field: 'project', value: this.project})
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
  computed: {
    ...mapState(['textColor']),
  }
}
</script>

<style lang="sass" scoped>
.col
  display: flex
  align-items: center
  flex-direction: column
</style>
