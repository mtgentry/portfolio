<template lang="pug">
  v-row#extra(justify="center" align="center" v-if="project")
    v-col(cols="12")
      Section(v-for="(section, i) in project.layout" slim_padding
        :section="section" :key="section.name" :style="{color: textColor}")
    v-col(cols="12")
      Footer

</template>

<script>
import Section from "@/components/project/Section.vue";
import Footer from "@/components/Footer.vue";
import {mapState} from "vuex";
import MailchimpForm from "@/components/MailchimpForm.vue";

export default {
  components: {
    Section,
    Footer,
    MailchimpForm
  },
  fetchOnServer: false,
  transition: 'fade',
  data() {
    return {
      project: null
    }
  },
  mounted() {
    if (!process.env.IS_AGENCY) {
      return this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
    }
  },
  async head() {
    this.project = await this.$axios.get(`/pages/${this.$route.name}/layout.json`)
      .then((response) => response.data).catch((e) => {
        console.log(e)
        this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
      })
    this.$store.commit('setBackgroundColor', this.$store.state.homeBackgroundColor)
    this.$store.commit('setTextColor', this.$store.state.homeTextColor)

    return {
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.project.seo_description
        }
      ]
    }
  },
  computed: {
    ...mapState(['textColor'])
  },
}
</script>

<style lang="sass" scoped>
#extra
  padding: 100px 0
.col
  display: flex
  align-items: center
  flex-direction: column
</style>
