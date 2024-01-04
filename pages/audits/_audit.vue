<template lang="pug">
  v-row.audit(justify="center" align="center" v-if="audit")
    v-col.layoutPadding.d-flex.justify-center.align-center(cols="12")
      Top(:text="audit.fullDescription")

    
    // Section for the hero images with headings
    v-row
      v-col(cols="6")
         div.left-hero-wrapper.position-relative
           img.left-hero(:src="getImagePath(audit.layout[0].media[0].name)" alt="audit.layout[0].media[0].title")
           div.overlay-heading Before
      v-col(cols="6")
         div.right-hero-wrapper.position-relative
           img.right-hero(:src="getImagePath(audit.layout[0].media[1].name)" alt="audit.layout[0].media[1].title")
           div.overlay-heading After



    // New section for title and text
    v-col(cols="12" v-if="audit.layout && audit.layout[1].title")
      .centered-section
        h2 {{ audit.layout[1].title }}
        div(v-for="paragraph in audit.layout[1].text" :key="paragraph")
          p {{ paragraph }}

    v-col(cols="12")
      .points
        AuditImg(:imgSrc="auditImage" :points="audit.points")

    v-col.layoutPadding(cols="12")
      div.line
    v-col#formBlue(cols="12")
      v-row
        v-col.d-flex.align-center.flex-column(cols="12")
          div.px-5.formText
            h1#bottomHeader Want more case studies?
            h2#bottomSubheader Our client-approved case studies offer real-world insights. <br> Subscribe below to receive them as they become available.
            MailchimpFormBlue
    v-col#footer(cols="12")
      Footer
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Top from "@/components/project/Top.vue";
import AuditImg from "@/components/AuditImg.vue"; // Assuming you have this component
import MailchimpFormBlue from "@/components/MailchimpFormBlue.vue"; // Assuming you have this component
import Footer from "@/components/Footer.vue"; // Assuming you have this component

export default {
  name: 'auditDetail',
  components: {
    Top,
    AuditImg,
    MailchimpFormBlue,
    Footer
  },
  data() {
    return {
      audit: null,
    }
  },
  computed: {
    ...mapState(['audits']),
    auditImage() {
      return `/domains/agency/audits/${this.audit.name}/media/image.png`
    },
  },
  methods: {
    ...mapActions(['fetchAuditLayout']),
    async getAudit() {
      const auditName = this.$route.params.audit
      let audit = this.audits?.find(a => a.name === auditName)
      if (!audit) {
        audit = {
          name: auditName,
          auditHeader: 'Audit not found',
        }
      }
      this.audit = audit
    },
    getImagePath(imageName) {
      return `/domains/agency/audits/${this.audit.name}/media/${imageName}`;
    },
  },
  async mounted() {
    this.$store.commit('updateState', {field: 'paddingLayout', value: false})
    if (!this.audits) {
      await this.fetchAuditLayout()
    }
    await this.getAudit()
  },
  destroyed() {
    setTimeout(() => {
      this.$store.commit('updateState', {field: 'paddingLayout', value: true})
    }, 1000)
  },
}
</script>


<style lang="sass" scoped>

.position-relative
  position: relative

.overlay-heading
  position: absolute
  top: -50px // Moves the text 50px higher than the top of the image
  left: 50%
  transform: translateX(-50%)
  color: #FFF // Adjust the color as needed
  font-size: 24px // Adjust the font size as needed
  // Add more styling for the heading as needed

.audit
  color: #FFFFFF
  padding: 0
#fullDescription
  padding-bottom: 100px
.container
  max-width: 650px

.centered-section
  text-align: left
  max-width: 650px
  margin: 0 auto

h2
 text-align: left

p
 text-align: left

.left-hero-wrapper, .right-hero-wrapper
  margin-left: 15px // For left image wrapper
  margin-right: 15px // For right image wrapper

.left-hero, .right-hero
  width: 100%
  height: auto
  display: block

.images
  display: flex
  align-items: center
  justify-content: center

img
    width: 100%

.left-hero, .right-hero
  width: 100%
  height: auto
  display: block

.audit-image
  max-width: 100%
  height: auto
  display: block
  margin: 0 auto
  padding: 3px // Adjust this value as needed

#bottomHeader
  font-size: 34px
  font-weight: 500
  line-height: 148.5%
  font-weight: bold

#bottomSubheader
  font-size: 21px
  font-weight: 400
  line-height: 136.5%
  padding-bottom: 39px

.line
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  &::after
    flex-grow: 1
    background: #535251
    height: 1px
    margin: .5em
    max-width: 650px

.py-5
  padding-bottom: 100px

#formBlue
  background-color: #1F00DC
  padding: 100px 0 180px 0

  @media (max-width: 600px)
    padding: 15px 0

  .formText
    max-width: 730px

.layoutPadding
  padding: 12px 46px

#footer
  padding: 0 46px
</style>