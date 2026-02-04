<script>
import AgencyHomepage from "@/components/pages/AgencyHomepage.vue";
import PortfolioHomepage from "@/components/pages/PortfolioHomepage.vue";

export default {
  extends: process.env.IS_AGENCY ? AgencyHomepage : PortfolioHomepage
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
