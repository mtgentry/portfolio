<template lang="pug">
  v-row#extra(justify="center" align="center" v-if="project" :class="{agency: isAgency}")
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
      project: null,
      page_name: null
    }
  },
  mounted() {
    if (!process.env.IS_AGENCY) {
      return this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
    }
  },
  async head() {
    console.log('Fetching data for page:', this.page_name || this.$route.name); // Log the page being fetched
    this.project = await this.$axios.get(`/pages/${this.page_name || this.$route.name}/layout.json`)
      .then((response) => {
        console.log('Fetched data:', response.data);  // Log the fetched data
        return response.data;
      })
      .catch((e) => {
        console.error('Error fetching data:', e);  // Log any error that occurs while fetching the data
        this.$nuxt.error({ statusCode: 404, message: 'Page not found' });
      });
    this.$store.commit('updateState', {field: 'homeTextColor', value: this.$store.state.homeBackgroundColor})
    this.$store.commit('updateState', {field: 'homeTextColor', value: this.$store.state.homeTextColor})

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
    isAgency() {
      return process.env.IS_AGENCY
    },
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
