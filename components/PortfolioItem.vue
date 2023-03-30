<!-- Please remove this file from your project -->
<template lang="pug">
  div.item(data-aos="fade-up")
    nuxt-link(:to="`/work/${project.name}`")
      Media(:project_name="project.name" :media="project.cover.media")
      div.pt-2.title {{ project.cover.title }}
      div.categories {{ project.cover.categories }}

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
  font-weight: 500
  font-size: 19px
  line-height: 25px


.categories
  font-size: 16px
  line-height: 21px

.item
  align-items: start

  @media (max-width: 768px)
    width: unset
    max-height: 400px

</style>