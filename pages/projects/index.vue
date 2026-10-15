<script>
// The product design portfolio: the same grid as /work, with its own project
// order (projectsOrder in homepage.json). Portfolio site only.
import Homepage from "@/components/pages/Homepage.vue"
export default {
  extends: Homepage,
  validate() {
    return !process.env.IS_AGENCY
  }
}
</script>
