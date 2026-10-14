<script>
// Case studies opened from the /portfolio grid. Same page as /work/:project,
// so the logo and colors stay in this section (see layouts/default.vue).
import Project from "@/pages/work/_project.vue"
export default {
  extends: Project,
  validate() {
    return !process.env.IS_AGENCY
  }
}
</script>
