<template lang="pug">
  v-row(justify="center" align="center")
    v-col(cols="12")
      Header
      PortfolioGroup(v-for="project_name in projects" :project_name="project_name")


</template>

<script>
import Header from '~/components/Header.vue'
import PortfolioGroup from "@/components/PortfolioGroup.vue";
export default {
  name: 'IndexPage',
  components: {
    Header,
    PortfolioGroup
  },
  data() {
    return {
      projects: ['francescas'],
    }
  }
}
</script>
