<script>
import Homepage from "@/components/pages/Homepage.vue";
import ExtraPage from "@/components/mixins/ExtraPage.vue";

export default {
  extends: process.env.IS_AGENCY ? ExtraPage : Homepage,
  data() {
    return {
      page_name: process.env.IS_AGENCY ? 'unlimited_design' : 'home', // Adjust the 'home' value as necessary for the portfolio variation
    };
  },
};
</script>


<style lang="sass" >
.agency
  h1
    font-weight: 500
    font-size: 50px
    line-height: 120%
    padding-bottom: 10px
    text-align: center
    
    p
      margin: 0!important
      padding-bottom: 38px!important

   

  #button
    margin-bottom: 138px!important
  #video
    margin-bottom: 75px!important
  hr
    margin-bottom: 138px!important
</style>
