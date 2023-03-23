<template lang="pug">
  v-row(justify="center" align="center")
    v-col(cols="12")
      Top(:text="data.description")
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
        top: '',
        layout: [],
      },
      backgroundColor: '#6CAF82',
    }
  },
  mounted() {
    this.$store.commit('changeBackgroundColor', this.backgroundColor)
    this.getData()
  },
  methods: {
    getData() {
      this.$axios.get(`/projects/${this.$route.params.project}.json`)
        .then((response) => {
          this.data = response.data
        })
    }
  }

}
</script>
