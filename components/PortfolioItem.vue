<template lang="pug">
  div.item(data-aos="fade-up")
    //- A cover can send its card to another project page via cover.link
    //- Cards link within their own grid: /work/..., /portfolio/..., /projects/...
    nuxt-link(:to="project.cover.link || `${section}/${project.name}`")
      Media(:project_name="project.name" :media="project.cover.media")
      div.pt-2.title(v-html="project.cover.title")
      div.categories(v-html="project.cover.categories")

</template>

<script>
import Media from "@/components/Media.vue";
import { sectionOf } from "@/utils/sections";

export default {
  props: ['project'],
  inject: { gridSection: { default: null } },
  components: {
    Media,
  },
  computed: {
    section() {
      return `/${this.gridSection ? this.gridSection() : sectionOf(this.$route.path)}`
    }
  }

}
</script>

<style lang="sass" scoped>

.title
  font-family: 'Resist Sans', sans-serif !important
  font-weight: 700
  font-size: 17px !important
  padding-top: 10px !important
  line-height: 100%
  color: #1D1E20

// Same title-to-tags spacing as desktop (the old -3px margin here pulled the
// tags up into the title); a little less space above, since 10px reads as a
// bigger gap next to the smaller phone images and type
@media (max-width: 768px)
  .title
    font-size: 16px !important
    padding-top: 7px !important
 



.categories

  font-family: 'Resist Sans', sans-serif
  font-size: 15px
  color: #948F8B
  padding-bottom: 18px


.item
  align-items: start

  @media (max-width: 768px)
    width: unset
    max-height: 400px

</style>
