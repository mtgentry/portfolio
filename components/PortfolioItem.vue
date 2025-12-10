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
  font-family: 'Resist Sans', sans-serif !important
  font-weight: 700
  font-size: 22px !important
  padding-top: 7px !important
  line-height: 110%

@media (max-width: 768px)
  .title
    font-size: 18px !important
    margin-bottom: -3px
 



.categories

  font-family: 'Resist Sans', sans-serif
  font-size: 16px
  color: #948F8B
  padding-bottom: 18px


.item
  align-items: start

  @media (max-width: 768px)
    width: unset
    max-height: 400px

</style>
