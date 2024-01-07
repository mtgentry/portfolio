<template lang="pug">
  v-row.audit(justify="center" align="center" v-if="audit" class="flex-column")
    v-col.layoutPadding.d-flex.justify-center.align-center(cols="12")
      Top(:text="audit.fullDescription")

    // Section for the hero images with toggle functionality
    v-row(:class="{ 'view-all': viewAllImages }")
      v-col(cols="6")



        
        div.left-hero-wrapper.position-relative
          div.overlay-heading Before
          img.left-hero(:src="getImagePath(audit.layout[0].media[0].name)" alt="audit.layout[0].media[0].title")

          


      
      v-col(cols="6")



        
        div.right-hero-wrapper.position-relative
          div.overlay-heading After
          img.right-hero(:src="getImagePath(audit.layout[0].media[1].name)" alt="audit.layout[0].media[1].title")
          






    // Button to toggle view all
    button.ghost-button(@click="toggleViewAll") {{ buttonText }}



    // Iterate over each section in audit.layout
    template(v-for="(section, index) in audit.layout")
      // Render title and text section if it exists
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
            h2#bottomSubheader Our client-approved case studies offer real-world insights. <br> Subscribe below to receive them as they become available.
            MailchimpFormBlue
    v-col#footer(cols="12")
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
      viewAllImages: false, // Existing data property for toggling image view
      buttonText: 'Expand', // New data property for button text
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

    handleTransitionEnd() {
    if (this.viewAllImages) {
      // Change the button text only after expanding
      this.buttonText = 'Collapse';
    }
  },

  toggleViewAll() {
    this.viewAllImages = !this.viewAllImages;

    if (this.viewAllImages) {
      // When expanding
      this.$nextTick(() => {
        const heroWrapper = this.$el.querySelector('.left-hero-wrapper');
        if (heroWrapper) {
          heroWrapper.addEventListener('transitionend', () => {
            if (this.viewAllImages) { // Check if still expanded
              this.buttonText = 'Collapse';
            }
          }, { once: true });
        }
      });
    } else {
      // When collapsing
      this.$nextTick(() => {
        const heroWrapper = this.$el.querySelector('.left-hero-wrapper');
        if (heroWrapper) {
          heroWrapper.addEventListener('transitionend', () => {
            if (!this.viewAllImages) { // Check if fully collapsed
              this.buttonText = 'Expand';
            }
          }, { once: true });
        }
      });
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


.left-hero-wrapper, .right-hero-wrapper
   height: 700px // starting height for images
   overflow: hidden
   position: relative
   transition: height 1.5s ease // Smooth transition for height change
 
.left-hero-wrapper::after, .right-hero-wrapper::after
   content: ''
   position: absolute
   bottom: 0
   left: 0
   right: 0
   height: 100px // Height of the gradient overlay
   background: linear-gradient(to top, rgba(40, 39, 37, 1) 0%, rgba(40, 39, 37, 0) 100%) // Gradient from opaque to transparent
   z-index: 1 // Ensure it's above the image but below the text
   transition: opacity 1.5s ease // Transition for opacity change

.view-all .left-hero-wrapper, .view-all .right-hero-wrapper
   height: 1800px // Expanded state

.view-all .left-hero-wrapper::after, .view-all .right-hero-wrapper::after
   opacity: 0 // Hide the gradient when fully expanded


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


// New 
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

.left-hero-wrapper, .right-hero-wrapper
  margin-left: 15px // For left image wrapper
  margin-right: 15px // For right image wrapper
  position: relative
  z-index: 1 // Lower z-index for the image wrappers

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
  margin-top: 50px

  @media (max-width: 600px)
    padding: 15px 0

  .formText
    max-width: 730px

.layoutPadding
  padding: 12px 46px

#footer
  padding: 0 46px
</style>

