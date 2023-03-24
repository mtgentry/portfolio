<!-- Please remove this file from your project -->
<template lang="pug">
  v-row.portfolio-group
    v-col(:md="12")
      PortfolioItem(v-if="project" :project="project" :project_name="project_name")


</template>

<script>

export default {
  props: ['project_name'],
  data() {
    return {
      project: null,
    }
  },
  async fetch() {
    this.project = await this.$axios.get(`/projects/${this.project_name}/layout.json`, {responseType: 'json'})
      .then((response) => response.data.cover)
    this.project.name = this.project_name
  },

}
</script>

<style lang="sass" scoped>
.portfolio-group
  margin: 64px 0
</style>