<script>
import Homepage from "@/components/pages/Homepage.vue"
import ExtraPage from "@/components/mixins/ExtraPage.vue"
export default {

  extends: process.env.IS_AGENCY ? ExtraPage : Homepage,
  data() {
    return {
      page_name: 'unlimited_design',
    }
  },
}
</script>
