<template lang="pug">
  v-row.pt-5#article-row
    v-col#articleList(cols="4")
      ArticleList
    v-col#article(cols="8")
      slot
    Footer

</template>

<script>
import ArticleList from "@/components/ArticleList.vue"
export default {
  components: {
    ArticleList
  },
}
</script>


<style scoped lang="sass">
  #article
    max-width: 640px
    padding-top: 51px
    padding-bottom: 256px
    img
      max-width: 100%
      height: auto
      padding: 0
    a
      text-decoration: underline
      font-weight: bold

  #article-row
    color: white
</style>