<template lang="pug">
  v-row.audit(justify="center" align="center" v-if="audit" class="flex-column")
    v-col.layoutPadding.d-flex.justify-center.align-center(cols="12")
      Top(:text="audit.fullDescription")

    div.images-and-button-wrapper
      v-row(:class="{ 'view-all': viewAllImages }")
        v-col(cols="6")
          div.left-hero-wrapper.position-relative
            div.overlay-heading Before
            img.left-hero(:src="getImagePath(audit.layout[0].media[0].name)" alt="audit.layout[0].media[0].title")

        v-col(cols="6")
          div.right-hero-wrapper.position-relative
            div.overlay-heading After
            img.right-hero(:src="getImagePath(audit.layout[0].media[1].name)" alt="audit.layout[0].media[1].title")

      button.ghost-button(@click="toggleViewAll") {{ buttonText }}

    template(v-for="(section, index) in audit.layout")
      v-row(v-if="section.title" :key="'text-section-' + index")
        v-col
          .centered-section
            h2 {{ section.title }}
            div(v-for="(paragraph, pIndex) in section.text" :key="'paragraph-' + index + '-' + pIndex")
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
            h2#bottomSubheader Our client-approved case studies offer real-world insights. Subscribe below to receive them as they become available.
            MailchimpFormBlue
    Footer
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Top from "@/components/project/Top.vue";
import AuditImg from "@/components/AuditImg.vue";
import MailchimpFormBlue from "@/components/MailchimpFormBlue.vue";
import Footer from "@/components/Footer.vue";

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
      viewAllImages: false,
      buttonText: 'Expand',
    };
  },
  computed: {
    ...mapState(['audits']),
    auditImage() {
      return `/domains/agency/audits/${this.audit.name}/media/image.png`;
    },
  },
  methods: {
    ...mapActions(['fetchAuditLayout']),
    async getAudit() {
      const auditName = this.$route.params.audit;
      let audit = this.audits?.find(a => a.name === auditName);
      if (!audit) {
        audit = {
          name: auditName,
          auditHeader: 'Audit not found',
        };
      }
      this.audit = audit;
    },
    getImagePath(imageName) {
      return `/domains/agency/audits/${this.audit.name}/media/${imageName}`;
    },
    toggleViewAll() {
      this.viewAllImages = !this.viewAllImages;
      this.$nextTick(() => {
        const heroWrapper = this.$el.querySelector('.left-hero-wrapper');
        if (heroWrapper) {
          heroWrapper.addEventListener('transitionend', this.handleTransitionEnd, { once: true });
        }
      });
    },
    handleTransitionEnd() {
      if (this.viewAllImages) {
        this.buttonText = 'Collapse';
      } else {
        this.buttonText = 'Expand';
      }
    },
  },
  async mounted() {
    this.$store.commit('updateState', {field: 'paddingLayout', value: false});
    if (!this.audits) {
      await this.fetchAuditLayout();
    }
    await this.getAudit();
    console.log('Audit data:', this.audit);
  },
  destroyed() {
    setTimeout(() => {
      this.$store.commit('updateState', {field: 'paddingLayout', value: true});
    }, 1000);
  },
}
</script>




<style lang="sass" scoped>




.left-hero, .right-hero
  width: 100%
  height: auto
  display: block



.left-hero-wrapper, .right-hero-wrapper
  max-height: 700px // starting max-height for images on desktop
  margin-left: 15px // For left image wrapper
  margin-right: 15px // For right image wrapper
  overflow: hidden
  position: relative
  z-index: 1 // Lower z-index for the image wrappers
  transition: max-height 1.5s ease

  &::after
    content: ''
    position: absolute
    bottom: 0
    left: 0
    right: 0
    height: 100px // Height of the gradient overlay
    background: linear-gradient(to top, #282725 15.13%, rgba(40, 39, 37, 0))
    z-index: 2 // Ensure it's above the image but below the text
    transition: opacity 1.5s ease // Transition for the gradient opacity

.view-all .left-hero-wrapper, .view-all .right-hero-wrapper
  max-height: 2000px // large enough to reveal the full image on desktop

  &::after
    opacity: 0 // Hide the gradient when fully expanded
.images-and-button-wrapper
     display: flex
     flex-direction: column
     align-items: center
 
.ghost-button
    border: 1px solid white
    background-color: transparent
    color: white
    padding: 12px 50px 12px 50px
    text-align: center
    text-decoration: none
    display: inline-block
    font-size: 16px
    margin: 50px 2px 100px 2px // 50px margin above and below
    cursor: pointer
    transition: background-color 0.3s, color 0.3s

    &:hover
      background-color: white
      color: black

.position-relative
  position: relative

.overlay-heading
  color: white // Text color
  background-color: transparent // Background color, if needed
  font-size: 24px // Adjust font size as needed
  font-weight: bold // Bold text
  text-align: center // Center the text horizontally
  margin-bottom: 10px // Space between the text and the top of the image
  padding: 5px 10px // Padding inside the text box, adjust as needed

.flex-column
  flex-direction: column

.audit
  color: #FFFFFF
  padding: 0
#fullDescription
  padding-bottom: 100px
.container
  max-width: 650px

.centered-section
  display: flex
  flex-direction: column
  text-align: left
  max-width: 650px
  margin: 0 auto

h2
 text-align: left
 line-height: 200%
 font-size: 30px

p
 text-align: left



.images
  display: flex
  align-items: center
  justify-content: center

img
    width: 100%

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
  margin-top: 50px


.layoutPadding
  padding: 12px 46px

#footer
  padding: 0 46px

.formText
    max-width: 730px



@media (max-width: 600px)
     #formBlue
       padding: 15px 0
     .left-hero-wrapper, .right-hero-wrapper
       max-height: 250px // smaller starting max-height for images on mobile
     .view-all .left-hero-wrapper, .view-all .right-hero-wrapper
       max-height: 1000px // adjust this value based on the full image height on mobile
     .ghost-button
       margin-top: 40px // Smaller margin for mobile

</style>
