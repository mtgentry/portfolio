<template lang="pug">
  ul
    li(v-for="(name, url) in articles" :key="name" :class="{ active: $route.path === `/articles/${url}` }")
      nuxt-link(:to="`/articles/${url}`") {{ name }}
</template>

<script>
export default {
  data() {
    return {
      articles: {
        'one_big_thing': 'Only be Creative with One Big Thing',
        'the_art_of_hanging_christmas_lights': 'The Art of Hanging Christmas Lights',
        'estimating_crowd_size': 'Estimating Crowd Size',
        'dont_use_pure_black': 'Dont use pure black',
        'dont_combine_illustrations_and_photos': 'Dont combine illustrations and photos',
        'how_to_use_line_height': 'How to use line-height',
        'use_two_fonts_in_your_design': 'Use two fonts in your design',
        'the_10_to_15_word_rule_for_paragraphs': 'The 10 to 15 word rule for paragraphs',
        'how_to_use_a_concept_in_design': 'How to use a concept in design',
        'button_design_best_practices': 'Button design best practices',
        'the_attention_rule': 'The Attention Rule',


      }
    }
  },
  mounted() {
    if (this.$route.path === '/articles' || this.$route.path === '/articles/') {
      let latest_article = Object.keys(this.articles)[0]
      this.$router.push(`/articles/${latest_article}`)
    }
  }
}
</script>

<style scoped lang="sass">

  ul
    padding-top: 44px
  li
    list-style: none
    padding: 0 0 10px 20px

    &.active
      text-decoration: underline
      font-weight: 700

</style>