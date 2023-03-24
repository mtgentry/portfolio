<template lang="pug">
  v-row(justify="center" align="center")
    v-col(cols="12")
      Top(:text="data.header")
      Section(v-for="section in data.layout" :section="section")


</template>

<script>
import Top from '~/components/project/Top.vue'
import Section from "@/components/project/Section.vue";

export default {
  components: {
    Section,
    Top,
  },
  data() {
    return {
      data: {
        header: '',
        layout: [],
      },
      backgroundColor: '#6CAF82',
    }
  },
  async fetch() {
    this.data = await this.$axios.get(`/projects/${this.$route.params.project}/layout.json`)
        .then((response) => response.data)
  },
  mounted() {
    this.$store.commit('changeBackgroundColor', this.backgroundColor)
  },

}
</script>
