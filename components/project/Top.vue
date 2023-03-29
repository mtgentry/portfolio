<!-- Please remove this file from your project -->
<template lang="pug">
  div.top(:style="{color: textColor}")
    div {{ text }}

</template>

<script>
import {mapState} from "vuex";

export default {
  props: ['text'],
  computed: {
    ...mapState(['textColor'])
  },
}
</script>

<style lang="sass" scoped>

.top
  padding-top: 130px
  padding-bottom: 130px
  max-width: 659px

  @media (max-width: 768px)
    padding-top: 80px
    padding-bottom: 80px

</style>