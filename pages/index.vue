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
