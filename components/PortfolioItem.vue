<template lang="pug">
  div.item(:data-aos=`project.name === "francescas" ? "" : "fade-up"`)
    nuxt-link(:to="`/work/${project.name}`")
      Media(:project_name="project.name" :media="project.cover.media")
      div.pt-2.title(v-html="project.cover.title")
      div.categories(v-html="project.cover.categories")

</template>

<script>
import Media from "@/components/Media.vue";

export default {
  props: ['project'],
  components: {
    Media,
  }

}
</script>

<style lang="sass" scoped>


.title
  
  font-family: 'Resist Sans', sans-serif
  font-weight: 700
  font-size: 49px
  padding-top: 12px ! important
  line-height: 110%
 



.categories

  font-family: 'Resist Sans', sans-serif
  font-size: 16px
  color: #948F8B


.item
  align-items: start

  @media (max-width: 768px)
    width: unset
    max-height: 400px

</style>
